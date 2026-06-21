<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  open: boolean
  title?: string
  closeLabel?: string
}>(), {
  title: 'Ayuda',
  closeLabel: 'Cerrar ayuda',
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  close: []
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

function close(): void {
  emit('update:open', false)
  emit('close')
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key !== 'Escape') {
    return
  }

  event.preventDefault()
  close()
}
</script>

<template>
  <section v-if="open" class="te-help-modal__backdrop" role="presentation">
    <section
      ref="dialogElement"
      class="te-help-modal__dialog"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
      tabindex="-1"
      @keydown="handleKeydown"
    >
      <header class="te-help-modal__header">
        <h2>{{ title }}</h2>
        <button type="button" class="te-help-modal__close" :aria-label="closeLabel" @click="close">
          <slot name="close">x</slot>
        </button>
      </header>
      <div class="te-help-modal__content">
        <slot />
      </div>
    </section>
  </section>
</template>
