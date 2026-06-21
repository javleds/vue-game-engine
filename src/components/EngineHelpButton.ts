import { defineComponent, h } from 'vue'

export const EngineHelpButton = defineComponent({
  name: 'EngineHelpButton',
  props: {
    label: {
      type: String,
      default: 'Abrir ayuda',
    },
  },
  emits: {
    open: () => true,
  },
  setup(props, { emit, slots }) {
    return () => h('button', {
      type: 'button',
      class: 'te-help-fab',
      'aria-label': props.label,
      onClick: () => emit('open'),
    }, slots.default?.() ?? '?')
  },
})
