import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useRecentSearches } from '../../hooks/useRecentSearches'

/**
 * 검색창 컴포넌트
 * 최근 검색어 표시 및 선택 기능 포함
 *
 * @param {Object} props
 * @param {string} props.value - 검색어 입력값
 * @param {function} props.onChange - 검색어 변경 핸들러
 * @param {function} props.onSearch - 검색 실행 핸들러 (Enter 키 또는 최근 검색어 선택 시)
 */
export const SearchBar = forwardRef(({ value, onChange, onSearch }, ref) => {
  const [isFocused, setIsFocused] = useState(false)
  const localInputRef = useRef(null)
  const {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  } = useRecentSearches()

  useImperativeHandle(ref, () => localInputRef.current, [])

  // 드롭다운 표시 여부 (계산된 값)
  const showDropdown = isFocused && recentSearches.length > 0 && !value.trim()

  // 검색 실행 (Enter 키)
  const handleKeyDown = e => {
    if (e.key === 'Enter' && value.trim()) {
      addRecentSearch(value)
      onSearch?.(value)
      localInputRef.current?.blur()
    }
    if (e.key === 'Escape') {
      localInputRef.current?.blur()
    }
  }

  // 최근 검색어 선택
  const handleSelectRecent = query => {
    onChange(query)
    onSearch?.(query)
    localInputRef.current?.blur()
  }

  // 최근 검색어 삭제 (x 버튼)
  const handleRemoveRecent = (e, query) => {
    e.stopPropagation()
    removeRecentSearch(query)
  }

  return (
    <div className="relative w-full md:w-auto">
      <svg
        className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500 md:left-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        ref={localInputRef}
        type="text"
        placeholder="검색..."
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-lg border border-gray-200 bg-white py-1.5 pl-8 pr-7 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/30 md:w-56 md:py-2 md:pl-9 md:pr-8"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 md:right-2"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* 최근 검색어 드롭다운 */}
      {showDropdown && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-900 md:w-56">
          <div className="flex items-center justify-between px-3 pb-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              최근 검색어
            </span>
            <button
              onMouseDown={e => e.preventDefault()}
              onClick={clearRecentSearches}
              className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-200"
            >
              전체 삭제
            </button>
          </div>
          <ul>
            {recentSearches.map((query, idx) => (
              <li key={idx}>
                <div
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => handleSelectRecent(query)}
                  className="flex w-full cursor-pointer items-center justify-between px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <svg
                      className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="truncate">{query}</span>
                  </div>
                  <button
                    onMouseDown={e => e.preventDefault()}
                    onClick={e => handleRemoveRecent(e, query)}
                    className="ml-2 shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                  >
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
})
