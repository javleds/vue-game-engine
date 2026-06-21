import { computed, defineComponent, h, type PropType } from 'vue'

export interface EngineTurnPlayer {
  playerId: string
  nickname: string
  connected: boolean
}

export const EngineTurnOrder = defineComponent({
  name: 'EngineTurnOrder',
  props: {
    players: {
      type: Array as PropType<EngineTurnPlayer[]>,
      required: true,
    },
    currentPlayerId: {
      type: String as PropType<string | null>,
      default: null,
    },
    roundEndPlayerId: {
      type: String as PropType<string | null>,
      default: null,
    },
    finalRoundTriggered: {
      type: Boolean,
      default: false,
    },
    currentLabel: {
      type: String,
      default: 'Turno actual',
    },
    roundEndLabel: {
      type: String,
      default: 'Fin de ronda',
    },
    finalRoundEndLabel: {
      type: String,
      default: 'Fin de partida',
    },
    ariaLabel: {
      type: String,
      default: 'Orden de turnos desde el jugador actual',
    },
  },
  setup(props, { slots }) {
    const orderedPlayers = computed(() => {
      if (props.players.length === 0 || props.currentPlayerId === null) {
        return props.players
      }

      const currentIndex = props.players.findIndex((player) => player.playerId === props.currentPlayerId)

      if (currentIndex < 0) {
        return props.players
      }

      return [
        ...props.players.slice(currentIndex),
        ...props.players.slice(0, currentIndex),
      ]
    })

    const computedRoundEndPlayerId = computed(() => {
      if (props.roundEndPlayerId !== null) {
        return props.roundEndPlayerId
      }

      const lastPlayer = orderedPlayers.value[orderedPlayers.value.length - 1]

      return lastPlayer?.playerId ?? null
    })

    return () => h('ol', { class: 'te-turn-order', 'aria-label': props.ariaLabel }, orderedPlayers.value.map((player) => {
      const isCurrent = player.playerId === props.currentPlayerId
      const isRoundEnd = player.playerId === computedRoundEndPlayerId.value

      return h('li', {
        key: player.playerId,
        class: [
          'te-turn-order__player',
          {
            'te-turn-order__player--current': isCurrent,
            'te-turn-order__player--disconnected': !player.connected,
          },
        ],
      }, [
        h('span', {
          class: [
            'te-turn-order__presence',
            { 'te-turn-order__presence--online': player.connected },
          ],
          'aria-label': player.connected ? 'Jugador conectado' : 'Jugador desconectado',
        }),
        h('span', { class: 'te-turn-order__name' }, slots.player?.({ player }) ?? player.nickname),
        h('div', { class: 'te-turn-order__tags' }, [
          isCurrent
            ? h('em', { class: 'te-turn-order__tag te-turn-order__tag--current' }, props.currentLabel)
            : null,
          isRoundEnd
            ? h(
              'em',
              { class: 'te-turn-order__tag te-turn-order__tag--round-end' },
              props.finalRoundTriggered ? props.finalRoundEndLabel : props.roundEndLabel,
            )
            : null,
          slots.tags?.({ player, isCurrent, isRoundEnd }),
        ]),
      ])
    }))
  },
})
