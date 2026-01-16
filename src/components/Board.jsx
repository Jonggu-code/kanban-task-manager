import { useState } from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import { Column } from './Column'
import { MobileStatusTabs } from './Board/MobileStatusTabs'
import { TASK_STATUS, TASK_STATUS_LABELS } from '../data/taskStructure'

/**
 * 칸반 보드 메인 컴포넌트
 * Desktop/Tablet: 3단계 컬럼 (할 일, 진행 중, 완료)
 * Mobile: 상태 탭으로 전환하여 한 번에 하나의 컬럼만 표시
 */
export const Board = ({ tasks, onTaskMove, onTaskEdit, highlightQuery }) => {
  const [mobileActiveTab, setMobileActiveTab] = useState(TASK_STATUS.TODO)

  // 상태별로 태스크 필터링
  const todoTasks = tasks.filter(task => task.status === TASK_STATUS.TODO)
  const inProgressTasks = tasks.filter(
    task => task.status === TASK_STATUS.IN_PROGRESS
  )
  const doneTasks = tasks.filter(task => task.status === TASK_STATUS.DONE)

  // 상태별 태스크 수
  const taskCounts = {
    [TASK_STATUS.TODO]: todoTasks.length,
    [TASK_STATUS.IN_PROGRESS]: inProgressTasks.length,
    [TASK_STATUS.DONE]: doneTasks.length,
  }

  // 현재 모바일 탭에 해당하는 태스크
  const getMobileActiveTasks = () => {
    switch (mobileActiveTab) {
      case TASK_STATUS.IN_PROGRESS:
        return inProgressTasks
      case TASK_STATUS.DONE:
        return doneTasks
      default:
        return todoTasks
    }
  }

  // 현재 모바일 탭에 해당하는 컬럼 스타일
  const getMobileColumnStyles = () => {
    switch (mobileActiveTab) {
      case TASK_STATUS.IN_PROGRESS:
        return {
          headerColor: 'text-yellow-700 dark:text-yellow-300',
          headerBgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        }
      case TASK_STATUS.DONE:
        return {
          headerColor: 'text-green-700 dark:text-green-300',
          headerBgColor: 'bg-green-100 dark:bg-green-900/30',
        }
      default:
        return {
          headerColor: 'text-blue-700 dark:text-blue-300',
          headerBgColor: 'bg-blue-100 dark:bg-blue-900/30',
        }
    }
  }

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

  const mobileStyles = getMobileColumnStyles()

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {/* 모바일 상태 탭 */}
      <MobileStatusTabs
        activeTab={mobileActiveTab}
        onTabChange={setMobileActiveTab}
        taskCounts={taskCounts}
      />

      {/* 모바일: 선택된 탭의 컬럼만 표시 */}
      <div className="md:hidden">
        <Column
          title={TASK_STATUS_LABELS[mobileActiveTab]}
          tasks={getMobileActiveTasks()}
          headerColor={mobileStyles.headerColor}
          headerBgColor={mobileStyles.headerBgColor}
          droppableId={mobileActiveTab}
          onTaskEdit={onTaskEdit}
          highlightQuery={highlightQuery}
          isMobile
        />
      </div>

      {/* 태블릿/데스크톱: 3컬럼 레이아웃 */}
      <div className="hidden gap-4 md:flex md:items-start md:justify-center lg:gap-6">
        <Column
          title={TASK_STATUS_LABELS[TASK_STATUS.TODO]}
          tasks={todoTasks}
          headerColor="text-blue-700 dark:text-blue-300"
          headerBgColor="bg-blue-100 dark:bg-blue-900/30"
          droppableId={TASK_STATUS.TODO}
          onTaskEdit={onTaskEdit}
          highlightQuery={highlightQuery}
        />
        <Column
          title={TASK_STATUS_LABELS[TASK_STATUS.IN_PROGRESS]}
          tasks={inProgressTasks}
          headerColor="text-yellow-700 dark:text-yellow-300"
          headerBgColor="bg-yellow-100 dark:bg-yellow-900/30"
          droppableId={TASK_STATUS.IN_PROGRESS}
          onTaskEdit={onTaskEdit}
          highlightQuery={highlightQuery}
        />
        <Column
          title={TASK_STATUS_LABELS[TASK_STATUS.DONE]}
          tasks={doneTasks}
          headerColor="text-green-700 dark:text-green-300"
          headerBgColor="bg-green-100 dark:bg-green-900/30"
          droppableId={TASK_STATUS.DONE}
          onTaskEdit={onTaskEdit}
          highlightQuery={highlightQuery}
        />
      </div>
    </DragDropContext>
  )
}
