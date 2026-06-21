<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  open: boolean
  title: string
  body?: string
  ariaLabel?: string
  cancelLabel?: string
  confirmLabel?: string
  confirmDisabled?: boolean
  cancelDisabled?: boolean
  closeLabel?: string
  showClose?: boolean
  showDefaultActions?: boolean
}>(), {
  body: '',
  ariaLabel: '',
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
  confirmDisabled: false,
  cancelDisabled: false,
  closeLabel: 'Cerrar',
  showClose: false,
  showDefaultActions: true,
})

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()

const dialogElement = ref<HTMLElement | null>(null)

watch(
  () => props.open,
  async (open) => {
    if (!open) {
      return
    }

    await nextTick()
    dialogElement.value?.focus()
  },
  { flush: 'post' },
)

function cancel(): void {
  if (props.cancelDisabled) {
    return
  }

  emit('cancel')
}

function confirm(): void {
  if (props.confirmDisabled) {
    return
  }

  emit('confirm')
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    event.preventDefault()
    cancel()
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    confirm()
  }
}
</script>

<template>
  <div v-if="open" class="te-action-dialog-backdrop">
    <section
      ref="dialogElement"
      class="te-action-dialog"
      role="dialog"
      aria-modal="true"
      :aria-label="ariaLabel || title"
      tabindex="-1"
      @keydown="handleKeydown"
    >
      <header class="te-action-dialog__header">
        <div>
          <h2>{{ title }}</h2>
          <p v-if="body">{{ body }}</p>
        </div>
        <button
          v-if="showClose"
          type="button"
          class="te-action-dialog__close"
          :aria-label="closeLabel"
          :disabled="cancelDisabled"
          @click="cancel"
        >
          <slot name="close">x</slot>
        </button>
      </header>

      <slot />

      <slot name="actions">
        <div v-if="showDefaultActions" class="te-action-dialog__actions">
          <button type="button" class="te-action-dialog__cancel" :disabled="cancelDisabled" @click="cancel">
            {{ cancelLabel }}
          </button>
          <button type="button" class="te-action-dialog__confirm" :disabled="confirmDisabled" @click="confirm">
            {{ confirmLabel }}
          </button>
        </div>
      </slot>
    </section>
  </div>
</template>
