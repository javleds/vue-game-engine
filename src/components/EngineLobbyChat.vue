<script setup lang="ts">
import type { ChatMessageView } from '../types/chat'
import EngineChatForm from './EngineChatForm.vue'
import EngineChatMessages from './EngineChatMessages.vue'

withDefaults(defineProps<{
  messages: ChatMessageView[]
  draft: string
  title?: string
  sendLabel?: string
  disabled?: boolean
}>(), {
  title: 'Chat',
  sendLabel: 'Enviar',
  disabled: false,
})

const emit = defineEmits<{
  'update:draft': [value: string]
  send: []
}>()
</script>

<template>
  <section class="te-lobby-chat" :aria-label="title">
    <header class="te-lobby-chat__header">
      <h2>{{ title }}</h2>
      <slot name="actions" />
    </header>

    <EngineChatMessages :messages="messages">
      <template #message="{ message }">
        <slot name="message" :message="message">
          <p class="te-chat-message__body">{{ message.message }}</p>
        </slot>
      </template>
    </EngineChatMessages>

    <EngineChatForm
      :draft="draft"
      :submit-label="sendLabel"
      :disabled="disabled"
      @update:draft="emit('update:draft', $event)"
      @submit="emit('send')"
    />
  </section>
</template>
