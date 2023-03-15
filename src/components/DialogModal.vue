<script setup>
import { useBoardStore } from "../stores/board";
import { storeToRefs } from 'pinia'
import { ref, defineProps, toRefs, defineEmits } from "vue";
import { RouterView } from "vue-router";
import { boardVariant, boardIcon } from '@/utils';

const boardStore = useBoardStore();

const { board } = storeToRefs(boardStore);

const props = defineProps({
  modalTitle: String,
});

const emit = defineEmits(['handleClose'])

const { modalTitle } = toRefs(props);

const dialog = ref(false);

const handleCloseModal = () => {
  emit('handleClose')
};

</script>
<template>
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
        <v-btn  class="bg-blue-grey-lighten-5" @click="handleCloseModal">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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


