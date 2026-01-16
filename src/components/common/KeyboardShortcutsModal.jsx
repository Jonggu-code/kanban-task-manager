/**
 * 키보드 단축키 도움말 모달
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {function} props.onClose - 닫기 핸들러
 */
export const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 px-0 md:items-center md:px-4"
      role="dialog"
      aria-modal="true"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg rounded-t-2xl bg-white p-4 shadow-xl dark:bg-gray-900 md:rounded-2xl md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            키보드 단축키
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="닫기"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
          <li className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-800">
            <span>새 태스크 추가</span>
            <kbd className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              Ctrl/⌘ + N
            </kbd>
          </li>
          <li className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-800">
            <span>모달 닫기</span>
            <kbd className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              Esc
            </kbd>
          </li>
          <li className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-800">
            <span>검색창 포커스</span>
            <div className="flex items-center gap-2">
              <kbd className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                /
              </kbd>
              <kbd className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                Ctrl/⌘ + K
              </kbd>
            </div>
          </li>
        </ul>

        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          입력 중에는 단축키가 동작하지 않을 수 있어요. 도움말은 화면 우측 하단의 ? 버튼으로 열 수 있어요.
        </p>
      </div>
    </div>
  )
}
