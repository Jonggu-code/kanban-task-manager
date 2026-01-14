import { TaskCard } from './TaskCard'

/**
 * 칸반 보드의 개별 컬럼 컴포넌트
 */
export const Column = ({ title, tasks, headerColor, headerBgColor }) => {
  return (
    <div className="flex min-h-[600px] w-full flex-col rounded-xl bg-white p-4 shadow-sm md:w-80">
      <div className={`mb-4 flex items-center justify-between rounded-lg ${headerBgColor} px-4 py-3`}>
        <h2 className={`text-base font-bold ${headerColor}`}>{title}</h2>
        <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold ${headerColor}`}>
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3 overflow-y-auto pb-2">
        {tasks.length > 0 ? (
          tasks.map(task => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="flex h-32 items-center justify-center">
            <p className="text-sm text-gray-400">태스크가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  )
}
