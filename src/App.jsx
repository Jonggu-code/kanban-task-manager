import { useState } from 'react'
import { useTasks } from './hooks/useTasks'
import { useTaskFilter } from './hooks/useTaskFilter'
import { Header } from './components/Header/Header'
import { FilterBar } from './components/Filter/FilterBar'
import { Board } from './components/Board'
import { TaskModal } from './components/Task/TaskModal'
import { createTask } from './data/taskStructure'

function App() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        taskCount={tasks.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddTask={() => setIsModalOpen(true)}
        onReset={resetTasks}
      />

      <main className="container mx-auto max-w-[1000px] px-4 py-4 md:px-6 md:py-6">
        <FilterBar
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
          sortBy={sortBy}
          onPriorityChange={setPriorityFilter}
          onStatusChange={setStatusFilter}
          onSortChange={setSortBy}
        />

        <Board
          tasks={filteredTasks}
          onTaskMove={handleTaskMove}
          onTaskEdit={handleEditTask}
          highlightQuery={debouncedSearchQuery}
        />
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
