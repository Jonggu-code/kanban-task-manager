/**
 * 태스크 데이터 구조 정의
 */

/**
 * Task 객체 구조
 * @typedef {Object} Task
 * @property {string} id - 고유 식별자 (UUID)
 * @property {string} title - 태스크 제목 (필수)
 * @property {string} description - 태스크 상세 설명
 * @property {string} status - 태스크 상태 (todo, in_progress, done)
 * @property {string} priority - 우선순위 (low, medium, high)
 * @property {string} createdAt - 생성 일시 (ISO 8601 형식)
 * @property {string} updatedAt - 수정 일시 (ISO 8601 형식)
 * @property {string|null} dueDate - 마감일 (ISO 8601 형식, optional)
 * @property {string[]} tags - 태그 목록 (optional)
 */

/**
 * 태스크 상태 정의
 */
export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
}

/**
 * 태스크 상태 표시 이름 (한글)
 */
export const TASK_STATUS_LABELS = {
  [TASK_STATUS.TODO]: '할 일',
  [TASK_STATUS.IN_PROGRESS]: '진행 중',
  [TASK_STATUS.DONE]: '완료',
}

/**
 * 태스크 우선순위 정의
 */
export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
}

/**
 * 태스크 우선순위 표시 이름 (한글)
 */
export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITY.LOW]: '낮음',
  [TASK_PRIORITY.MEDIUM]: '보통',
  [TASK_PRIORITY.HIGH]: '높음',
}

/**
 * 태스크 우선순위 색상 (Tailwind CSS 클래스)
 */
export const TASK_PRIORITY_COLORS = {
  [TASK_PRIORITY.LOW]: 'bg-gray-100 text-gray-800',
  [TASK_PRIORITY.MEDIUM]: 'bg-blue-100 text-blue-800',
  [TASK_PRIORITY.HIGH]: 'bg-red-100 text-red-800',
}

/**
 * 새 태스크 생성 템플릿
 * @param {Object} taskData - 태스크 데이터
 * @returns {Task} 생성된 태스크 객체
 */
export const createTask = taskData => {
  const now = new Date().toISOString()

  return {
    id: crypto.randomUUID(),
    title: taskData.title || '',
    description: taskData.description || '',
    status: taskData.status || TASK_STATUS.TODO,
    priority: taskData.priority || TASK_PRIORITY.MEDIUM,
    createdAt: now,
    updatedAt: now,
    dueDate: taskData.dueDate || null,
    tags: taskData.tags || [],
  }
}

/**
 * 태스크 유효성 검사
 * @param {Task} task - 검사할 태스크
 * @returns {boolean} 유효성 여부
 */
export const validateTask = task => {
  if (!task.id || typeof task.id !== 'string') return false
  if (!task.title || typeof task.title !== 'string' || task.title.trim() === '')
    return false
  if (!Object.values(TASK_STATUS).includes(task.status)) return false
  if (!Object.values(TASK_PRIORITY).includes(task.priority)) return false
  if (!task.createdAt || !task.updatedAt) return false

  return true
}
