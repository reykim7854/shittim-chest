<template>
  <div class="q-pa-md">
    <q-table
      grid
      title="Students"
      :columns="columns"
      :rows="characters"
      row-key="id"
      :loading="loading"
      :visible-columns="visibleColumns"
      :rows-per-page-options="rowsPerPageOptions"
      :pagination="pagination"
    >
      <template v-slot:item="{ row }">
        <div class="q-pa-xs">
          <q-card style="min-width: 130px; max-width: 130px;">
            <img
              :src="characterImages[row.name]['avatar']"
              :alt="`${row.name}'s Avatar'`"
              style="min-width: 130px; max-width: 130px;"
            />
            <q-card-section class="text-center">
              {{ row.name }}
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CharacterList',
  props: {
    characters: {
      type: Array,
      default: () => Array
    },
    characterImages: {
      type: Object,
      default: () => Object
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  setup (props) {
    const columns = [
      {
        name: 'name',
        required: true,
        label: 'Name',
        field: 'name',
        sortable: true
      }
    ]

    const visibleColumns: string[] = ['name']
    const rowsPerPageOptions: number[] = [5, 10, 15, 20, 25, 0]
    const pagination: object = {
      rowsPerPage: 10
    }

    return {
      props,
      columns,
      visibleColumns,
      rowsPerPageOptions,
      pagination
    }
  }
})
</script>
