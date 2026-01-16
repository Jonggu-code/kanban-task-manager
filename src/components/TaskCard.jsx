import { Draggable } from '@hello-pangea/dnd'
import {
  TASK_PRIORITY_LABELS,
  TASK_PRIORITY_COLORS,
} from '../data/taskStructure'
import { HighlightedText } from './common/HighlightedText'

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
 * 반응형 디자인: 모바일에서는 날짜 아이콘만, 태블릿+에서는 전체 정보 표시
 */
export const TaskCard = ({ task, index, onEdit, highlightQuery }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onEdit(task)}
          className={`group cursor-pointer rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-all hover:shadow-lg md:rounded-xl md:p-4 ${
            snapshot.isDragging ? 'rotate-2 shadow-2xl md:rotate-3' : ''
          }`}
        >
          {/* 상단: 날짜 + 우선순위 */}
          <div className="mb-1.5 flex items-center justify-between md:mb-2">
            {task.createdAt && (
              <div className="flex items-center gap-1 text-xs text-gray-400 md:gap-1.5">
                <svg
                  className="h-3 w-3 md:h-3.5 md:w-3.5"
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
            <span
              className={`rounded px-2 py-0.5 text-xs font-semibold md:rounded-md md:px-2.5 md:py-1 ${TASK_PRIORITY_COLORS[task.priority]}`}
            >
              {TASK_PRIORITY_LABELS[task.priority]}
            </span>
          </div>

          {/* 제목 */}
          <h3 className="mb-1 text-sm font-bold text-gray-900 group-hover:text-blue-600 md:text-base">
            <HighlightedText text={task.title} query={highlightQuery} />
          </h3>

          {/* 설명: 모바일에서는 1줄, 태블릿+에서는 2줄 */}
          {task.description && (
            <p className="mb-2 line-clamp-1 text-xs leading-relaxed text-gray-500 md:mb-3 md:line-clamp-2 md:text-sm">
              <HighlightedText text={task.description} query={highlightQuery} />
            </p>
          )}

          {/* 하단: 태그 (최대 3개 + 나머지 개수) */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 md:gap-1.5">
              {task.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600 md:rounded-md md:px-2"
                >
                  {tag}
                </span>
              ))}
              {task.tags.length > 3 && (
                <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600 md:rounded-md md:px-2">
                  +{task.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </Draggable>
  )
}
