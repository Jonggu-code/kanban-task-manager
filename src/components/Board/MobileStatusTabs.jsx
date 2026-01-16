import { TASK_STATUS, TASK_STATUS_LABELS } from '../../data/taskStructure'

const TAB_STYLES = {
  [TASK_STATUS.TODO]: {
    active: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-900/50',
    inactive: 'text-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-900/20',
  },
  [TASK_STATUS.IN_PROGRESS]: {
    active: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-900/50',
    inactive: 'text-yellow-600 hover:bg-yellow-50 dark:text-yellow-300 dark:hover:bg-yellow-900/20',
  },
  [TASK_STATUS.DONE]: {
    active: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-900/50',
    inactive: 'text-green-600 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-900/20',
  },
}

/**
 * 모바일용 상태 탭 컴포넌트
 * 모바일에서 컬럼 대신 탭으로 상태를 전환
 *
 * @param {Object} props
 * @param {string} props.activeTab - 현재 선택된 탭 (status)
 * @param {function} props.onTabChange - 탭 변경 핸들러
 * @param {Object} props.taskCounts - 상태별 태스크 수 { todo: n, in-progress: n, done: n }
 */
export const MobileStatusTabs = ({ activeTab, onTabChange, taskCounts }) => {
  const statuses = [TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE]

  return (
    <div className="mb-4 flex gap-2 md:hidden">
      {statuses.map(status => {
        const isActive = activeTab === status
        const styles = TAB_STYLES[status]
        const count = taskCounts[status] || 0

        return (
          <button
            key={status}
            onClick={() => onTabChange(status)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-all ${
              isActive
                ? styles.active
                : `border-transparent bg-white dark:bg-gray-900 ${styles.inactive}`
            }`}
          >
            <span className="truncate">{TASK_STATUS_LABELS[status]}</span>
            <span
              className={`flex h-5 min-w-5 items-center justify-center rounded-full text-xs ${
                isActive ? 'bg-white/80 dark:bg-gray-950/60' : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
