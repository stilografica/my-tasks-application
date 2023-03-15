<script setup>
import { useBoardStore } from "../stores/board";
import { storeToRefs } from 'pinia'
import { useRouter } from "vue-router";
import { ref } from "vue";
import { RouterView } from "vue-router";
import BoardColumn from '@/components/BoardColumn.vue';

const boardStore = useBoardStore();

const { board } = storeToRefs(boardStore);

const boardVariant = (variant) => {
  const variantsColors = {
    "To do": "secondary",
    "In progress": "warning",
    Completed: "success",
  };
  return variantsColors[variant];
};

const dialog = ref(false);
const modalTitle = ref('')

const handleOpenModal = (title) => {
  modalTitle.value = title;
  dialog.value = true;
};

</script>
<template>
  <v-container fluid>
    <div class="d-flex flex-wrap flex-lg-nowrap align-start mx--md16 px-16">        
      <!-- Boards -->
      <board-column
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        @openModal="handleOpenModal"
      />
    </div>
    <!-- Task Modal -->
    <v-dialog v-model="dialog" style="min-width: 300px; max-width: 500px">
      <v-card>
        <v-card-title :class="`bg-${boardVariant(modalTitle)}`">
          {{ modalTitle }}
        </v-card-title>
        <v-card-text>
          <RouterView class="my-5" />
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="white" class="bg-primary" @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

