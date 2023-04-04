<style lang="sass" scoped>
.table-wrapper
  margin-bottom: 90px
</style>

<template>
  <div class="table-wrapper">
    <q-table
      :title="title"
      :grid="grid"
      :columns="columns"
      :rows="row"
      :row-key="rowKey"
      :loading="loading"
      :hide-header="hideHeader"
      :visible-columns="visibleColumns"
      :rows-per-page-options="rowsPerPageOptions"
      :pagination="pagination"
      :filter="filter"
      :filter-method="filterMethod"
    >
      <template v-slot:top v-if="$slots.top">
        <slot name="top"></slot>
      </template>
      <template v-slot:item="{ row }" v-if="$slots.item">
        <slot name="item" :row="row"></slot>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'StudentList',
  emits: ['filterMethod'],
  props: {
    title: {
      type: String,
      default: ''
    },
    grid: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array as any,
      default: () => []
    },
    row: {
      type: Array as any,
      default: () => []
    },
    rowKey: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    visibleColumns: {
      type: Array,
      default: () => []
    },
    rowsPerPageOptions: {
      type: Array,
      default: () => [10, 20, 30]
    },
    pagination: {
      type: Object,
      default: () => Object.assign({}, { rowsPerPage: 10 })
    },
    filter: {},
    filterMethod: {
      type: Function as any,
      required: true
    }
  },

  setup(props) {
    // format table content start
    const tableJustifyCenter = () => {
      const tableGrid = document.querySelector('.q-table__grid-content')
      tableGrid?.classList.add('justify-center', 'item-stretch')
    }
    // format table content end

    onMounted(() => {
      tableJustifyCenter()
    })

    return {
      props
    }
  }
})
</script>
