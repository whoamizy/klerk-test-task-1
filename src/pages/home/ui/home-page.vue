<template>
  <ul>
    <li v-for="{ id, title, url, children } in rubrics" :key="id">
      <a :href="getLink(url)" target="_blank">
        {{ title }}
      </a>
      <ul class="ml-4">
        <li v-for="{ id: childId, title: childTitle, url: childUrl } in children" :key="childId">
          <a :href="getLink(childUrl)" target="_blank">
            {{ childTitle }}
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_URL = import.meta.env.VITE_API_URL

const getLink = (path: string) => {
  return BASE_URL + path
}

const rubrics = ref([])

onMounted(async () => {
  await fetch(API_URL)
    .then(async (res) => (rubrics.value = await res.json()))
    .catch((err) => console.error(err))
})
</script>
