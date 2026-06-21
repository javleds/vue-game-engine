import { defineComponent, h, nextTick, ref, watch } from 'vue'

export const EngineHelpModal = defineComponent({
  name: 'EngineHelpModal',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Ayuda',
    },
    closeLabel: {
      type: String,
      default: 'Cerrar ayuda',
    },
  },
  emits: {
    'update:open': (_value: boolean) => true,
    close: () => true,
  },
  setup(props, { emit, slots }) {
    const dialogElement = ref<HTMLElement | null>(null)

    watch(
      () => props.open,
      async (open) => {
        if (!open) {
          return
        }

        await nextTick()
        dialogElement.value?.focus()
      },
      { flush: 'post' },
    )

    function close(): void {
      emit('update:open', false)
      emit('close')
    }

    return () => {
      if (!props.open) {
        return null
      }

      return h('section', { class: 'te-help-modal__backdrop', role: 'presentation' }, [
        h('section', {
          ref: dialogElement,
          class: 'te-help-modal__dialog',
          role: 'dialog',
          'aria-modal': 'true',
          'aria-label': props.title,
          tabindex: -1,
          onKeydown: (event: KeyboardEvent) => {
            if (event.key !== 'Escape') {
              return
            }

            event.preventDefault()
            close()
          },
        }, [
          h('header', { class: 'te-help-modal__header' }, [
            h('h2', {}, props.title),
            h('button', {
              type: 'button',
              class: 'te-help-modal__close',
              'aria-label': props.closeLabel,
              onClick: close,
            }, slots.close?.() ?? 'x'),
          ]),
          h('div', { class: 'te-help-modal__content' }, slots.default?.()),
        ]),
      ])
    }
  },
})
