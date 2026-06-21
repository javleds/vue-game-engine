<script setup lang="ts">
export interface EngineTabOption {
  id: string
  label: string
  disabled?: boolean
}

defineProps<{
  tabs: EngineTabOption[]
  modelValue: string
  tablistLabel: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function selectTab(tab: EngineTabOption): void {
  if (tab.disabled) {
    return
  }

  emit('update:modelValue', tab.id)
}
</script>

<template>
  <div class="te-tabs" role="tablist" :aria-label="tablistLabel">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      class="te-tabs__button"
      :class="{ 'te-tabs__button--active': tab.id === modelValue }"
      role="tab"
      :aria-selected="tab.id === modelValue"
      :disabled="tab.disabled"
      @click="selectTab(tab)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
