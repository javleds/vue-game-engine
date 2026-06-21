<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'Abrir ayuda',
})

const emit = defineEmits<{
  open: []
}>()
</script>

<template>
  <button type="button" class="te-help-fab" :aria-label="label" @click="emit('open')">
    <slot>?</slot>
  </button>
</template>
