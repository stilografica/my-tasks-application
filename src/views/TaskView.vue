<script setup>
import { useBoardStore } from '../stores/board'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'

const taskData = useBoardStore()
const route = useRoute()
const task = computed(() => taskData.getTask(route.params.id))
</script>
<template>
<!-- Breadcrumb -->
  <v-container>
    <div class="flex flex-col flex-grow items-start justify-between mt-4 px-10">
      <h3>{{ task.name }}</h3>
    </div>
  </v-container>
</template>
