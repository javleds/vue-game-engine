import { defineComponent, h, nextTick, ref, watch, type PropType } from 'vue'
import type { ChatMessageView } from '../types/chat'
import { chatMessageFullTimestamp, chatMessageTime } from '../utils/chatTime'

export const EngineChatMessages = defineComponent({
  name: 'EngineChatMessages',
  props: {
    messages: {
      type: Array as PropType<ChatMessageView[]>,
      required: true,
    },
    autoScrollKey: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>,
      default: '',
    },
  },
  setup(props, { slots, expose }) {
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

    expose({ scrollToBottom })

    return () => h('div', { ref: messagesElement, class: 'te-chat-messages' }, props.messages.map((message) => {
      const body = slots.message
        ? slots.message({ message })
        : h('p', { class: 'te-chat-message__body' }, message.message)

      return h('article', { key: message.id, class: 'te-chat-message' }, [
        h('div', { class: 'te-chat-message__heading' }, [
          h('strong', {}, message.nickname),
          h('time', {
            class: 'te-chat-message__time',
            datetime: message.createdAt,
            title: chatMessageFullTimestamp(message.createdAt),
          }, chatMessageTime(message.createdAt)),
        ]),
        body,
      ])
    }))
  },
})
