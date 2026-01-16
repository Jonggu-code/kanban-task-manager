import { useState } from 'react'
import { useTasks } from './hooks/useTasks'
import { useTaskFilter } from './hooks/useTaskFilter'
import { useTheme } from './hooks/useTheme'
import { Header } from './components/Header/Header'
import { FilterBar } from './components/Filter/FilterBar'
import { Board } from './components/Board'
import { TaskModal } from './components/Task/TaskModal'
import { EmptySearchResult } from './components/common/EmptySearchResult'
import { createTask } from './data/taskStructure'

function App() {
  const { theme, toggleTheme } = useTheme()
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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    )
  }

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

  const handleDeleteTask = taskId => {
    if (window.confirm('정말로 이 태스크를 삭제하시겠습니까?')) {
      deleteTask(taskId)
      setEditingTask(null)
    }
  }

  const hasSearch = debouncedSearchQuery.trim() !== ''
  const hasFilters = priorityFilter !== 'all' || statusFilter !== 'all'
  const shouldShowEmptyResult = filteredTasks.length === 0 && (hasSearch || hasFilters)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 dark:from-gray-950 dark:to-gray-900 dark:text-gray-100">
      <Header
        taskCount={tasks.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddTask={() => setIsModalOpen(true)}
        onReset={resetTasks}
        theme={theme}
        onToggleTheme={toggleTheme}
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
          />
        )}
      </main>

      {(isModalOpen || editingTask) && (
        <TaskModal
          onClose={handleCloseModal}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onDelete={handleDeleteTask}
          task={editingTask}
        />
      )}
    </div>
  )
}

export default App
