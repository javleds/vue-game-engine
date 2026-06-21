<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { ChatMessageView } from '../types/chat'
import type { EngineChatTab } from '../types/components'
import EngineChatForm from './EngineChatForm.vue'
import EngineChatMessages from './EngineChatMessages.vue'

const props = withDefaults(defineProps<{
  open: boolean
  chatMessages: ChatMessageView[]
  activityMessages?: ChatMessageView[]
  draft: string
  activeTab?: EngineChatTab
  unread?: boolean
  title?: string
  chatLabel?: string
  activityLabel?: string
  openLabel?: string
  closeLabel?: string
  sendLabel?: string
}>(), {
  activityMessages: () => [],
  activeTab: 'chat',
  unread: false,
  title: 'Chat',
  chatLabel: 'Chat',
  activityLabel: 'Movimientos',
  openLabel: 'Chat',
  closeLabel: 'Cerrar chat',
  sendLabel: 'Enviar',
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'update:draft': [value: string]
  'update:activeTab': [value: EngineChatTab]
  send: []
}>()

const panelElement = ref<HTMLElement | null>(null)
const messagesComponent = ref<{ scrollToBottom: () => Promise<void> } | null>(null)
const visibleMessages = computed(() => {
  return props.activeTab === 'chat' ? props.chatMessages : props.activityMessages
})

async function focusPanel(): Promise<void> {
  await nextTick()
  panelElement.value?.focus()
  await messagesComponent.value?.scrollToBottom()
}

watch(
  () => [props.open, props.activeTab, visibleMessages.value],
  async () => {
    if (!props.open) {
      return
    }

    await focusPanel()
  },
  { flush: 'post' },
)

function close(): void {
  emit('update:open', false)
}

function openPanel(): void {
  emit('update:open', true)
}

function selectTab(tab: EngineChatTab): void {
  emit('update:activeTab', tab)
}

function handlePanelKeydown(event: KeyboardEvent): void {
  if (event.key !== 'Escape') {
    return
  }

  event.preventDefault()
  close()
}
</script>

<template>
  <button
    v-if="!open"
    type="button"
    class="te-chat-fab"
    :class="{ 'te-chat-fab--unread': unread }"
    :aria-label="openLabel"
    @click="openPanel"
  >
    {{ openLabel }}
  </button>

  <aside
    v-else
    ref="panelElement"
    class="te-chat-panel"
    role="dialog"
    :aria-label="title"
    tabindex="-1"
    @keydown="handlePanelKeydown"
  >
    <header class="te-chat-panel__header">
      <h2>{{ title }}</h2>
      <button type="button" class="te-chat-panel__close" :aria-label="closeLabel" @click="close">
        <slot name="close">x</slot>
      </button>
    </header>

    <div class="te-chat-panel__tabs" role="tablist" :aria-label="title">
      <button
        type="button"
        role="tab"
        :aria-selected="activeTab === 'chat'"
        :class="{ 'te-chat-panel__tab--active': activeTab === 'chat' }"
        @click="selectTab('chat')"
      >
        {{ chatLabel }}
      </button>
      <button
        type="button"
        role="tab"
        :aria-selected="activeTab === 'activity'"
        :class="{ 'te-chat-panel__tab--active': activeTab === 'activity' }"
        @click="selectTab('activity')"
      >
        {{ activityLabel }}
      </button>
    </div>

    <EngineChatMessages
      ref="messagesComponent"
      :messages="visibleMessages"
      :auto-scroll-key="activeTab"
    >
      <template #message="{ message }">
        <slot name="message" :message="message">
          <p class="te-chat-message__body">{{ message.message }}</p>
        </slot>
      </template>
    </EngineChatMessages>

    <EngineChatForm
      v-if="activeTab === 'chat'"
      :draft="draft"
      :submit-label="sendLabel"
      @update:draft="emit('update:draft', $event)"
      @submit="emit('send')"
    />
  </aside>
</template>
