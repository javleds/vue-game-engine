import { computed, defineComponent, h, nextTick, ref, watch, type PropType } from 'vue'
import type { ChatMessageView } from '../types/chat'
import { EngineChatForm } from './EngineChatForm'
import { EngineChatMessages } from './EngineChatMessages'

export type EngineChatTab = 'chat' | 'activity'

export const EngineFloatingChat = defineComponent({
  name: 'EngineFloatingChat',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    chatMessages: {
      type: Array as PropType<ChatMessageView[]>,
      required: true,
    },
    activityMessages: {
      type: Array as PropType<ChatMessageView[]>,
      default: () => [],
    },
    draft: {
      type: String,
      required: true,
    },
    activeTab: {
      type: String as PropType<EngineChatTab>,
      default: 'chat',
    },
    unread: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Chat',
    },
    chatLabel: {
      type: String,
      default: 'Chat',
    },
    activityLabel: {
      type: String,
      default: 'Movimientos',
    },
    openLabel: {
      type: String,
      default: 'Chat',
    },
    closeLabel: {
      type: String,
      default: 'Cerrar chat',
    },
    sendLabel: {
      type: String,
      default: 'Enviar',
    },
  },
  emits: {
    'update:open': (_value: boolean) => true,
    'update:draft': (_value: string) => true,
    'update:activeTab': (_value: EngineChatTab) => true,
    send: () => true,
  },
  setup(props, { emit, slots }) {
    const panelElement = ref<HTMLElement | null>(null)
    const messagesComponent = ref<{ scrollToBottom: () => Promise<void> } | null>(null)
    const visibleMessages = computed(() => props.activeTab === 'chat' ? props.chatMessages : props.activityMessages)

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

    function selectTab(tab: EngineChatTab): void {
      emit('update:activeTab', tab)
    }

    return () => {
      if (!props.open) {
        return h('button', {
          type: 'button',
          class: ['te-chat-fab', { 'te-chat-fab--unread': props.unread }],
          'aria-label': props.openLabel,
          onClick: () => emit('update:open', true),
        }, props.openLabel)
      }

      return h('aside', {
        ref: panelElement,
        class: 'te-chat-panel',
        role: 'dialog',
        'aria-label': props.title,
        tabindex: -1,
        onKeydown: (event: KeyboardEvent) => {
          if (event.key !== 'Escape') {
            return
          }

          event.preventDefault()
          emit('update:open', false)
        },
      }, [
        h('header', { class: 'te-chat-panel__header' }, [
          h('h2', {}, props.title),
          h('button', {
            type: 'button',
            class: 'te-chat-panel__close',
            'aria-label': props.closeLabel,
            onClick: () => emit('update:open', false),
          }, slots.close?.() ?? 'x'),
        ]),
        h('div', { class: 'te-chat-panel__tabs', role: 'tablist', 'aria-label': props.title }, [
          h('button', {
            type: 'button',
            role: 'tab',
            'aria-selected': props.activeTab === 'chat',
            class: { 'te-chat-panel__tab--active': props.activeTab === 'chat' },
            onClick: () => selectTab('chat'),
          }, props.chatLabel),
          h('button', {
            type: 'button',
            role: 'tab',
            'aria-selected': props.activeTab === 'activity',
            class: { 'te-chat-panel__tab--active': props.activeTab === 'activity' },
            onClick: () => selectTab('activity'),
          }, props.activityLabel),
        ]),
        h(EngineChatMessages, {
          ref: messagesComponent,
          messages: visibleMessages.value,
          autoScrollKey: props.activeTab,
        }, slots),
        props.activeTab === 'chat'
          ? h(EngineChatForm, {
            draft: props.draft,
            submitLabel: props.sendLabel,
            'onUpdate:draft': (value: string) => emit('update:draft', value),
            onSubmit: () => emit('send'),
          })
          : null,
      ])
    }
  },
})
