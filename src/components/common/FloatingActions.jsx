import { ShortcutsHelpFab } from './ShortcutsHelpFab'
import { ThemeToggleFab } from './ThemeToggleFab'

/**
 * 화면 우측 하단 고정 액션 버튼 영역
 *
 * @param {Object} props
 * @param {boolean} props.isDark
 * @param {() => void} props.onToggleTheme
 * @param {() => void} props.onOpenShortcuts
 * @param {boolean} [props.showErrorDemoButton]
 * @param {() => void} [props.onShowErrorDemo]
 */
export const FloatingActions = ({
  isDark,
  onToggleTheme,
  onOpenShortcuts,
  showErrorDemoButton = false,
  onShowErrorDemo,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
      <ThemeToggleFab isDark={isDark} onToggle={onToggleTheme} />
      <ShortcutsHelpFab onOpen={onOpenShortcuts} />
      {showErrorDemoButton && (
        <button
          type="button"
          onClick={onShowErrorDemo}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-lg ring-1 ring-red-600/30 transition hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
          aria-label="에러 화면 보기"
          title="에러 화면 보기 (DEV)"
        >
          <span className="text-lg font-bold leading-none">!</span>
        </button>
      )}
    </div>
  )
}
