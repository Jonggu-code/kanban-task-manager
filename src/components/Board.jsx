import { DragDropContext } from '@hello-pangea/dnd'
import { Column } from './Column'
import { TASK_STATUS, TASK_STATUS_LABELS } from '../data/taskStructure'

/**
 * 칸반 보드 메인 컴포넌트
 * 3단계 컬럼 (할 일, 진행 중, 완료)으로 구성
 */
export const Board = ({ tasks, onTaskMove, onTaskEdit }) => {
  // 상태별로 태스크 필터링
  const todoTasks = tasks.filter(task => task.status === TASK_STATUS.TODO)
  const inProgressTasks = tasks.filter(
    task => task.status === TASK_STATUS.IN_PROGRESS
  )
  const doneTasks = tasks.filter(task => task.status === TASK_STATUS.DONE)

  /**
   * 드래그가 끝났을 때 호출되는 핸들러
   */
  const handleDragEnd = result => {
    const { destination, source, draggableId } = result

    // 드롭 위치가 없으면 (보드 밖으로 드롭) 무시
    if (!destination) {
      return
    }

    // 같은 위치에 드롭하면 무시
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // 다른 컬럼으로 이동한 경우
    if (destination.droppableId !== source.droppableId) {
      const newStatus = destination.droppableId
      onTaskMove(draggableId, newStatus)
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-center md:gap-6">
        <Column
          title={TASK_STATUS_LABELS[TASK_STATUS.TODO]}
          tasks={todoTasks}
          headerColor="text-blue-700"
          headerBgColor="bg-blue-50"
          droppableId={TASK_STATUS.TODO}
          onTaskEdit={onTaskEdit}
        />
        <Column
          title={TASK_STATUS_LABELS[TASK_STATUS.IN_PROGRESS]}
          tasks={inProgressTasks}
          headerColor="text-yellow-700"
          headerBgColor="bg-yellow-50"
          droppableId={TASK_STATUS.IN_PROGRESS}
          onTaskEdit={onTaskEdit}
        />
        <Column
          title={TASK_STATUS_LABELS[TASK_STATUS.DONE]}
          tasks={doneTasks}
          headerColor="text-green-700"
          headerBgColor="bg-green-50"
          droppableId={TASK_STATUS.DONE}
          onTaskEdit={onTaskEdit}
        />
      </div>
    </DragDropContext>
  )
}
