<template>
  <UFieldGroup
    class="d-radio-group"
    role="radiogroup"
    :aria-disabled="disabled"
    :size="size"
    :orientation="orientation"
  >
    <UButton
      v-for="(opt, idx) in options"
      :key="idx"
      class="d-radio-button"
      :disabled="disabled || opt.disabled"
      variant="subtle"
      :color="isSelected(opt.value) ? 'primary' : 'neutral'"
      role="radio"
      :aria-checked="isSelected(opt.value)"
      @click="onSelect(opt.value)"
    >
      <span class="d-radio-button__content">
        <span class="d-radio-button__label">{{ opt.label }}</span>
        <span v-if="$slots.right" class="d-radio-button__right">
          <slot name="right" :option="opt" />
        </span>
      </span>
    </UButton>
  </UFieldGroup>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonColor = 'primary' | 'neutral' | 'secondary' | 'info' | 'success' | 'warning' | 'error'

const props = withDefaults(
  defineProps<{
    modelValue?: unknown
    options: Array<{ label: string, value: unknown, disabled?: boolean }>
    name?: string
    disabled?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    orientation?: 'horizontal' | 'vertical'
    activeColor?: ButtonColor
    inactiveColor?: ButtonColor
  }>(),
  {
    size: 'md',
    orientation: 'horizontal',
    activeColor: 'primary',
    inactiveColor: 'neutral'
  }
)

const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
  get: () => props.modelValue,
  set: (v: unknown) => emit('update:modelValue', v)
})

function isSelected(value: unknown) {
  return modelValue.value === value
}

function onSelect(value: unknown) {
  if (props.disabled) {
    return
  }

  modelValue.value = value
}

// prevent unused warning when integrating in forms
void props.name
</script>

<style scoped>
.d-radio-group {
  width: 100%;
}

.d-radio-button {
  flex: 1 1 auto;
}

.d-radio-button__content {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
}

.d-radio-button__label {
  flex: 1 1 auto;
}

.d-radio-button__right {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
</style>
