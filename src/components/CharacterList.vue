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
      :filter-method="filterMethod"
    >
      <template v-slot:top>
        <q-input
          standout
          debounce="300"
          v-model="name"
          placeholder="Search Student Name"
          style="width: 100%"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-tabs
          v-model="squadType"
          inline-label
          mobile-arrows
          outside-arrows
          style="width: 100%"
        >
          <q-tab name="all" label="All" />
          <q-tab name="striker" label="Striker" />
          <q-tab name="special" label="Special" />
        </q-tabs>
      </template>
      <template v-slot:item="{ row }">
        <q-card class="character-card-size column q-ma-sm">
          <q-img
            :src="generateThumbImages(characterImages[row.name]['avatar'])"
            :alt="`${row.name}'s Avatar'`"
            loading="lazy"
          />
          <q-card-section
            style="white-space: pre-wrap"
            class="text-h6 text-center col-grow column justify-center"
          >
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
import { defineComponent, ref, computed, onMounted } from 'vue'

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

  setup(props) {
    const columns = [
      {
        name: 'name',
        required: true,
        label: 'Name',
        field: (row: { name: string }) => row.name,
        sortable: true
      },
      {
        name: 'squadType',
        required: true,
        label: 'Squad Type',
        field: (row: { squadType: string }) => row.squadType,
        sortable: true
      }
    ]

    const visibleColumns: string[] = ['name']
    const rowsPerPageOptions: number[] = [0]
    const pagination: object = {
      rowsPerPage: 0
    }

    // filter block start
    const name = ref('')
    const squadType = ref('all')
    const filter = computed(() => {
      return { name, squadType }
    })

    const filterMethod = (rows: readonly any[], terms: any) => {
      return rows.filter((row) => {
        const filtered: boolean[] = [
          row.name.toLowerCase().includes(terms.name.value.toLowerCase()),
          terms.squadType.value.toLowerCase() === 'all' ||
            row.squadType.toLowerCase() === terms.squadType.value.toLowerCase()
        ]
        return filtered.every((value) => value === true)
      })
    }
    // filter block end

    // format table content start
    const formatName = (val: string) => val.replace(/\(/, '\n(')

    const tableJustifyCenter = () => {
      const tableGrid = document.querySelector('.q-table__grid-content')
      tableGrid?.classList.add('justify-center', 'item-stretch')
    }

    const generateThumbImages = (url: string) => {
      const newUrl = url.replace(/bluearchivewiki/, 'bluearchivewiki/thumb')
      return `${newUrl}/150px-${url.substring(url.lastIndexOf('/') + 1)}`
    }
    // format table content end

    onMounted(() => {
      tableJustifyCenter()
    })

    return {
      props,
      name,
      squadType,
      filter,
      filterMethod,
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
