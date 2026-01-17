/**
 * 로컬 저장소 로딩 실패 안내 배너
 *
 * @param {Object} props
 * @param {string} props.message
 * @param {() => void} props.onRetry
 * @param {() => void} props.onReset
 * @param {() => void} props.onClose
 */
export const LoadErrorBanner = ({ message, onRetry, onReset, onClose }) => {
  if (!message) return null

  return (
    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-900/15 dark:text-red-200 md:mb-6 md:p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="font-semibold">저장된 데이터를 불러오지 못했어요</div>
          <div className="mt-0.5 break-words text-xs opacity-90 md:text-sm">
            {message}
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={onRetry}
            className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-red-700 shadow-sm ring-1 ring-red-200 hover:bg-red-50 dark:bg-gray-950 dark:text-red-200 dark:ring-red-900/50 dark:hover:bg-red-900/20 md:text-sm"
          >
            다시 시도
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 md:text-sm"
          >
            데이터 초기화
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 dark:text-red-200 dark:hover:bg-red-900/20 md:text-sm"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

