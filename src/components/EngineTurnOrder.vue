<script setup lang="ts">
import { computed } from 'vue'
import type { EngineTurnPlayer } from '../types/components'

const props = withDefaults(defineProps<{
  players: EngineTurnPlayer[]
  currentPlayerId?: string | null
  roundEndPlayerId?: string | null
  finalRoundTriggered?: boolean
  currentLabel?: string
  roundEndLabel?: string
  finalRoundEndLabel?: string
  ariaLabel?: string
}>(), {
  currentPlayerId: null,
  roundEndPlayerId: null,
  finalRoundTriggered: false,
  currentLabel: 'Turno actual',
  roundEndLabel: 'Fin de ronda',
  finalRoundEndLabel: 'Fin de partida',
  ariaLabel: 'Orden de turnos desde el jugador actual',
})

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
</script>

<template>
  <ol class="te-turn-order" :aria-label="ariaLabel">
    <li
      v-for="player in orderedPlayers"
      :key="player.playerId"
      class="te-turn-order__player"
      :class="{
        'te-turn-order__player--current': player.playerId === currentPlayerId,
        'te-turn-order__player--disconnected': !player.connected,
      }"
    >
      <span
        class="te-turn-order__presence"
        :class="{ 'te-turn-order__presence--online': player.connected }"
        :aria-label="player.connected ? 'Jugador conectado' : 'Jugador desconectado'"
      />
      <span class="te-turn-order__name">
        <slot name="player" :player="player">{{ player.nickname }}</slot>
      </span>
      <div class="te-turn-order__tags">
        <em
          v-if="player.playerId === currentPlayerId"
          class="te-turn-order__tag te-turn-order__tag--current"
        >
          {{ currentLabel }}
        </em>
        <em
          v-if="player.playerId === computedRoundEndPlayerId"
          class="te-turn-order__tag te-turn-order__tag--round-end"
        >
          {{ finalRoundTriggered ? finalRoundEndLabel : roundEndLabel }}
        </em>
        <slot
          name="tags"
          :player="player"
          :is-current="player.playerId === currentPlayerId"
          :is-round-end="player.playerId === computedRoundEndPlayerId"
        />
      </div>
    </li>
  </ol>
</template>
