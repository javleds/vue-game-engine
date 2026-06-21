<script setup lang="ts">
withDefaults(defineProps<{
  roomId: string
  title?: string
  eyebrow?: string
  copyResumeLabel?: string
  canCopyResume?: boolean
}>(), {
  title: '',
  eyebrow: '',
  copyResumeLabel: 'Copiar link para resumir partida',
  canCopyResume: false,
})

const emit = defineEmits<{
  copyResume: []
}>()
</script>

<template>
  <div class="te-room-summary">
    <div class="te-room-summary__text">
      <p class="te-room-summary__eyebrow">{{ eyebrow || `Sala ${roomId}` }}</p>
      <h1 class="te-room-summary__title">{{ title || `Sala ${roomId}` }}</h1>
    </div>
    <button
      v-if="canCopyResume"
      type="button"
      class="te-icon-button te-room-summary__resume-button"
      :aria-label="copyResumeLabel"
      :title="copyResumeLabel"
      @click="emit('copyResume')"
    >
      <slot name="resumeIcon">⧉</slot>
    </button>
    <slot name="actions" />
  </div>
</template>
