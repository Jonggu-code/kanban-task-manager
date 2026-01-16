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
    resetTasks,
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
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    )
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
      />

      <main className="container mx-auto max-w-[900px] px-4 py-4 md:px-6 md:py-6 lg:max-w-[1000px]">
        <FilterBar
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
          sortBy={sortBy}
          onPriorityChange={setPriorityFilter}
          onStatusChange={setStatusFilter}
          onSortChange={setSortBy}
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

      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg ring-1 ring-gray-200 transition hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:ring-gray-800 dark:hover:bg-gray-800"
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
          type="button"
          onClick={() => setIsShortcutsModalOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg ring-1 ring-gray-200 transition hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:ring-gray-800 dark:hover:bg-gray-800"
          aria-label="단축키 도움말"
          title="단축키 도움말"
        >
          <span className="text-lg font-bold leading-none">?</span>
        </button>
      </div>
    </div>
  )
}

export default App
