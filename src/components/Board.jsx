import { Column } from './Column'
import { TASK_STATUS, TASK_STATUS_LABELS } from '../data/taskStructure'

/**
 * 칸반 보드 메인 컴포넌트
 * 3단계 컬럼 (할 일, 진행 중, 완료)으로 구성
 */
export const Board = ({ tasks }) => {
  // 상태별로 태스크 필터링
  const todoTasks = tasks.filter(task => task.status === TASK_STATUS.TODO)
  const inProgressTasks = tasks.filter(task => task.status === TASK_STATUS.IN_PROGRESS)
  const doneTasks = tasks.filter(task => task.status === TASK_STATUS.DONE)

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-center md:gap-6">
      <Column
        title={TASK_STATUS_LABELS[TASK_STATUS.TODO]}
        tasks={todoTasks}
        headerColor="text-blue-700"
        headerBgColor="bg-blue-50"
      />
      <Column
        title={TASK_STATUS_LABELS[TASK_STATUS.IN_PROGRESS]}
        tasks={inProgressTasks}
        headerColor="text-yellow-700"
        headerBgColor="bg-yellow-50"
      />
      <Column
        title={TASK_STATUS_LABELS[TASK_STATUS.DONE]}
        tasks={doneTasks}
        headerColor="text-green-700"
        headerBgColor="bg-green-50"
      />
    </div>
  )
}
