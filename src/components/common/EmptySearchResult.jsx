/**
 * 검색/필터 결과가 없을 때 표시하는 빈 상태 컴포넌트
 *
 * @param {Object} props
 * @param {string} [props.query] - 검색어 (표시용)
 * @param {string} [props.title] - 제목 문구
 * @param {string} [props.description] - 설명 문구
 * @param {string} [props.actionLabel] - 액션 버튼 라벨
 * @param {function} [props.onAction] - 액션 핸들러
 */
export const EmptySearchResult = ({
  query,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  const resolvedTitle = title || '검색 결과가 없습니다'
  const resolvedDescription =
    description ||
    (query
      ? `"${query}"에 일치하는 태스크를 찾지 못했어요.`
      : '조건에 맞는 태스크를 찾지 못했어요.')
  const resolvedActionLabel = actionLabel || '검색어 지우기'

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h2 className="text-base font-semibold text-gray-900 md:text-lg">
        {resolvedTitle}
      </h2>
      <p className="mt-1 text-sm text-gray-500">{resolvedDescription}</p>
      {onAction && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={onAction}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {resolvedActionLabel}
          </button>
        </div>
      )}
    </div>
  )
}
