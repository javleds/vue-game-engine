<script setup lang="ts">
const props = withDefaults(defineProps<{
  inspectable?: boolean
  disabled?: boolean
}>(), {
  inspectable: false,
  disabled: false,
})

const emit = defineEmits<{
  inspect: []
}>()

function inspect(): void {
  if (!props.inspectable || props.disabled) {
    return
  }

  emit('inspect')
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return
  }

  event.preventDefault()
  inspect()
}
</script>

<template>
  <article
    class="te-card-shell"
    :role="inspectable ? 'button' : undefined"
    :tabindex="inspectable && !disabled ? 0 : undefined"
    @click="inspect"
    @keydown="handleKeydown"
  >
    <slot />
  </article>
</template>
