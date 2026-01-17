/**
 * 단축키 도움말 열기 FAB
 *
 * @param {Object} props
 * @param {() => void} props.onOpen
 */
export const ShortcutsHelpFab = ({ onOpen }) => {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg ring-1 ring-gray-200 transition hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:ring-gray-800 dark:hover:bg-gray-800"
      aria-label="단축키 도움말"
      title="단축키 도움말"
    >
      <span className="text-lg font-bold leading-none">?</span>
    </button>
  )
}

