import { Droppable } from '@hello-pangea/dnd'
import { TaskCard } from './TaskCard'

/**
 * 칸반 보드의 개별 컬럼 컴포넌트
 *
 * @param {Object} props
 * @param {boolean} props.isMobile - 모바일 뷰 여부 (탭에서 사용 시)
 */
export const Column = ({
  title,
  tasks,
  headerColor,
  headerBgColor,
  droppableId,
  onTaskEdit,
  highlightQuery,
  isMobile = false,
}) => {
  return (
    <div
      className={`flex w-full flex-col rounded-xl bg-white p-3 shadow-sm md:p-4 ${
        isMobile ? 'min-h-[400px]' : 'h-[500px] md:w-72 lg:h-[600px] lg:w-80'
      }`}
    >
      {/* 모바일에서는 탭에 이미 타이틀이 있으므로 헤더 숨김 */}
      <div
        className={`mb-3 flex items-center justify-between rounded-lg md:mb-4 ${headerBgColor} px-3 py-2 md:px-4 md:py-3 ${
          isMobile ? 'hidden' : ''
        }`}
      >
        <h2 className={`text-sm font-bold md:text-base ${headerColor}`}>
          {title}
        </h2>
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold md:h-6 md:w-6 ${headerColor}`}
        >
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`custom-scrollbar space-y-3 overflow-y-auto pb-2 ${
              snapshot.isDraggingOver ? 'bg-blue-50/50' : ''
            }`}
          >
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onEdit={onTaskEdit}
                  highlightQuery={highlightQuery}
                />
              ))
            ) : (
              <div className="flex h-32 items-center justify-center">
                <p className="text-sm text-gray-400">태스크가 없습니다.</p>
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
