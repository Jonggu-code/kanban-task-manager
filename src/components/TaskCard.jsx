import { Draggable } from '@hello-pangea/dnd'
import {
  TASK_PRIORITY_LABELS,
  TASK_PRIORITY_COLORS,
} from '../data/taskStructure'

/**
 * 개별 태스크를 표시하는 카드 컴포넌트
 */
export const TaskCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group cursor-pointer rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-lg ${
            snapshot.isDragging ? 'rotate-3 shadow-2xl' : ''
          }`}
        >
          <div className="mb-3">
            <h3 className="text-md font-bold text-gray-900 group-hover:text-blue-600">
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500">
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <span
              className={`rounded-md px-2.5 py-1 text-xs font-semibold ${TASK_PRIORITY_COLORS[task.priority]}`}
            >
              {TASK_PRIORITY_LABELS[task.priority]}
            </span>

            {task.tags && task.tags.length > 0 && (
              <div className="flex gap-1.5">
                {task.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
                {task.tags.length > 2 && (
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                    +{task.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}
