<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  open: boolean
  title: string
  positionText?: string
  ariaLabel?: string
  closeLabel?: string
  actionLabel?: string
  actionTitle?: string
  actionDisabled?: boolean
  showAction?: boolean
}>(), {
  positionText: '',
  ariaLabel: 'Galeria',
  closeLabel: 'Salir de galeria',
  actionLabel: '',
  actionTitle: '',
  actionDisabled: false,
  showAction: false,
})

const emit = defineEmits<{
  close: []
  previousItem: []
  nextItem: []
  previousStack: []
  nextStack: []
  activate: []
}>()

const dialogElement = ref<HTMLElement | null>(null)
const pointerStart = ref<{ x: number, y: number } | null>(null)

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

function activate(): void {
  if (props.actionDisabled) {
    return
  }

  emit('activate')
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    event.preventDefault()
    emit('close')
    return
  }

  if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
    event.preventDefault()
    emit('previousItem')
    return
  }

  if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
    event.preventDefault()
    emit('nextItem')
    return
  }

  if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') {
    event.preventDefault()
    emit('previousStack')
    return
  }

  if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's') {
    event.preventDefault()
    emit('nextStack')
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    activate()
  }
}

function startPointer(event: PointerEvent): void {
  pointerStart.value = {
    x: event.clientX,
    y: event.clientY,
  }
}

function finishPointer(event: PointerEvent): void {
  const start = pointerStart.value
  pointerStart.value = null

  if (!start) {
    return
  }

  const deltaX = event.clientX - start.x
  const deltaY = event.clientY - start.y
  const threshold = 42

  if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < threshold) {
    return
  }

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX < 0) {
      emit('nextItem')
      return
    }

    emit('previousItem')
    return
  }

  if (deltaY > 0) {
    emit('previousStack')
    return
  }

  emit('nextStack')
}

function cancelPointer(): void {
  pointerStart.value = null
}
</script>

<template>
  <div v-if="open" class="te-gallery-backdrop" @click.self="emit('close')">
    <section
      ref="dialogElement"
      class="te-gallery-dialog"
      role="dialog"
      aria-modal="true"
      :aria-label="ariaLabel"
      tabindex="-1"
      @keydown="handleKeydown"
      @pointerdown="startPointer"
      @pointerup="finishPointer"
      @pointercancel="cancelPointer"
    >
      <header class="te-gallery-header">
        <div>
          <h2>{{ title }}</h2>
          <p>{{ positionText }}</p>
        </div>
        <button type="button" class="te-gallery-close" :aria-label="closeLabel" @click="emit('close')">
          <slot name="close">x</slot>
        </button>
      </header>

      <slot />

      <slot name="footer" />

      <button
        v-if="showAction"
        type="button"
        class="te-gallery-action"
        :disabled="actionDisabled"
        :title="actionTitle"
        @click="activate"
      >
        {{ actionLabel }}
      </button>
    </section>
  </div>
</template>
