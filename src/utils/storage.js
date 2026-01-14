/**
 * localStorage 관련 유틸리티 함수
 */

import { validateTask } from '../data/taskStructure'

const STORAGE_KEY = 'kanban-tasks'

/**
 * localStorage에서 태스크 데이터를 불러옴
 * @param {Array} fallbackData - 데이터가 없을 때 사용할 기본값
 * @returns {Array} 태스크 배열
 */
export const loadTasks = fallbackData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      // 저장된 데이터가 없으면 fallback 데이터 사용
      if (fallbackData) {
        saveTasks(fallbackData)
        return fallbackData
      }
      return []
    }

    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('localStorage에서 태스크를 불러오는데 실패했습니다:', error)
    return fallbackData || []
  }
}

/**
 * localStorage에 태스크 데이터를 저장
 * @param {Array} tasks - 저장할 태스크 배열
 * @returns {boolean} 저장 성공 여부
 */
export const saveTasks = tasks => {
  try {
    if (!Array.isArray(tasks)) {
      console.error('잘못된 태스크 데이터입니다: 배열이 필요합니다')
      return false
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    return true
  } catch (error) {
    console.error('localStorage에 태스크를 저장하는데 실패했습니다:', error)
    return false
  }
}

/**
 * localStorage에서 태스크 데이터를 삭제
 * @returns {boolean} 삭제 성공 여부
 */
export const clearTasks = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('localStorage에서 태스크를 삭제하는데 실패했습니다:', error)
    return false
  }
}

/**
 * localStorage에 특정 태스크를 업데이트
 * @param {string} taskId - 업데이트할 태스크 ID
 * @param {Object} updates - 업데이트할 필드들
 * @returns {boolean} 업데이트 성공 여부
 */
export const updateTask = (taskId, updates) => {
  try {
    const tasks = loadTasks()
    const index = tasks.findIndex(task => task.id === taskId)

    if (index === -1) {
      console.error(`ID ${taskId}를 가진 태스크를 찾을 수 없습니다`)
      return false
    }

    tasks[index] = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return saveTasks(tasks)
  } catch (error) {
    console.error('태스크를 업데이트하는데 실패했습니다:', error)
    return false
  }
}

/**
 * localStorage에 새 태스크를 추가
 * @param {Object} newTask - 추가할 태스크
 * @returns {boolean} 추가 성공 여부
 */
export const addTask = newTask => {
  try {
    // 유효성 검사 추가
    if (validateTask(newTask)) {
      console.error('유효하지 않은 태스크 데이터입니다.')
      return false
    }

    const tasks = loadTasks()
    tasks.push(newTask)
    return saveTasks(tasks)
  } catch (error) {
    console.error('태스크를 추가하는데 실패했습니다:', error)
    return false
  }
}

/**
 * localStorage에서 특정 태스크를 삭제
 * @param {string} taskId - 삭제할 태스크 ID
 * @returns {boolean} 삭제 성공 여부
 */
export const deleteTask = taskId => {
  try {
    const tasks = loadTasks()
    const filtered = tasks.filter(task => task.id !== taskId)

    if (filtered.length === tasks.length) {
      console.error(`ID ${taskId}를 가진 태스크를 찾을 수 없습니다`)
      return false
    }

    return saveTasks(filtered)
  } catch (error) {
    console.error('태스크를 삭제하는데 실패했습니다:', error)
    return false
  }
}
