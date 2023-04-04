<template>
  <q-input
    v-model="value"
    :debounce="debounce"
    :placeholder="placeholder"
    :outlined="outlined"
    clearable
    @clear="() => (value = '')"
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: '',
      required: true
    },
    debounce: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    outlined: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const value = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit('update:modelValue', value)
      }
    })

    return { value }
  }
})
</script>
