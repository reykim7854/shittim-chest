<template>
  <div class="q-mb-lg">
    <q-table
      grid
      :columns="columns"
      :rows="students"
      row-key="id"
      :loading="loading"
      hide-header
      :visible-columns="visibleColumns"
      :rows-per-page-options="rowsPerPageOptions"
      :pagination="pagination"
      :filter="filter"
      :filter-method="filterMethod"
    >
      <template v-slot:top>
        <div class="filter-wrapper row">
          <div class="col-12 col-sm-7 col-md-5">
            <q-input
              standout
              v-model="name"
              debounce="300"
              placeholder="Search Student Name"
              rounded
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div
            class="q-mt-md q-mt-sm-none col-12 col-sm-5 col-md-7 row align-center"
            :class="{
              'justify-end': screenGreaterThanSmall,
              'justify-evenly': !screenGreaterThanSmall
            }"
          >
            <button-filter
              v-model:squad-type="squadType"
              v-model:base-star="baseStar"
            />
            <button-sort
              class="q-ml-xs"
              :sort-values="columns"
              v-model:sort-by="sortBy"
              v-model:is-asc="isAsc"
            />
          </div>
        </div>
      </template>
      <template v-slot:item="{ row }">
        <q-card class="student-card-size column q-ma-sm">
          <q-img
            :src="generateThumbImages(studentImages[row.name]['avatar'])"
            :alt="`${row.name}'s Avatar'`"
            height="169px"
            loading="lazy"
          >
            <template v-slot:default>
              <div
                class="img-caption absolute-bottom text-center text-subtitle2"
              >
                <template v-if="sortBy === 'baseStar' || sortBy === 'name'">
                  <q-icon
                    v-for="n in row.baseStar"
                    :key="`star-${n}`"
                    name="star"
                    color="yellow"
                  />
                </template>
                <template v-else>{{ row[sortBy] }}</template>
              </div>
            </template>
            <template v-slot:loading>
              <div class="text-subtitle1 text-white">Loading...</div>
            </template>
            <template v-slot:error>
              <div
                class="absolute-full flex flex-center bg-negative text-white"
              >
                Cannot load image
              </div>
            </template>
          </q-img>
          <q-card-section
            style="white-space: pre-wrap"
            class="text-center col-grow column justify-center text-subtitle1"
          >
            {{ formatName(row.name) }}
          </q-card-section>
        </q-card>
      </template>
    </q-table>
  </div>
</template>

<style lang="sass" scoped>
.student-card-size
  min-width: 150px
  max-width: 150px

.filter-wrapper
  width: 100%

.img-caption
  padding: 8px
  background-color: rgba(0, 0, 0, 0.7)
</style>

<script lang="ts">
import { defineComponent, ref, Ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import ButtonSort from 'components/ButtonSort.vue'
import ButtonFilter from 'components/ButtonFilter.vue'

export default defineComponent({
  name: 'StudentList',
  components: {
    ButtonSort,
    ButtonFilter
  },
  props: {
    students: {
      type: Array,
      default: () => Array
    },
    studentImages: {
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
      },
      {
        name: 'baseStar',
        required: true,
        label: 'Base Star',
        field: (row: { baseStar: number }) => row.baseStar,
        sortable: true
      },
      {
        name: 'armorType',
        required: true,
        label: 'Armor Type',
        field: (row: { armorType: string }) => row.armorType,
        sortable: true
      },
      {
        name: 'bulletType',
        required: true,
        label: 'Bullet Type',
        field: (row: { bulletType: string }) => row.bulletType,
        sortable: true
      },
      {
        name: 'position',
        required: true,
        label: 'Position',
        field: (row: { position: string }) => row.position,
        sortable: true
      },
      {
        name: 'role',
        required: true,
        label: 'Role',
        field: (row: { role: string }) => row.role,
        sortable: true
      },
      {
        name: 'weaponType',
        required: true,
        label: 'Weapon Type',
        field: (row: { weaponType: string }) => row.weaponType,
        sortable: true
      }
    ]

    const visibleColumns: string[] = ['name']
    const rowsPerPageOptions: number[] = [12, 18, 24, 30]
    const pagination: object = {
      rowsPerPage: 18
    }

    // filter block start
    const name: Ref<string> = ref('')
    const squadType: Ref<string> = ref('')
    const baseStar: Ref<number[]> = ref([3, 2, 1])
    const sortBy = ref('name')
    const isAsc = ref(true)
    const filter = computed(() => {
      return { name, squadType, baseStar }
    })

    const filterMethod = (rows: readonly any[], terms: any) => {
      const filtered = rows.filter((row) => {
        const filtered: boolean[] = [
          terms.name.value === ''
            ? true
            : row.name.toLowerCase().includes(terms.name.value.toLowerCase()),
          terms.squadType.value.toLowerCase() === '' ||
            row.squadType.toLowerCase() === terms.squadType.value.toLowerCase(),
          terms.baseStar.value.includes(row.baseStar)
        ]
        return filtered.every((value) => value === true)
      })

      if (isAsc.value) {
        filtered.sort((a, b) => {
          const valueA = a[sortBy.value]
          const valueB = b[sortBy.value]

          if (valueA < valueB) {
            return -1
          }
          if (valueA > valueB) {
            return 1
          }

          return 0
        })
      } else {
        filtered.sort((a, b) => {
          const valueA = a[sortBy.value]
          const valueB = b[sortBy.value]

          if (valueA < valueB) {
            return 1
          }
          if (valueA > valueB) {
            return -1
          }

          return 0
        })
      }

      return filtered
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

    const $q = useQuasar()
    const screenGreaterThanSmall = computed(() => $q.screen.gt.sm)

    onMounted(() => {
      tableJustifyCenter()
    })

    return {
      props,
      name,
      squadType,
      baseStar,
      sortBy,
      isAsc,
      filter,
      filterMethod,
      columns,
      visibleColumns,
      rowsPerPageOptions,
      pagination,
      generateThumbImages,
      formatName,
      screenGreaterThanSmall
    }
  }
})
</script>
