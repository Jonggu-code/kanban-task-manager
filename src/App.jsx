import { useTasks } from './hooks/useTasks'
import { Board } from './components/Board'

function App() {
  const { tasks, isLoading, resetTasks } = useTasks()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">칸반 태스크 매니저</h1>
              <p className="mt-2 text-sm text-gray-500">총 {tasks.length}개의 태스크</p>
            </div>
            <button
              onClick={resetTasks}
              className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-200 hover:shadow-sm"
            >
              초기화
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 md:py-10">
        <Board tasks={tasks} />
      </main>
    </div>
  )
}

export default App
