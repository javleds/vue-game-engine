<script setup lang="ts">
import type { LobbyPlayer } from '../types/room'

withDefaults(defineProps<{
  players: LobbyPlayer[]
  hostLabel?: string
  connectedLabel?: string
  disconnectedLabel?: string
}>(), {
  hostLabel: 'Anfitrion',
  connectedLabel: 'En sala',
  disconnectedLabel: 'Sin conexion',
})
</script>

<template>
  <ul class="te-player-list">
    <li
      v-for="player in players"
      :key="player.id"
      class="te-player-list__item"
      :class="{ 'te-player-list__item--disconnected': !player.connected }"
    >
      <span class="te-player-list__name">
        <slot name="player" :player="player">{{ player.nickname }}</slot>
      </span>
      <div class="te-player-list__badges">
        <strong v-if="player.is_host" class="te-player-list__badge te-player-list__badge--host">
          {{ hostLabel }}
        </strong>
        <em
          class="te-player-list__status"
          :class="{ 'te-player-list__status--offline': !player.connected }"
        >
          {{ player.connected ? connectedLabel : disconnectedLabel }}
        </em>
        <slot name="badges" :player="player" />
      </div>
    </li>
  </ul>
</template>
