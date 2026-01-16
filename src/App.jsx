import { useState } from 'react'
import { useTasks } from './hooks/useTasks'
import { Board } from './components/Board'
import { TaskModal } from './components/Task/TaskModal'
import { createTask, TASK_PRIORITY_LABELS } from './data/taskStructure'

function App() {
  const { tasks, isLoading, resetTasks, changeTaskStatus, addTask, updateTask, deleteTask } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('all')

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    )
  }

  /**
   * 태스크 드래그 앤 드롭 핸들러
   */
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

  // 검색어 + 우선순위 필터링 (AND 조건)
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchQuery.trim()
      ? task.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
    return matchesSearch && matchesPriority
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                칸반 태스크 매니저
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                총 {tasks.length}개의 태스크
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
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
                <input
                  type="text"
                  placeholder="태스크 검색..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-48 rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <select
                value={priorityFilter}
                onChange={e => setPriorityFilter(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">전체 우선순위</option>
                {Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-sm"
              >
                태스크 추가
              </button>
              <button
                onClick={resetTasks}
                className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-200 hover:shadow-sm"
              >
                테이블 초기화
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 md:py-10">
        <Board tasks={filteredTasks} onTaskMove={handleTaskMove} onTaskEdit={handleEditTask} />
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
