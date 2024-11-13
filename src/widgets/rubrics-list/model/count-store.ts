import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCountStore = defineStore('countStore', () => {
  const countsMap = ref<Map<number, number>>(new Map())

  const checkChecked = (id: number) => {
    return countsMap.value.has(id)
  }

  const addCount = (id: number, count: number) => {
    countsMap.value.set(id, count)
  }

  const removeCount = (id: number) => {
    countsMap.value.delete(id)
  }

  const updateCount = (id: number, count: number) => {
    console.log('@@@', id, count)
    if (checkChecked(id)) {
      removeCount(id)
    } else {
      addCount(id, count)
    }
  }

  const totalCount = computed(() => {
    return Array.from(countsMap.value.values()).reduce((acc, count) => acc + count, 0)
  })

  return { countsMap, checkChecked, addCount, removeCount, updateCount, totalCount }
})
