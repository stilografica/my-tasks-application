<script setup>
import { useBoardStore } from '../stores/board';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const taskData = useBoardStore();

const route = useRoute();

const task = computed(() => taskData.getTask(route.params.id));

const hasError = ref(false);

const editTask = ($event) => {
  hasError.value = false;
  taskData.editTask(route.params.id, $event.target.value);
  if (task.value.name.length === 0) hasError.value = true;
};
</script>
<template>
  <v-container>
    <div class="flex flex-col flex-grow items-start justify-between mt-4 px-3">
      <input
        v-model="task.name"
        class="mx-2 text-field px-3"
        placeholder="+ Enter new task"
        @change="editTask($event)"
        @input="task.name.length === 0 ? hasError = true : ''"
      />
      <p v-if="hasError" class="error-message ml-6">
        <small>Rellena el campo</small>
      </p>
    </div>
  </v-container>
</template>
<style scoped>
.text-field {
  font-size: 20px;
}
.alert-container {
  top: -120px;
  right: 20px
}
.error-message {
  color: #E53935;
}
</style>
