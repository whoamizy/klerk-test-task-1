<template>
  <div class="rounded-2xl bg-white shadow-2xl max-w-[500px] mx-auto p-4">
    <h1 class="font-semibold mb-4 text-3xl">Рубрикатор</h1>
    <RubricsList v-model="allowEmpty" :rubrics="rubrics" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RubricsList, type IRubricItem } from '@/widgets/rubrics-list'

const rubrics = ref<IRubricItem[]>([])
const allowEmpty = ref(false)
const debounceTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

const apiUrl = computed(() => {
  const API_URL = import.meta.env.VITE_API_URL

  return allowEmpty.value ? API_URL + `?allowEmpty=1` : API_URL
})

const fetchRubrics = async () => {
  rubrics.value = []
  try {
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
