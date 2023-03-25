<style lang="sass" scoped>
.btn-sort-by
  border-bottom-right-radius: 0
  border-top-right-radius: 0

.btn-sort
  border-bottom-left-radius: 0
  border-top-left-radius: 0
</style>

<template>
  <div class="row q-ma-xs">
    <q-btn
      no-caps
      class="col-9 btn-sort-by text-capitalize"
      icon="sort"
      :label="buttonLabel"
      color="primary"
    >
      <q-menu fit anchor="bottom left" self="top left" max-height="250px">
        <q-list>
          <q-item
            clickable
            v-close-popup
            v-for="(sortValue, i) in sortValues"
            :key="`sort-by-${i}`"
            @click="emit('update:sortBy', sortValue.name)"
            :active="sortBy === sortValue.name"
          >
            <q-item-section>{{ sortValue.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <q-btn
      color="primary"
      :icon="isAsc ? 'arrow_downward' : 'arrow_upward'"
      class="col-3 btn-sort"
      @click="emit('update:isAsc', !isAsc)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, Ref } from 'vue'

export default defineComponent({
  emits: ['update:sortBy', 'update:isAsc'],
  props: {
    sortValues: {
      type: Array as PropType<any[]>,
      required: true,
      default: () => Array
    },
    sortBy: {
      type: String,
      required: true,
      default: 'name'
    },
    isAsc: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  setup(props, { emit }) {
    const buttonLabel: Ref<string> = computed(
      () => props.sortValues.find((e) => e.name === props.sortBy).label
    )

    return {
      props,
      emit,
      buttonLabel
    }
  }
})
</script>
