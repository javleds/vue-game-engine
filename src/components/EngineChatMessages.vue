<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import type { ChatMessageView } from '../types/chat'
import { chatMessageFullTimestamp, chatMessageTime } from '../utils/chatTime'

const props = withDefaults(defineProps<{
  messages: ChatMessageView[]
  autoScrollKey?: string | number | boolean
}>(), {
  autoScrollKey: '',
})

const messagesElement = ref<HTMLElement | null>(null)

async function scrollToBottom(): Promise<void> {
  await nextTick()

  const element = messagesElement.value

  if (!element) {
    return
  }

  element.scrollTop = element.scrollHeight
}

watch(
  () => [props.messages, props.autoScrollKey],
  scrollToBottom,
  { deep: false, flush: 'post' },
)

defineExpose({ scrollToBottom })
</script>

<template>
  <div ref="messagesElement" class="te-chat-messages">
    <article v-for="message in messages" :key="message.id" class="te-chat-message">
      <div class="te-chat-message__heading">
        <strong>{{ message.nickname }}</strong>
        <time
          class="te-chat-message__time"
          :datetime="message.createdAt"
          :title="chatMessageFullTimestamp(message.createdAt)"
        >
          {{ chatMessageTime(message.createdAt) }}
        </time>
      </div>

      <slot name="message" :message="message">
        <p class="te-chat-message__body">{{ message.message }}</p>
      </slot>
    </article>
  </div>
</template>
