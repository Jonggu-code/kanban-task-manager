import { Draggable } from '@hello-pangea/dnd'
import {
  TASK_PRIORITY_LABELS,
  TASK_PRIORITY_COLORS,
} from '../data/taskStructure'

const formatShortDate = dateString => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
  })
}

/**
 * 개별 태스크를 표시하는 카드 컴포넌트
 */
export const TaskCard = ({ task, index, onEdit }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onEdit(task)}
          className={`group cursor-pointer rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-lg ${
            snapshot.isDragging ? 'rotate-3 shadow-2xl' : ''
          }`}
        >
          {task.createdAt && (
            <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-400">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{formatShortDate(task.createdAt)}</span>
            </div>
          )}

          <h3 className="mb-1 font-bold text-gray-900 group-hover:text-blue-600">
            {task.title}
          </h3>

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
