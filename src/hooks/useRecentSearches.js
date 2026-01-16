import { useState, useCallback } from 'react'

const STORAGE_KEY = 'kanban-recent-searches'
const MAX_RECENT_SEARCHES = 5

/**
 * localStorage에서 최근 검색어 로드
 */
const loadRecentSearches = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        return parsed.slice(0, MAX_RECENT_SEARCHES)
      }
    }
  } catch (error) {
    console.error('최근 검색어 로드 실패:', error)
  }
  return []
}

/**
 * 최근 검색어 관리를 위한 커스텀 훅
 * localStorage에 최대 5개의 최근 검색어를 저장
 *
 * @returns {Object} 최근 검색어 목록과 관리 함수
 */
export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState(loadRecentSearches)

  // localStorage에 최근 검색어 저장
  const saveToStorage = useCallback(searches => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(searches))
    } catch (error) {
      console.error('최근 검색어 저장 실패:', error)
    }
  }, [])

  // 검색어 추가 (중복 제거, 최대 5개 유지)
  const addRecentSearch = useCallback(
    query => {
      const trimmedQuery = query.trim()
      if (!trimmedQuery) return

      setRecentSearches(prev => {
        // 이미 존재하면 제거 후 맨 앞에 추가
        const filtered = prev.filter(
          item => item.toLowerCase() !== trimmedQuery.toLowerCase()
        )
        const updated = [trimmedQuery, ...filtered].slice(0, MAX_RECENT_SEARCHES)
        saveToStorage(updated)
        return updated
      })
    },
    [saveToStorage]
  )

  // 특정 검색어 삭제
  const removeRecentSearch = useCallback(
    query => {
      setRecentSearches(prev => {
        const updated = prev.filter(item => item !== query)
        saveToStorage(updated)
        return updated
      })
    },
    [saveToStorage]
  )

  // 모든 검색어 삭제
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
    saveToStorage([])
  }, [saveToStorage])

  return {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  }
}
