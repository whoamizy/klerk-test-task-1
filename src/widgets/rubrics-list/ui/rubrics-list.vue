<template>
  <div class="space-y-3">
    <div class="flex items-baseline gap-2">
      <input type="checkbox" v-model="model" id="changeAllowEmpty" />
      <label class="cursor-pointer text-base font-medium hover:opacity-60" for="changeAllowEmpty">
        Отображать пустые рубрики
      </label>
    </div>
    <div class="text-base">
      Общая сумма count: <span class="font-medium">{{ countStore.totalCount }}</span>
    </div>

    <div v-if="!rubrics.length" class="text-xl font-medium">Загрузка...</div>
    <ul v-else class="space-y-2">
      <RubricsItem
        v-for="rubric in rubrics"
        :key="rubric.id"
        :rubric="rubric"
        :is-checked="countStore.checkChecked(rubric.id)"
        @update-total="countStore.updateCount"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useCountStore, type IRubricItem } from '../model'
import RubricsItem from './rubrics-item.vue'

interface Props {
  rubrics: IRubricItem[]
}
defineProps<Props>()

const model = defineModel<boolean>()
const countStore = useCountStore()
</script>
