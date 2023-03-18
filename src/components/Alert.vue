<script setup>
import { defineProps,toRefs } from "vue";

const props = defineProps({
  text: String
})
const { text } = toRefs(props);
</script>
<template>
  <v-alert
  color="teal-accent-3"
  icon="$success"
  class="alert-container pr-5"
  :text="text"
  />
</template>
<style scoped>
.alert-container {
  top: -120px;
  right: 20px;
}
</style>


