import { useEffect, useRef, useState } from 'react'
import {
  TASK_PRIORITY,
  TASK_PRIORITY_LABELS,
  TASK_STATUS,
  TASK_STATUS_LABELS,
} from '../../data/taskStructure'

const formatDate = dateString => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const TaskModal = ({
  onClose,
  onSubmit,
  onDelete,
  task = null,
  closeSignal,
}) => {
  const isEditMode = task !== null
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [priority, setPriority] = useState(
    task?.priority || TASK_PRIORITY.MEDIUM
  )
  const [status, setStatus] = useState(task?.status || TASK_STATUS.TODO)
  const [error, setError] = useState('')

  // 모바일 스와이프 관련 state
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const touchStartY = useRef(0)
  const [isOpen, setIsOpen] = useState(false)
  const closeTimerRef = useRef(null)

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setIsOpen(true))
    return () => {
      window.cancelAnimationFrame(raf)
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  const requestClose = ({ toBottom = false } = {}) => {
    if (closeTimerRef.current) return
    setIsOpen(false)

    if (toBottom) {
      setDragY(window.innerHeight || 800)
    }

    closeTimerRef.current = window.setTimeout(() => {
      onClose()
    }, 180)
  }

  useEffect(() => {
    if (!closeSignal) return
    requestClose()
    // requestClose는 effect 재바인딩 방지를 위해 의존성에서 제외
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeSignal])

  const handleTouchStart = e => {
    touchStartY.current = e.touches[0].clientY
    setIsDragging(true)
  }

  const handleTouchMove = e => {
    if (!isDragging) return
    const currentY = e.touches[0].clientY
    const diff = currentY - touchStartY.current
    // 아래로만 드래그 가능
    if (diff > 0) {
      setDragY(diff)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    // 100px 이상 드래그하면 모달 닫기
    if (dragY > 100) {
      requestClose({ toBottom: true })
      return
    }
    setDragY(0)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setError('제목은 필수입니다.')
      return
    }

    onSubmit({
      title: trimmedTitle,
      description: description.trim(),
      priority,
      status,
    })
  }

  const overlayBaseAlpha = 0.45
  const dragFadeFactor = Math.max(0, 1 - dragY / 240)
  const overlayAlpha = overlayBaseAlpha * (isOpen ? 1 : 0) * dragFadeFactor
  const panelOpacity = (isOpen ? 1 : 0) * dragFadeFactor
  const panelTranslateY = (isOpen ? 0 : 24) + dragY

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center px-0 transition-[background-color] duration-200 ease-out md:items-center md:px-4"
      role="dialog"
      aria-modal="true"
      onClick={e => e.target === e.currentTarget && requestClose()}
      style={{
        backgroundColor: `rgba(0,0,0,${overlayAlpha})`,
      }}
    >
      <div
        className="flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl dark:bg-gray-900 md:max-w-lg md:rounded-2xl"
        style={{
          opacity: panelOpacity,
          transform: `translateY(${panelTranslateY}px)`,
          transition: isDragging
            ? 'none'
            : 'transform 0.2s ease-out, opacity 0.2s ease-out',
        }}
      >
        {/* 헤더(고정): 모바일 핸들바 + 타이틀 */}
        <div className="shrink-0 border-b border-gray-100 px-4 pb-3 pt-3 dark:border-gray-800 md:px-6 md:pb-4 md:pt-4">
          {/* 모바일 핸들바 */}
          <div
            className="mb-3 flex justify-center md:hidden touch-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-700" />
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 md:text-xl">
              {isEditMode ? '태스크 수정' : '새 태스크 추가'}
            </h2>
            <button
              type="button"
              onClick={() => requestClose()}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:px-2 md:py-1"
            >
              <svg
                className="h-5 w-5 md:hidden"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="hidden text-sm md:inline">닫기</span>
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          {/* 콘텐츠(스크롤): 입력 폼 */}
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 md:space-y-4 md:px-6 md:py-5">
            <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300 md:mb-2">
              제목
            </label>
            <input
              value={title}
              onChange={event => setTitle(event.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:ring-blue-500/30 md:py-2"
              placeholder="제목을 입력해주세요."
            />
            {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
          </div>

          {/* 모바일 전용: 상태 변경 (DnD 대체) */}
          <div className="md:hidden">
            <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300 md:mb-2">
              상태
            </label>
            <select
              value={status}
              onChange={event => setStatus(event.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:ring-blue-500/30 md:py-2"
            >
              {Object.values(TASK_STATUS).map(value => (
                <option key={value} value={value}>
                  {TASK_STATUS_LABELS[value]}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              모바일 환경에서는 드래그 앤 드롭 대신 상태를 직접 선택할 수 있어요.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300 md:mb-2">
              설명
            </label>
            <textarea
              value={description}
              onChange={event => setDescription(event.target.value)}
              className="min-h-[80px] w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:ring-blue-500/30 md:min-h-[100px] md:py-2"
              placeholder="설명을 입력해주세요."
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300 md:mb-2">
              우선순위
            </label>
            <select
              value={priority}
              onChange={event => setPriority(event.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:ring-blue-500/30 md:py-2"
            >
              {Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {isEditMode && (
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-800/40 md:p-4">
              <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300 md:mb-3">
                태스크 정보
              </h3>
              <div className="space-y-1.5 text-sm md:space-y-2">
                {task.tags && task.tags.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="w-14 shrink-0 text-xs text-gray-500 md:w-16 md:text-sm">
                      태그
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-gray-200 px-1.5 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-200 md:px-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="w-14 shrink-0 text-xs text-gray-500 dark:text-gray-400 md:w-16 md:text-sm">
                    생성일
                  </span>
                  <span className="text-xs text-gray-700 dark:text-gray-200 md:text-sm">
                    {formatDate(task.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-14 shrink-0 text-xs text-gray-500 dark:text-gray-400 md:w-16 md:text-sm">
                    수정일
                  </span>
                  <span className="text-xs text-gray-700 dark:text-gray-200 md:text-sm">
                    {formatDate(task.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          )}
          </div>

          {/* 하단 액션(고정): 취소/저장/삭제 */}
          <div className="shrink-0 border-t border-gray-100 px-4 py-3 dark:border-gray-800 md:px-6 md:py-4">
            <div className="flex flex-col-reverse gap-2 md:flex-row md:justify-between">
            {/* 모바일: 아래에서 위로 (취소 -> 생성) / 삭제는 맨 아래 */}
            <div
              className={`flex w-full gap-2 md:w-auto ${isEditMode && onDelete ? '' : 'md:ml-auto'}`}
            >
              {/* 삭제 버튼: 모바일에서는 전체 너비 */}
              {isEditMode && onDelete && (
                <button
                  type="button"
                  onClick={() => {
                    onDelete(task.id)
                    requestClose()
                  }}
                  className="w-full rounded-lg border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:text-red-300 dark:hover:bg-red-900/20 md:w-auto md:px-4 md:py-2"
                >
                  삭제
                </button>
              )}
            </div>
            <div className="flex w-full gap-2 md:w-auto">
              <button
                type="button"
                onClick={() => requestClose()}
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 md:flex-none md:px-4 md:py-2"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 md:flex-none md:px-4 md:py-2"
              >
                {isEditMode ? '수정 완료' : '태스크 생성'}
              </button>
            </div>
          </div>
          </div>
        </form>
      </div>
    </div>
  )
}
