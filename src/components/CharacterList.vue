<template>
  <div class="q-mb-lg">
    <q-table
      grid
      :columns="columns"
      :rows="characters"
      row-key="id"
      :loading="loading"
      :visible-columns="visibleColumns"
      hide-header
      :rows-per-page-options="rowsPerPageOptions"
      :pagination="pagination"
      hide-bottom
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="{ row }">
        <q-card class="character-card-size column q-ma-sm">
          <q-img
            :src="generateThumbImages(characterImages[row.name]['avatar'])"
            :alt="`${row.name}'s Avatar'`"
            loading="lazy"
          />
          <q-card-section style="white-space: pre-wrap" class="text-h6 text-center col-grow column justify-center">
            {{ formatName(row.name) }}
          </q-card-section>
        </q-card>
      </template>
    </q-table>
  </div>
</template>

<style scoped>
  .character-card-size {
    min-width: 150px;
    max-width: 150px;
  }
</style>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

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
        field: (row: { name: string }) => row.name,
        sortable: true
      }
    ]

    const visibleColumns: string[] = ['name']
    const rowsPerPageOptions: number[] = [0]
    const pagination: object = {
      rowsPerPage: 0
    }

    const formatName = (val: string) => val.replace(/\(/, '\n(')

    const tableJustifyCenter = () => {
      const tableGrid = document.querySelector('.q-table__grid-content')
      tableGrid?.classList.add('justify-md-start', 'justify-center', 'item-stretch')
    }

    const generateThumbImages = (url: string) => {
      const newUrl = url.replace(/bluearchivewiki/, 'bluearchivewiki/thumb')
      return `${newUrl}/150px-${url.substring(url.lastIndexOf('/') + 1)}`
    }

    onMounted(() => {
      tableJustifyCenter()
    })

    return {
      props,
      filter: ref(''),
      columns,
      visibleColumns,
      rowsPerPageOptions,
      pagination,
      generateThumbImages,
      formatName
    }
  }
})
</script>
