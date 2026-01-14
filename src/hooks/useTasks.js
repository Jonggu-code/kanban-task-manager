import { useState, useEffect } from 'react'
import { loadTasks, saveTasks } from '../utils/storage'
import { initialTasks } from '../data/initialTasks'

/**
 * 태스크 상태를 관리하는 커스텀 훅
 * localStorage와 자동 동기화
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // 초기 데이터 로드
  useEffect(() => {
    try {
      const loadedTasks = loadTasks(initialTasks)
      setTasks(loadedTasks)
    } catch (error) {
      console.error('태스크를 불러오는 데 실패했습니다 :', error)
      setTasks(initialTasks)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // tasks 상태 변경 시 localStorage에 자동 저장
  useEffect(() => {
    if (!isLoading && tasks.length >= 0) {
      saveTasks(tasks)
    }
  }, [tasks, isLoading])

  /**
   * 태스크 추가
   */
  const addTask = newTask => {
    setTasks(prev => [...prev, newTask])
  }

  /**
   * 태스크 업데이트
   */
  const updateTask = (taskId, updates) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    )
  }

  /**
   * 태스크 삭제
   */
  const deleteTask = taskId => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  /**
   * 태스크 상태 변경 (칸반 보드 이동)
   */
  const changeTaskStatus = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus })
  }

  /**
   * 모든 태스크 초기화
   */
  const resetTasks = () => {
    setTasks(initialTasks)
  }

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
    resetTasks,
  }
}
