<style lang="sass" scoped>
.card-title
  position: sticky
  top: 0
  background-color: inherit
  z-index: 1
  box-shadow: 0 0.5px 5px 0px #000000

.q-card__actions
  position: sticky
  bottom: 0
  background-color: inherit
  box-shadow: 0 -0.5px 5px 0px #000000

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
      <q-card-section
        v-for="(value, key, index) in filter"
        :key="`${key}-${index}`"
      >
        <input-select-field
          v-model="value.value"
          :label="`${key}`"
          :options="value.options"
          :multiple="!!value.multiple"
          :use-chips="!!value.multiple"
          :emit-value="true"
          :map-options="true"
          :clearable="true"
        >
          <template
            v-if="!!value.chips"
            v-slot:selected-item="{ opt, index, tabindex, removeAtIndex }"
          >
            <q-chip
              removable
              @remove="removeAtIndex(index)"
              :tabindex="tabindex"
            >
              <template v-if="!!value.icon">
                <q-icon
                  v-for="(n, i) in opt.value"
                  :key="`${n.label}-${i}`"
                  name="star"
                  color="yellow"
                  size="xs"
                />
              </template>
              <template v-else>{{ opt.label }}</template>
            </q-chip>
          </template>
        </input-select-field>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Close" color="negative" v-close-popup />
        <q-btn label="Reset" color="warning" @click="resetFilter" />
        <q-btn label="Save" color="primary" @click="saveFilter" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import InputSelectField from './InputSelectField.vue'

export default defineComponent({
  components: {
    InputSelectField
  },
  emits: ['saveFilter'],
  props: {
    filterValues: {
      type: Object,
      required: true
    },
    defaultValues: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const dialog = ref(false)
    const filter = ref(JSON.parse(JSON.stringify(props.filterValues)))

    const saveFilter = () => emit('saveFilter', filter.value)
    const resetFilter = () => {
      filter.value = props.defaultValues
    }

    return {
      dialog,
      filter,
      saveFilter,
      resetFilter
    }
  }
})
</script>
