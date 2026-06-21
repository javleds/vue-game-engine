<script setup lang="ts">
export interface EnginePlayerStat {
  id: string
  label: string
}

withDefaults(defineProps<{
  title: string
  subtitle?: string
  stats?: EnginePlayerStat[]
  isCurrentTurn?: boolean
  currentTurnLabel?: string
}>(), {
  subtitle: '',
  stats: () => [],
  isCurrentTurn: false,
  currentTurnLabel: 'Turno',
})
</script>

<template>
  <article class="te-player-status-panel">
    <header class="te-player-status-panel__heading">
      <div>
        <h2>{{ title }}</h2>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>
      <strong v-if="isCurrentTurn">{{ currentTurnLabel }}</strong>
      <slot name="heading-actions" />
    </header>

    <div v-if="stats.length > 0" class="te-player-status-panel__stats">
      <span v-for="stat in stats" :key="stat.id">{{ stat.label }}</span>
    </div>

    <slot />
  </article>
</template>
