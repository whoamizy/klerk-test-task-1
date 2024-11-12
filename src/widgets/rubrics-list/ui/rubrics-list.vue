<template>
  <div>
    <div>
      <input type="checkbox" v-model="model" id="changeAllowEmpty" />
      <label class="cursor-pointer" for="changeAllowEmpty">Отображать пустые рубрики</label>
    </div>
    <div v-if="!rubrics.length">Загрузка...</div>
    <ul v-else>
      <RubricsItem v-for="rubric in rubrics" :key="rubric.id" :rubric="rubric" />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { RubricsItem } from '@/entities/rubrics'
import type { IRubricItem } from '@/entities/rubrics'

interface Props {
  rubrics: IRubricItem[]
}
defineProps<Props>()

const model = defineModel<boolean>()
</script>
