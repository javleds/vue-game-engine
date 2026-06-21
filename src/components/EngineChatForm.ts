import { defineComponent, h } from 'vue'

export const EngineChatForm = defineComponent({
  name: 'EngineChatForm',
  props: {
    draft: {
      type: String,
      required: true,
    },
    maxLength: {
      type: Number,
      default: 1000,
    },
    submitLabel: {
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
    submit: () => true,
  },
  setup(props, { emit }) {
    function submit(): void {
      if (props.disabled || props.draft.trim() === '') {
        return
      }

      emit('submit')
    }

    return () => h('form', {
      class: 'te-chat-form',
      onSubmit: (event: Event) => {
        event.preventDefault()
        submit()
      },
    }, [
      h('input', {
        class: 'te-chat-form__input',
        value: props.draft,
        maxlength: props.maxLength,
        autocomplete: 'off',
        onInput: (event: Event) => {
          emit('update:draft', (event.target as HTMLInputElement).value)
        },
      }),
      h('button', {
        type: 'submit',
        disabled: props.disabled || props.draft.trim() === '',
      }, props.submitLabel),
    ])
  },
})
