import { useState } from 'react'
import { useTasks } from './hooks/useTasks'
import { Board } from './components/Board'
import { TaskModal } from './components/Task/TaskModal'
import { createTask } from './data/taskStructure'

function App() {
  const { tasks, isLoading, resetTasks, changeTaskStatus, addTask } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)

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
            <div className="flex items-center gap-2">
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
        <Board tasks={tasks} onTaskMove={handleTaskMove} />
      </main>

      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateTask}
        />
      )}
    </div>
  )
}

export default App
