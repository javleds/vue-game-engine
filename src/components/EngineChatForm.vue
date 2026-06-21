<script setup lang="ts">
const props = withDefaults(defineProps<{
  draft: string
  maxLength?: number
  submitLabel?: string
  disabled?: boolean
}>(), {
  maxLength: 1000,
  submitLabel: 'Enviar',
  disabled: false,
})

const emit = defineEmits<{
  'update:draft': [value: string]
  submit: []
}>()

function submit(): void {
  if (props.disabled || props.draft.trim() === '') {
    return
  }

  emit('submit')
}
</script>

<template>
  <form class="te-chat-form" @submit.prevent="submit">
    <input
      class="te-chat-form__input"
      :value="draft"
      :maxlength="maxLength"
      autocomplete="off"
      @input="emit('update:draft', ($event.target as HTMLInputElement).value)"
    >
    <button type="submit" :disabled="disabled || draft.trim() === ''">
      {{ submitLabel }}
    </button>
  </form>
</template>
