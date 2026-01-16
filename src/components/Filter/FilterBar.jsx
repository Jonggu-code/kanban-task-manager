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
  return (
    <div className="mb-6 flex items-center justify-end gap-3">
      <select
        value={priorityFilter}
        onChange={e => onPriorityChange(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="all">전체 우선순위</option>
        {Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <select
        value={statusFilter}
        onChange={e => onStatusChange(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
