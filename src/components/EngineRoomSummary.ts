import { defineComponent, h } from 'vue'

export const EngineRoomSummary = defineComponent({
  name: 'EngineRoomSummary',
  props: {
    roomId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    eyebrow: {
      type: String,
      default: '',
    },
    copyResumeLabel: {
      type: String,
      default: 'Copiar link para resumir partida',
    },
    canCopyResume: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    copyResume: () => true,
  },
  setup(props, { emit, slots }) {
    return () => h('div', { class: 'te-room-summary' }, [
      h('div', { class: 'te-room-summary__text' }, [
        h('p', { class: 'te-room-summary__eyebrow' }, props.eyebrow || `Sala ${props.roomId}`),
        h('h1', { class: 'te-room-summary__title' }, props.title || `Sala ${props.roomId}`),
      ]),
      props.canCopyResume
        ? h('button', {
          type: 'button',
          class: 'te-icon-button te-room-summary__resume-button',
          'aria-label': props.copyResumeLabel,
          title: props.copyResumeLabel,
          onClick: () => emit('copyResume'),
        }, slots.resumeIcon?.() ?? '⧉')
        : null,
      slots.actions?.(),
    ])
  },
})
