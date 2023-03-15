<script setup>
import { useBoardStore } from "../stores/board";
import { storeToRefs } from 'pinia'
import { ref } from "vue";
import { RouterView } from "vue-router";
import BoardColumn from '@/components/BoardColumn.vue';
import { boardVariant, boardIcon } from '@/utils';

const boardStore = useBoardStore();

const { board } = storeToRefs(boardStore);

const dialog = ref(false);
const modalTitle = ref('')

const handleOpenModal = (title) => {
  modalTitle.value = title;
  dialog.value = true;
};

</script>
<template>
  <v-container>
    <h1 class="mb-10 font-weight-thin">My tasks</h1>
    <div class="d-flex flex-wrap flex-lg-nowrap align-start mx--md16 px-16 py-10 boards-container">        
      <!-- Boards -->
      <board-column
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        @openModal="handleOpenModal"
      />
    </div>
    <!-- Task Modal -->
    <v-dialog v-model="dialog" class="modal">
      <v-card>
        <v-card-title :class="`bg-${boardVariant(modalTitle)}`">
          <v-icon :icon="boardIcon(modalTitle)"  size="small" class="icon mr-1"/>
          {{ modalTitle }}
        </v-card-title>
        <v-card-text>
          <RouterView class="my-5" />
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn  class="bg-blue-grey-lighten-5" @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<style scoped>
.boards-container {
background-color: #f8f9fd;
border-radius: 1.2rem;
}
.modal {
  border-radius: 1.2rem;
  min-width: 300px;
  max-width: 500px
}
</style>


