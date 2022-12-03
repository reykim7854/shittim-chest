<template>
  <q-btn
    no-caps
    class="q-mr-xs"
    label="Filters"
    icon="filter_list"
    color="primary"
    rounded
    unelevated
    @click="dialog = true"
  />

  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Filters</div>
      </q-card-section>

      <div class="row">
        <q-card-section>
          <div class="q-pb-sm text-subtitle1">Squad Type</div>
          <q-option-group
            v-model="squadTypeFilter"
            :options="squadTypeOptions"
            color="primary"
            inline
          />
        </q-card-section>
        <q-card-section>
          <div class="q-pb-sm text-subtitle1">Base Star</div>
          <q-option-group
            v-model="baseStarFilter"
            :options="baseStarOptions"
            color="primary"
            inline
            type="checkbox"
          />
        </q-card-section>
      </div>
      <q-card-actions align="right">
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed } from 'vue'

export default defineComponent({
  emits: ['update:squadType', 'update:baseStar'],
  props: {
    squadType: {
      type: String,
      required: true,
      default: ''
    },
    baseStar: {
      type: Array as PropType<number[]>,
      required: true,
      default: () => [3, 2, 1]
    }
  },
  setup(props, { emit }) {
    const dialog = ref(false)

    // squad type start
    const squadTypeFilter = computed<string>({
      get(): string {
        return props.squadType
      },
      set(value: string) {
        emit('update:squadType', value)
      }
    })
    const squadTypeOptions = [
      { label: 'All', value: '' },
      { label: 'Striker', value: 'striker' },
      { label: 'Special', value: 'special' }
    ]
    // squad type end

    // base star start
    const baseStarOptions = [
      { label: '3-star', value: 3 },
      { label: '2-star', value: 2 },
      { label: '1-star', value: 1 }
    ]
    const baseStarFilter = computed<number[]>({
      get(): number[] {
        return props.baseStar
      },
      set(value: number[]) {
        emit('update:baseStar', value)
      }
    })
    // base star end

    return {
      dialog,
      squadTypeFilter,
      squadTypeOptions,
      baseStarOptions,
      baseStarFilter
    }
  }
})
</script>
