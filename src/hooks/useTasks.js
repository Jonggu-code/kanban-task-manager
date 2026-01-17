import { useCallback, useEffect, useRef, useState } from 'react'
import { clearTasks, loadTasks, saveTasks } from '../utils/storage'
import { initialTasks } from '../data/initialTasks'

const MIN_LOADING_MS = 2000

/**
 * 태스크 상태를 관리하는 커스텀 훅
 * localStorage와 자동 동기화
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const loadTimerRef = useRef(null)

  const clearLoadTimer = () => {
    if (!loadTimerRef.current) return
    window.clearTimeout(loadTimerRef.current)
    loadTimerRef.current = null
  }

  const loadFromStorage = useCallback(() => {
    clearLoadTimer()
    setIsLoading(true)
    setError(null)

    const startedAt = Date.now()

    try {
      const loadedTasks = loadTasks(initialTasks, { throwOnError: true })
      setTasks(loadedTasks)
    } catch (err) {
      console.error('태스크를 불러오는 데 실패했습니다:', err)
      setTasks(initialTasks)
      setError(
        '저장된 태스크 데이터를 불러오지 못했습니다. 브라우저 저장소 설정을 확인하거나 초기화를 시도해주세요.'
      )
    } finally {
      const elapsed = Date.now() - startedAt
      const remaining = Math.max(0, MIN_LOADING_MS - elapsed)
      loadTimerRef.current = window.setTimeout(() => {
        setIsLoading(false)
        loadTimerRef.current = null
      }, remaining)
    }
  }, [])

  // 초기 데이터 로드 (최소 2초 로딩 화면 노출)
  useEffect(() => {
    loadFromStorage()
    return () => clearLoadTimer()
  }, [loadFromStorage])

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
    try {
      clearTasks()
    } catch (err) {
      console.error('태스크 초기화 실패:', err)
    }
    setTasks(initialTasks)
    setError(null)
  }

  return {
    tasks,
    isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
    resetTasks,
    reloadTasks: loadFromStorage,
    clearError: () => setError(null),
  }
}
