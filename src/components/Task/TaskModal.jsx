import { useState } from 'react'
import { TASK_PRIORITY } from '../../data/taskStructure'

const PRIORITY_OPTIONS = [
  { value: TASK_PRIORITY.LOW, label: '낮음' },
  { value: TASK_PRIORITY.MEDIUM, label: '보통' },
  { value: TASK_PRIORITY.HIGH, label: '높음' },
]

export const TaskModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(TASK_PRIORITY.MEDIUM)
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
          <h2 className="text-xl font-bold text-gray-900">새 태스크 추가</h2>
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
              {PRIORITY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
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
              태스크 생성
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
