<template>
  <div class="q-pa-md row justify-center">
    <div class="q-gutter-xs" style="width: 100%; max-width: 1024px">
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
      >
        <template v-slot:item="{ row }">
          <q-card class="character-card-size q-ma-sm column">
            <q-img
              :src="generateThumbImages(characterImages[row.name]['avatar'])"
              :alt="`${row.name}'s Avatar'`"
              loading="lazy"
            />
            <q-card-section class="text-center col-grow column justify-center">
              {{ row.name }}
            </q-card-section>
          </q-card>
        </template>
      </q-table>
    </div>
  </div>
  <div class="q-pa-md"></div>
</template>

<style scoped>
  .character-card-size {
    min-width: 150px;
    max-width: 150px;
  }
</style>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

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
    const rowsPerPageOptions: number[] = [6, 12, 18, 24, 30, 0]
    const pagination: object = {
      rowsPerPage: 12
    }
    const tableJustifyCenter = () => {
      const tableGrid = document.querySelector('.q-table__grid-content')
      tableGrid?.classList.add('justify-center')
      tableGrid?.classList.add('items-stretch')
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
      columns,
      visibleColumns,
      rowsPerPageOptions,
      pagination,
      generateThumbImages
    }
  }
})
</script>
