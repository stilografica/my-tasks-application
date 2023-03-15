<script setup>
import { useBoardStore } from '../stores/board'
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const taskData = useBoardStore()
const route = useRoute()
const task = computed(() => taskData.getTask(route.params.id))

const editTask = ($event) => {
  taskData.editTask(route.params.id, $event.target.value)
};

</script>
<template>
  <v-container>
    <div class="flex flex-col flex-grow items-start justify-between mt-4 px-3">
      <input v-model="task.name" class="mx-2 text-field px-3" placeholder="+ Enter new task"
        @change="editTask($event)"
        />
    </div>
  </v-container>
</template>
<style scoped>
.text-field {
  font-size: 20px;
}
</style>
