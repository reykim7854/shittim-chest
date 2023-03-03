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

  <q-dialog v-model="dialog" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Filters</div>
      </q-card-section>

      <div class="row">
        <q-card-section>
          <div class="q-pb-sm text-subtitle1">Squad Type</div>
          <q-option-group
            v-model="squadType"
            :options="squadTypeOptions"
            color="primary"
            inline
          />
        </q-card-section>
        <q-card-section>
          <div class="q-pb-sm text-subtitle1">Base Star</div>
          <q-option-group
            v-model="baseStar"
            :options="baseStarOptions"
            color="primary"
            inline
            type="checkbox"
          />
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
import { defineComponent, ref, Ref, PropType } from 'vue'

export default defineComponent({
  emits: ['saveFilter'],
  props: {
    squadTypeProp: {
      type: String,
      required: true,
      default: ''
    },
    baseStarProp: {
      type: Array as PropType<number[]>,
      required: true,
      default: () => [3, 2, 1]
    }
  },
  setup(props, { emit }) {
    const dialog = ref(false)

    // squad type start
    const squadType: Ref<string> = ref(props.squadTypeProp)
    const squadTypeOptions = [
      { label: 'All', value: '' },
      { label: 'Striker', value: 'striker' },
      { label: 'Special', value: 'special' }
    ]
    // squad type end

    // base star start
    const baseStar: Ref<number[]> = ref(props.baseStarProp)
    const baseStarOptions = [
      { label: '3-star', value: 3 },
      { label: '2-star', value: 2 },
      { label: '1-star', value: 1 }
    ]
    // base star end

    const saveFilter = () =>
      emit('saveFilter', {
        squadType: squadType.value,
        baseStar: baseStar.value
      })

    return {
      dialog,
      squadType,
      squadTypeOptions,
      baseStar,
      baseStarOptions,
      saveFilter
    }
  }
})
</script>
