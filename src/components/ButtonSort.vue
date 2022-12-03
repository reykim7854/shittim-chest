<template>
  <div class="row">
    <q-btn
      no-caps
      class="col-9 btn-sort-by text-capitalize"
      icon="sort"
      label="Sort"
      color="primary"
      rounded
      unelevated
    >
      <q-menu fit anchor="bottom left" self="top left">
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
      rounded
      color="primary"
      :icon="isAsc ? 'arrow_downward' : 'arrow_upward'"
      class="col-3 btn-sort"
      unelevated
      @click="emit('update:isAsc', !isAsc)"
    />
  </div>
</template>

<style lang="sass" scoped>
.btn-sort-by
  border-bottom-right-radius: 0
  border-top-right-radius: 0

.btn-sort
  border-bottom-left-radius: 0
  border-top-left-radius: 0
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

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
    return {
      props,
      emit
    }
  }
})
</script>
