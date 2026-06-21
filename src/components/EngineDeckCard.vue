<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <div class="te-deck-card">
    <slot>{{ label }}</slot>
  </div>
</template>
