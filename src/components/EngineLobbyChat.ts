import { defineComponent, h, type PropType } from 'vue'
import type { ChatMessageView } from '../types/chat'
import { EngineChatForm } from './EngineChatForm'
import { EngineChatMessages } from './EngineChatMessages'

export const EngineLobbyChat = defineComponent({
  name: 'EngineLobbyChat',
  props: {
    messages: {
      type: Array as PropType<ChatMessageView[]>,
      required: true,
    },
    draft: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: 'Chat',
    },
    sendLabel: {
      type: String,
      default: 'Enviar',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:draft': (_value: string) => true,
    send: () => true,
  },
  setup(props, { emit, slots }) {
    return () => h('section', { class: 'te-lobby-chat', 'aria-label': props.title }, [
      h('header', { class: 'te-lobby-chat__header' }, [
        h('h2', {}, props.title),
        slots.actions?.(),
      ]),
      h(EngineChatMessages, { messages: props.messages }, slots),
      h(EngineChatForm, {
        draft: props.draft,
        submitLabel: props.sendLabel,
        disabled: props.disabled,
        'onUpdate:draft': (value: string) => emit('update:draft', value),
        onSubmit: () => emit('send'),
      }),
    ])
  },
})
