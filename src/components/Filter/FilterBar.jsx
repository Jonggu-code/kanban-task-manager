import {
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
} from '../../data/taskStructure'

const SORT_OPTIONS = [
  { value: 'newest', label: '최신순' },
  { value: 'oldest', label: '오래된순' },
  { value: 'priority-high', label: '우선순위 높은순' },
  { value: 'priority-low', label: '우선순위 낮은순' },
]

/**
 * 필터 바 컴포넌트
 *
 * @param {Object} props
 * @param {string} props.priorityFilter - 현재 우선순위 필터 값
 * @param {string} props.statusFilter - 현재 상태 필터 값
 * @param {string} props.sortBy - 현재 정렬 값
 * @param {function} props.onPriorityChange - 우선순위 필터 변경 핸들러
 * @param {function} props.onStatusChange - 상태 필터 변경 핸들러
 * @param {function} props.onSortChange - 정렬 변경 핸들러
 * @param {function} props.onReset - 필터 초기화 핸들러
 */
export const FilterBar = ({
  priorityFilter,
  statusFilter,
  sortBy,
  onPriorityChange,
  onStatusChange,
  onSortChange,
  onReset,
}) => {
  // 활성화된 필터 개수 계산
  const activeFilterCount = [
    priorityFilter !== 'all',
    statusFilter !== 'all',
  ].filter(Boolean).length

  return (
    <div className="mb-4 flex flex-wrap items-center justify-end gap-2 md:mb-6 md:gap-3">
      {/* 모바일에서 활성 필터 표시 */}
      {activeFilterCount > 0 && (
        <span className="mr-auto text-xs text-gray-500 dark:text-gray-400 md:hidden">
          필터 {activeFilterCount}개 적용
        </span>
      )}

      <select
        value={priorityFilter}
        onChange={e => onPriorityChange(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-500/30 md:px-3 md:py-2 md:text-sm"
      >
        <option value="all">우선순위</option>
        {Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {/* 상태 필터: 모바일에서는 탭으로 대체되므로 숨김 */}
      <select
        value={statusFilter}
        onChange={e => onStatusChange(e.target.value)}
        className="hidden rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-500/30 md:block md:px-3 md:py-2 md:text-sm"
      >
        <option value="all">전체 상태</option>
        {Object.entries(TASK_STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={e => onSortChange(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-500/30 md:px-3 md:py-2 md:text-sm"
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={onReset}
        className="rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        aria-label="필터 초기화"
        title="필터 초기화"
      >
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.65 6.35A7.95 7.95 0 0012 4V1L7 6l5 5V7c2.76 0 5 2.24 5 5a5 5 0 01-9.9 1H5.02A7 7 0 0019 12c0-1.93-.78-3.68-2.05-4.95z" />
        </svg>
      </button>
    </div>
  )
}
