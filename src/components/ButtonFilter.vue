<style lang="sass" scoped>
.card-title
  position: sticky
  top: 0
  background-color: inherit
  z-index: 1

.q-card__actions
  position: sticky
  bottom: 0
  background-color: inherit

.filter-card
  width: 100%
  max-width: 600px
</style>

<template>
  <q-btn
    no-caps
    class="q-ma-xs"
    label="Filters"
    icon="filter_list"
    color="primary"
    @click="dialog = true"
  />

  <q-dialog v-model="dialog" persistent>
    <q-card class="filter-card">
      <q-card-section class="card-title">
        <div class="text-h6">Filters</div>
      </q-card-section>

      <div class="row">
        <q-card-section
          v-for="(value, key, index) in filter"
          :key="`${key}-${index}`"
        >
          <div class="q-pb-sm text-subtitle1 text-capitalize">{{ key }}</div>
          <q-option-group
            v-model="filter[key]['value']"
            :options="value.options"
            color="primary"
            inline
            :type="filter[key]['type']"
          >
            <template v-slot:label="opt">
              <template v-if="key.toString() === 'base star'">
                <q-icon
                  v-for="(n, i) in opt.value"
                  :key="`${n.label}-${i}`"
                  name="star"
                  color="yellow"
                  size="xs"
                />
              </template>
              <span class="text-capitalize" v-else>{{ opt.label }}</span>
            </template>
          </q-option-group>
        </q-card-section>
      </div>
      <q-card-actions align="right">
        <q-btn label="Close" color="secondary" v-close-popup />
        <q-btn label="Save" color="primary" @click="saveFilter" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  emits: ['saveFilter'],
  props: {
    filterValues: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const dialog = ref(false)
    const filter = reactive(JSON.parse(JSON.stringify(props.filterValues)))

    const saveFilter = () => emit('saveFilter', filter)

    return {
      dialog,
      filter,
      saveFilter
    }
  }
})
</script>
