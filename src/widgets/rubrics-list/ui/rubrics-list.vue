<template>
  <div>
    <div>
      <input type="checkbox" v-model="model" id="changeAllowEmpty" />
      <label class="cursor-pointer" for="changeAllowEmpty">Отображать пустые рубрики</label>
    </div>
    <div>Общая сумма count: {{ countStore.totalCount }}</div>
    <div v-if="!rubrics.length">Загрузка...</div>
    <ul v-else>
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
