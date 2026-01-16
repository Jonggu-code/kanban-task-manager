import { SearchBar } from '../Search/SearchBar'

/**
 * 헤더 컴포넌트
 *
 * @param {Object} props
 * @param {number} props.taskCount - 전체 태스크 수
 * @param {string} props.searchQuery - 검색어
 * @param {function} props.onSearchChange - 검색어 변경 핸들러
 * @param {function} props.onAddTask - 태스크 추가 버튼 클릭 핸들러
 * @param {function} props.onReset - 테이블 초기화 버튼 클릭 핸들러
 */
export const Header = ({
  taskCount,
  searchQuery,
  onSearchChange,
  onAddTask,
  onReset,
}) => {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              칸반 태스크 매니저
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              총 {taskCount}개의 태스크
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SearchBar value={searchQuery} onChange={onSearchChange} />
            <button
              onClick={onAddTask}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-sm"
            >
              태스크 추가
            </button>
            <button
              onClick={onReset}
              className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-200 hover:shadow-sm"
            >
              테이블 초기화
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
