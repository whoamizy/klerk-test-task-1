<template>
  <li>
    <div class="flex items-center gap-2">
      <span
        v-if="hasChildren"
        class="cursor-pointer w-5 h-5 flex items-center justify-center border rounded-sm hover:opacity-70"
        @click="toggle"
      >
        {{ openerContent }}
      </span>

      <div class="flex items-baseline gap-2">
        <input type="checkbox" :checked="isChecked" @change="updateCheckbox(rubric)" />
        <a class="text-base hover:text-blue-500" :href="getLink(rubric.url)" target="_blank">
          {{ rubric.title }} ({{ rubric.count }}) ({{ childrenCount }})
        </a>
      </div>
    </div>

    <ul class="ml-10 space-y-2 mt-2" v-if="isOpen && hasChildren">
      <RubricsItem
        v-for="rubricChild in rubric.children"
        :key="rubricChild.id"
        :rubric="rubricChild"
        :is-checked="countStore.checkChecked(rubricChild.id)"
        @update-total="countStore.updateCount"
      />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useCountStore, type IRubricItem } from '../model'
import RubricsItem from './rubrics-item.vue'

interface Props {
  isChecked: boolean
  rubric: IRubricItem
}
const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'updateTotal', rubricId: number, count: number): void
}>()

const countStore = useCountStore()

const isOpen = ref(false)
const toggle = () => {
  isOpen.value = !isOpen.value
}
const openerContent = computed(() => (isOpen.value ? '-' : '+'))

const hasChildren = computed(() => props.rubric?.children && props.rubric.children.length > 0)

const getLink = (path: string) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL

  return BASE_URL + path
}

const childrenCount = computed(() => {
  return (
    props.rubric.count +
    (props.rubric.children?.reduce((acc, rubric) => acc + rubric.count, 0) || 0)
  )
})

// Обновление общей суммы count включая дочерние на любом уровне вложенности
const updateCheckbox = (item: IRubricItem) => {
  emits('updateTotal', item.id, item.count)

  if (item.children && item.children.length > 0) {
    item.children.forEach((child) => {
      if (countStore.checkChecked(item.id)) {
        countStore.removeCount(child.id)
      } else {
        countStore.addCount(child.id, child.count)
      }
      updateCheckbox(child)
    })
  }
}
</script>
