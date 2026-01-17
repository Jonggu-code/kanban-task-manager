/**
 * 전체 화면 로딩 화면
 *
 * @param {Object} props
 * @param {string} [props.title]
 * @param {string} [props.description]
 */
export const LoadingScreen = ({
  title = '로딩 중...',
  description = '잠시만 기다려주세요.',
}) => {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 text-gray-900 dark:from-gray-950 dark:to-gray-900 dark:text-gray-100"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 dark:border-gray-800 dark:border-t-blue-400" />
        <h1 className="text-base font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  )
}

