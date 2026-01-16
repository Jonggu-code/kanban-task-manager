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
 */
export const FilterBar = ({
  priorityFilter,
  statusFilter,
  sortBy,
  onPriorityChange,
  onStatusChange,
  onSortChange,
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
    </div>
  )
}
