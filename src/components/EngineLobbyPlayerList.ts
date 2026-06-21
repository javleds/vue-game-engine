import { defineComponent, h, type PropType } from 'vue'
import type { LobbyPlayer } from '../types/room'

export const EngineLobbyPlayerList = defineComponent({
  name: 'EngineLobbyPlayerList',
  props: {
    players: {
      type: Array as PropType<LobbyPlayer[]>,
      required: true,
    },
    hostLabel: {
      type: String,
      default: 'Anfitrion',
    },
    connectedLabel: {
      type: String,
      default: 'En sala',
    },
    disconnectedLabel: {
      type: String,
      default: 'Sin conexion',
    },
  },
  setup(props, { slots }) {
    return () => h('ul', { class: 'te-player-list' }, props.players.map((player) => {
      return h('li', {
        key: player.id,
        class: [
          'te-player-list__item',
          { 'te-player-list__item--disconnected': !player.connected },
        ],
      }, [
        h('span', { class: 'te-player-list__name' }, slots.player?.({ player }) ?? player.nickname),
        h('div', { class: 'te-player-list__badges' }, [
          player.is_host
            ? h('strong', { class: 'te-player-list__badge te-player-list__badge--host' }, props.hostLabel)
            : null,
          h('em', {
            class: [
              'te-player-list__status',
              { 'te-player-list__status--offline': !player.connected },
            ],
          }, player.connected ? props.connectedLabel : props.disconnectedLabel),
          slots.badges?.({ player }),
        ]),
      ])
    }))
  },
})
