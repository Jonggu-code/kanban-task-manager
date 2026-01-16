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
 * @param {'light'|'dark'} props.theme - 현재 테마
 * @param {function} props.onToggleTheme - 테마 토글 핸들러
 */
export const Header = ({
  taskCount,
  searchQuery,
  onSearchChange,
  onAddTask,
  onReset,
  theme,
  onToggleTheme,
}) => {
  const isDark = theme === 'dark'

  return (
    <header className="border-b bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 md:px-6 md:py-6">
        {/* 모바일: 수직 레이아웃, 태블릿+: 수평 레이아웃 */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
          {/* 타이틀 영역 */}
          <div className="flex items-center justify-between md:block">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 md:text-2xl lg:text-3xl">
                칸반 태스크 매니저
              </h1>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 md:mt-2 md:text-sm">
                총 {taskCount}개의 태스크
              </p>
            </div>
            {/* 모바일에서만 보이는 + 버튼 */}
            <button
              onClick={onAddTask}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white transition-all hover:bg-blue-700 md:hidden"
              aria-label="태스크 추가"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          {/* 검색 및 액션 버튼 영역 */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex-1 md:flex-none">
              <SearchBar value={searchQuery} onChange={onSearchChange} />
            </div>
            {/* 태블릿+에서만 보이는 버튼들 */}
            <button
              onClick={onAddTask}
              className="hidden rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-sm md:block md:px-4 md:py-2.5"
            >
              태스크 추가
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              className="rounded-lg bg-gray-100 p-2 text-gray-700 transition-all hover:bg-gray-200 hover:shadow-sm dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              aria-label="다크 모드 전환"
              title={isDark ? '라이트 모드' : '다크 모드'}
            >
              {isDark ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95l-1.414 1.414m0-11.314 1.414 1.414m11.314 11.314 1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={onReset}
              className="shrink-0 rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 transition-all hover:bg-gray-200 hover:shadow-sm dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 md:px-4 md:py-2.5 md:text-sm"
            >
              초기화
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
