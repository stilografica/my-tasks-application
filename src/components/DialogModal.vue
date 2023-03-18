<script setup>
import { ref, defineProps, toRefs, defineEmits } from "vue";
import { boardVariant } from '@/utils';

const props = defineProps({
  modalTitle: String,
});

const { modalTitle } = toRefs(props);

const emit = defineEmits(['handleClose']);

const dialog = ref(false);

const handleCloseModal = () => {
  emit('handleClose');
};
</script>
<template>
  <v-dialog v-model="dialog" class="modal">
    <v-card>
      <v-card-title :class="`bg-${boardVariant(modalTitle)}`">
        <slot name="header" />
      </v-card-title>
      <v-card-text>
        <slot name="view" />
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <slot name="footer">
          <v-btn  class="bg-blue-grey-lighten-5 mb-4 mr-3" @click="handleCloseModal">
            Close
          </v-btn>
        </slot>
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


