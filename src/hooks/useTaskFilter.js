import { useState, useMemo } from 'react'
import { useDebouncedValue } from './useDebouncedValue'

/**
 * 태스크 필터링을 위한 커스텀 훅
 * 검색어, 우선순위, 상태 필터를 조합하여 태스크 필터링
 *
 * @param {Array} tasks - 필터링할 태스크 배열
 * @returns {Object} 필터 상태와 필터링된 태스크
 */
// 우선순위 정렬을 위한 가중치
const PRIORITY_WEIGHT = { high: 3, medium: 2, low: 1 }

export const useTaskFilter = tasks => {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300)
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest') // newest, oldest, priority-high, priority-low

  // 검색어 + 우선순위 + 상태 필터링 + 정렬
  const filteredTasks = useMemo(() => {
    const filtered = tasks.filter(task => {
      const matchesSearch = debouncedSearchQuery.trim()
        ? task.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        : true
      const matchesPriority =
        priorityFilter === 'all' || task.priority === priorityFilter
      const matchesStatus =
        statusFilter === 'all' || task.status === statusFilter
      return matchesSearch && matchesPriority && matchesStatus
    })

    // 정렬 적용
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'priority-high':
          return PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority]
        case 'priority-low':
          return PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })
  }, [tasks, debouncedSearchQuery, priorityFilter, statusFilter, sortBy])

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
    sortBy,
    // 필터 변경 함수
    setSearchQuery,
    setPriorityFilter,
    setStatusFilter,
    setSortBy,
    resetFilters,
    // 필터링 결과
    filteredTasks,
    activeFilterCount,
  }
}
