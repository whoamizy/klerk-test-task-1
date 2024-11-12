<template>
  <div>
    <h1>Рубрикатор</h1>
    <RubricsList v-model="allowEmpty" :rubrics="rubrics" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RubricsList } from '@/widgets/rubrics-list'
import type { IRubricItem } from '@/entities/rubrics'

const API_URL = import.meta.env.VITE_API_URL

const rubrics = ref<IRubricItem[]>([])

const allowEmpty = ref(false)
const debounceTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

const apiUrl = computed(() => {
  return API_URL + `?allowEmpty=${allowEmpty.value ? 1 : 0}`
})

const fetchRubrics = async () => {
  try {
    rubrics.value = []
    const response = await fetch(apiUrl.value)
    rubrics.value = await response.json()
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  fetchRubrics()
})

watch(allowEmpty, () => {
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value)
  }

  debounceTimeout.value = setTimeout(() => {
    fetchRubrics()
  }, 300)
})
</script>
