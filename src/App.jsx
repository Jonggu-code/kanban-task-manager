import { useTasks } from './hooks/useTasks'

function App() {
  const { tasks, isLoading } = useTasks()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">칸반 태스크 매니저</h1>
          <p className="mt-2 text-sm text-gray-600">총 {tasks.length}개의 태스크</p>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">태스크 목록</h2>
          <div className="space-y-2">
            {tasks.map(task => (
              <div
                key={task.id}
                className="rounded border border-gray-200 p-4 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                  </div>
                  <div className="ml-4 flex gap-2">
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                      {task.status}
                    </span>
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
