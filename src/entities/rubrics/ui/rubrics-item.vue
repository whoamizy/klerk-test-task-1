<template>
  <li>
    <div class="flex items-center gap-2">
      <span
        v-if="hasChildren"
        class="cursor-pointer w-5 h-5 flex items-center justify-center border rounded-sm"
        @click="toggle"
      >
        {{ openerContent }}
      </span>
      <a :href="getLink(rubric.url)" target="_blank">
        {{ rubric.title }} ({{ rubric.count }}) ({{ childrenCount }})
      </a>
    </div>
    <ul class="ml-4" v-if="isOpen && hasChildren">
      <RubricsItem
        v-for="rubricChild in rubric.children"
        :key="rubricChild.id"
        :rubric="rubricChild"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IRubricItem } from '../model'

interface Props {
  rubric: IRubricItem
}
const props = defineProps<Props>()

const BASE_URL = import.meta.env.VITE_BASE_URL
const getLink = (path: string) => {
  return BASE_URL + path
}

const isOpen = ref(true)
const toggle = () => {
  isOpen.value = !isOpen.value
}
const openerContent = computed(() => {
  return isOpen.value ? '-' : '+'
})

const hasChildren = computed(() => {
  return props.rubric?.children && !!props.rubric.children.length
})

const childrenCount = computed(() => {
  return props.rubric?.children?.reduce((acc, rubric) => acc + rubric.count, 0)
})
</script>
