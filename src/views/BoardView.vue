<script setup>
import { useBoardStore } from "../stores/board";
import { storeToRefs } from 'pinia'
import { ref } from "vue";
import BoardColumn from '@/components/BoardColumn.vue';
import DialogModal from '@/components/DialogModal.vue';

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
    <dialog-modal
      v-model="dialog"
      :modal-title="modalTitle"
      @handleClose="dialog = false"
    />
  </v-container>
</template>
<style scoped>
.boards-container {
background-color: #f8f9fd;
border-radius: 1.2rem;
}
</style>


