import { useState } from 'react'
import { TASK_PRIORITY, TASK_PRIORITY_LABELS } from '../../data/taskStructure'

const formatDate = dateString => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const TaskModal = ({ onClose, onSubmit, onDelete, task = null }) => {
  const isEditMode = task !== null
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [priority, setPriority] = useState(
    task?.priority || TASK_PRIORITY.MEDIUM
  )
  const [error, setError] = useState('')

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
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {isEditMode ? '태스크 수정' : '새 태스크 추가'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
          >
            닫기
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              제목
            </label>
            <input
              value={title}
              onChange={event => setTitle(event.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              placeholder="제목을 입력해주세요."
            />
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              설명
            </label>
            <textarea
              value={description}
              onChange={event => setDescription(event.target.value)}
              className="min-h-[100px] w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              placeholder="설명을 입력해주세요."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              우선순위
            </label>
            <select
              value={priority}
              onChange={event => setPriority(event.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
              {Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {isEditMode && (
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-700">
                태스크 정보
              </h3>
              <div className="space-y-2 text-sm">
                {task.tags && task.tags.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="w-16 shrink-0 text-gray-500">태그</span>
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="rounded-md bg-gray-200 px-2 py-0.5 text-xs text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="w-16 shrink-0 text-gray-500">생성일</span>
                  <span className="text-gray-700">
                    {formatDate(task.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-16 shrink-0 text-gray-500">수정일</span>
                  <span className="text-gray-700">
                    {formatDate(task.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-2">
            {isEditMode && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(task.id)}
                className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                삭제
              </button>
            )}
            <div
              className={`flex gap-2 ${!isEditMode || !onDelete ? 'ml-auto' : ''}`}
            >
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {isEditMode ? '수정 완료' : '태스크 생성'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
