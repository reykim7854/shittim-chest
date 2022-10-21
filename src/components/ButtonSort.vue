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
      :ripple="false"
    >
      <q-menu fit anchor="bottom left" self="top left">
        <q-list>
          <q-item
            clickable
            v-close-popup
            v-for="(sort, i) in sortValues"
            :key="`sort-by-${i}`"
            @click="sortBy = sort.name"
            :active="true"
          >
            <q-item-section>{{ sort.label }}</q-item-section>
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
      @click="isAsc = !isAsc"
      :ripple="false"
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
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  props: {
    sortValues: {
      type: Array as PropType<any[]>,
      required: true,
      default: () => Array
    }
  },
  setup(props) {
    const sortBy = ref('baseStar')
    const isAsc = ref(true)

    return {
      props,
      sortBy,
      isAsc
    }
  }
})
</script>
