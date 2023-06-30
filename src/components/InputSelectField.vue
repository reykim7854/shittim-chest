<template>
  <q-select
    class="text-capitalize"
    outlined
    v-model="value"
    :options="options"
    :label="label"
    :use-chips="useChips"
    :multiple="multiple"
    :emit-value="emitValue"
    :map-options="mapOptions"
    :clearable="clearable"
    @clear="clear"
  >
    <template v-slot:option v-if="$slots.option"></template>
    <template
      v-slot:selected-item="{ opt, index, tabindex, removeAtIndex }"
      v-if="$slots['selected-item']"
    >
      <slot
        name="selected-item"
        :opt="opt"
        :index="index"
        :tabindex="tabindex"
        :removeAtIndex="removeAtIndex"
      ></slot>
    </template>
  </q-select>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      required: true
    },
    options: {
      type: Array as any,
      default: () => [],
      required: true
    },
    label: {
      type: String,
      default: '',
      required: true
    },
    useChips: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    mapOptions: {
      type: Boolean,
      default: false
    },
    emitValue: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
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

    const clear = (value: any) => {
      if (Array.isArray(value)) {
        emit('update:modelValue', [])
      } else if (value instanceof String) {
        emit('update:modelValue', '')
      }
    }

    return { props, value, clear }
  }
})
</script>
