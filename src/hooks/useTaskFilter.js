import { useState, useMemo } from 'react'
import { useDebouncedValue } from './useDebouncedValue'

/**
 * 태스크 필터링을 위한 커스텀 훅
 * 검색어, 우선순위, 상태 필터를 조합하여 태스크 필터링
 *
 * @param {Array} tasks - 필터링할 태스크 배열
 * @returns {Object} 필터 상태와 필터링된 태스크
 */
export const useTaskFilter = tasks => {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300)
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  // 검색어 + 우선순위 + 상태 필터링 (AND 조건)
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = debouncedSearchQuery.trim()
        ? task.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        : true
      const matchesPriority =
        priorityFilter === 'all' || task.priority === priorityFilter
      const matchesStatus =
        statusFilter === 'all' || task.status === statusFilter
      return matchesSearch && matchesPriority && matchesStatus
    })
  }, [tasks, debouncedSearchQuery, priorityFilter, statusFilter])

  // 필터 초기화
  const resetFilters = () => {
    setSearchQuery('')
    setPriorityFilter('all')
    setStatusFilter('all')
  }

  // 활성화된 필터 개수
  const activeFilterCount = [
    searchQuery.trim() !== '',
    priorityFilter !== 'all',
    statusFilter !== 'all',
  ].filter(Boolean).length

  return {
    // 필터 상태
    searchQuery,
    debouncedSearchQuery,
    priorityFilter,
    statusFilter,
    // 필터 변경 함수
    setSearchQuery,
    setPriorityFilter,
    setStatusFilter,
    resetFilters,
    // 필터링 결과
    filteredTasks,
    activeFilterCount,
  }
}
