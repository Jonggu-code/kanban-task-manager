import { useCallback, useEffect, useRef, useState } from 'react'
import { useTasks } from './hooks/useTasks'
import { useTaskFilter } from './hooks/useTaskFilter'
import { useTheme } from './hooks/useTheme'
import { Header } from './components/Header/Header'
import { FilterBar } from './components/Filter/FilterBar'
import { Board } from './components/Board'
import { TaskModal } from './components/Task/TaskModal'
import { EmptySearchResult } from './components/common/EmptySearchResult'
import { KeyboardShortcutsModal } from './components/common/KeyboardShortcutsModal'
import { MoveTopButton } from './components/common/MoveTopButton'
import { LoadingScreen } from './components/common/LoadingScreen'
import { LoadErrorBanner } from './components/common/LoadErrorBanner'
import { FloatingActions } from './components/common/FloatingActions'
import { createTask } from './data/taskStructure'

function App() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const [pendingDeleteIds, setPendingDeleteIds] = useState(() => new Set())
  const searchInputRef = useRef(null)
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false)
  const [taskModalCloseSignal, setTaskModalCloseSignal] = useState(0)
  const {
    tasks,
    isLoading,
    error: loadError,
    resetTasks,
    reloadTasks,
    clearError,
    changeTaskStatus,
    addTask,
    updateTask,
    deleteTask,
  } = useTasks()
  const {
    searchQuery,
    debouncedSearchQuery,
    priorityFilter,
    statusFilter,
    sortBy,
    setSearchQuery,
    setPriorityFilter,
    setStatusFilter,
    setSortBy,
    resetFilters,
    filteredTasks,
  } = useTaskFilter(tasks)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const requestCloseTaskModal = useCallback(() => {
    setTaskModalCloseSignal(prev => prev + 1)
  }, [])

  const handleTaskMove = (taskId, newStatus) => {
    changeTaskStatus(taskId, newStatus)
  }

  const handleCreateTask = taskData => {
    addTask(createTask(taskData))
    setIsModalOpen(false)
  }

  const handleEditTask = task => {
    setEditingTask(task)
  }

  const handleUpdateTask = taskData => {
    updateTask(editingTask.id, taskData)
    setEditingTask(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  const scheduleDeleteTask = taskId => {
    setPendingDeleteIds(prev => {
      const next = new Set(prev)
      next.add(taskId)
      return next
    })

    window.setTimeout(() => {
      deleteTask(taskId)
      setPendingDeleteIds(prev => {
        const next = new Set(prev)
        next.delete(taskId)
        return next
      })
    }, 180)
  }

  const handleDeleteTask = taskId => {
    if (window.confirm('정말로 이 태스크를 삭제하시겠습니까?')) {
      scheduleDeleteTask(taskId)
    }
  }

  const hasSearch = debouncedSearchQuery.trim() !== ''
  const hasFilters = priorityFilter !== 'all' || statusFilter !== 'all'
  const shouldShowEmptyResult =
    filteredTasks.length === 0 && (hasSearch || hasFilters)
  const isTaskModalOpen = isModalOpen || Boolean(editingTask)

  useEffect(() => {
    if (isLoading) return

    const isEditableTarget = target => {
      if (!target) return false
      const element = /** @type {HTMLElement} */ (target)
      const tag = element.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return true
      return element.isContentEditable
    }

    const focusSearch = () => {
      const node = searchInputRef.current
      node?.focus?.()
      node?.select?.()
    }

    const onKeyDown = e => {
      // ESC: 도움말 모달 -> 태스크 모달 순서로 닫기
      if (e.key === 'Escape') {
        if (isShortcutsModalOpen) {
          e.preventDefault()
          setIsShortcutsModalOpen(false)
          return
        }
        if (isTaskModalOpen) {
          e.preventDefault()
          requestCloseTaskModal()
        }
        return
      }

      if (isEditableTarget(e.target)) return

      const cmdOrCtrl = e.metaKey || e.ctrlKey

      // 도움말 모달이 열려있으면 다른 단축키는 무시
      if (isShortcutsModalOpen) return

      // Ctrl/⌘ + N: 새 태스크 추가
      if (cmdOrCtrl && (e.key === 'n' || e.key === 'N')) {
        if (isTaskModalOpen) return
        e.preventDefault()
        setIsModalOpen(true)
        return
      }

      // / 또는 Ctrl/⌘ + K: 검색창 포커스
      if (
        (!cmdOrCtrl && !e.altKey && e.key === '/') ||
        (cmdOrCtrl && (e.key === 'k' || e.key === 'K'))
      ) {
        e.preventDefault()
        focusSearch()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isLoading, isShortcutsModalOpen, isTaskModalOpen, requestCloseTaskModal])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 dark:from-gray-950 dark:to-gray-900 dark:text-gray-100">
      <Header
        taskCount={tasks.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddTask={() => setIsModalOpen(true)}
        onReset={resetTasks}
        searchInputRef={searchInputRef}
        showReset={import.meta.env.DEV}
      />

      <main className="container mx-auto max-w-[900px] px-4 py-4 md:px-6 md:py-6 lg:max-w-[1000px]">
        <LoadErrorBanner
          message={loadError}
          onRetry={reloadTasks}
          onReset={resetTasks}
          onClose={clearError}
        />

        <FilterBar
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
          sortBy={sortBy}
          onPriorityChange={setPriorityFilter}
          onStatusChange={setStatusFilter}
          onSortChange={setSortBy}
          onReset={resetFilters}
        />

        {shouldShowEmptyResult ? (
          <EmptySearchResult
            title={hasFilters ? '조건에 맞는 태스크가 없습니다' : '검색 결과가 없습니다'}
            description={
              hasFilters
                ? hasSearch
                  ? `"${debouncedSearchQuery}" 검색어와 선택한 필터 조건에 맞는 태스크가 없습니다.`
                  : '선택한 필터 조건에 맞는 태스크가 없습니다.'
                : `"${debouncedSearchQuery}"에 일치하는 태스크를 찾지 못했어요.`
            }
            actionLabel={hasFilters ? '필터 초기화' : '검색어 지우기'}
            onAction={hasFilters ? resetFilters : () => setSearchQuery('')}
          />
        ) : (
          <Board
            tasks={filteredTasks}
            onTaskMove={handleTaskMove}
            onTaskEdit={handleEditTask}
            highlightQuery={debouncedSearchQuery}
            pendingDeleteIds={pendingDeleteIds}
          />
        )}
      </main>

      {(isModalOpen || editingTask) && (
        <TaskModal
          onClose={handleCloseModal}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onDelete={handleDeleteTask}
          task={editingTask}
          closeSignal={taskModalCloseSignal}
        />
      )}

      <KeyboardShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />

      <MoveTopButton />
      <FloatingActions
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
        showErrorDemoButton={import.meta.env.DEV}
        onShowErrorDemo={() => {
          try {
            window.localStorage.setItem('kanban-tasks', '{broken-json')
          } catch {
            // localStorage 접근 실패는 무시
          }
          reloadTasks()
        }}
      />
    </div>
  )
}

export default App
