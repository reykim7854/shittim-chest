<style lang="sass" scoped>
.table-wrapper
  margin-bottom: 90px

.filter-wrapper
  width: 100%
</style>

<template>
  <div class="table-wrapper">
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
          <div class="col-12 col-sm-4 col-md-6">
            <q-input
              class="q-ma-xs"
              v-model="name"
              debounce="300"
              placeholder="Search Student Name"
              outlined
              clearable
              @clear="() => (name = '')"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div
            class="q-mt-md q-mt-sm-none col-12 col-sm-8 col-md-6 row align-center"
            :class="{
              'justify-end': $q.screen.gt.xs,
              'justify-evenly': $q.screen.lt.sm
            }"
          >
            <button-filter-modal
              :filter-values="filterValues"
              @save-filter="handleSaveFilter"
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
        <table-student-card-image
          :student-images="studentImages"
          :sort-by="sortBy"
          :row="row"
        ></table-student-card-image>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, onMounted, reactive } from 'vue'
import ButtonSort from 'src/components/ButtonSort.vue'
import ButtonFilterModal from 'src/components/ButtonFilterModal.vue'
import TableStudentCardImage from 'src/components/Student/TableStudentCardImage.vue'

export default defineComponent({
  name: 'StudentList',
  components: {
    ButtonSort,
    ButtonFilterModal,
    TableStudentCardImage
  },
  props: {
    students: {
      type: Array,
      default: () => Array
    },
    studentImages: {
      type: Object,
      default: () => Object,
      required: true
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
        name: 'school',
        required: true,
        label: 'School',
        field: (row: { school: string }) => row.school,
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
        name: 'bulletType',
        required: true,
        label: 'Bullet Type',
        field: (row: { bulletType: string }) => row.bulletType,
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
    // const squadType: Ref<string> = ref('')
    const filterValues = reactive({
      'squad type': {
        value: '',
        type: 'radio',
        options: [
          { label: 'All', value: '' },
          { label: 'Striker', value: 'striker' },
          { label: 'Special', value: 'special' }
        ]
      },
      'base star': {
        value: [3, 2, 1],
        type: 'checkbox',
        options: [
          { label: '3-star', value: 3 },
          { label: '2-star', value: 2 },
          { label: '1-star', value: 1 }
        ]
      },
      school: {
        value: [
          'abydos',
          'arius',
          'gehenna',
          'hyakkiyako',
          'millennium',
          'redwinter',
          'srt',
          'shanhaijing',
          'trinity',
          'valkyrie',
          'etc'
        ],
        type: 'checkbox',
        options: [
          { label: 'Abydos', value: 'abydos' },
          { label: 'Arius', value: 'arius' },
          { label: 'Gehenna', value: 'gehenna' },
          { label: 'Hyakkiyako', value: 'hyakkiyako' },
          { label: 'Millennium', value: 'millennium' },
          { label: 'Red Winter', value: 'redwinter' },
          { label: 'SRT', value: 'srt' },
          { label: 'Shanhaijing', value: 'shanhaijing' },
          { label: 'Trinity', value: 'trinity' },
          { label: 'Valkyrie', value: 'valkyrie' },
          { label: 'Other', value: 'etc' }
        ]
      },
      position: {
        value: ['front', 'middle', 'back'],
        type: 'checkbox',
        options: [
          { label: 'Front', value: 'front' },
          { label: 'Middle', value: 'middle' },
          { label: 'Back', value: 'back' }
        ]
      },
      role: {
        value: ['attacker', 'tanker', 'supporter', 'healer', 'tactical'],
        type: 'checkbox',
        options: [
          { label: 'Attacker', value: 'attacker' },
          { label: 'Tanker', value: 'tanker' },
          { label: 'Supporter', value: 'supporter' },
          { label: 'Healer', value: 'healer' },
          { label: 'Tactical', value: 'tactical' }
        ]
      },
      'bullet type': {
        value: ['explosion', 'penetration', 'mystic'],
        type: 'checkbox',
        options: [
          { label: 'Explosion', value: 'explosion' },
          { label: 'Penetration', value: 'penetration' },
          { label: 'Mystic', value: 'mystic' }
        ]
      },
      'armor type': {
        value: ['light armor', 'heavy armor', 'special armor'],
        type: 'checkbox',
        options: [
          { label: 'Light Armor', value: 'light armor' },
          { label: 'Heavy Armor', value: 'heavy armor' },
          { label: 'Special Armor', value: 'special armor' }
        ]
      },
      'weapon type': {
        value: ['ar', 'gl', 'hg', 'mg', 'mt', 'rg', 'rl', 'sg', 'smg', 'sr'],
        type: 'checkbox',
        options: [
          { label: 'Assault Rifle', value: 'ar' },
          { label: 'Grenade Launcher', value: 'gl' },
          { label: 'Handgun', value: 'hg' },
          { label: 'Machine Gun', value: 'mg' },
          { label: 'Mortar', value: 'mt' },
          { label: 'Rail Gun', value: 'rg' },
          { label: 'Rocket Launcher', value: 'rl' },
          { label: 'Shotgun', value: 'sg' },
          { label: 'Submachine Gun', value: 'smg' },
          { label: 'Sniper Rifle', value: 'sr' }
        ]
      }
    })

    const sortBy = ref('name')
    const isAsc = ref(true)
    const filter = computed(() => {
      return {
        name,
        squadType: filterValues['squad type'].value,
        baseStar: filterValues['base star'].value,
        school: filterValues.school.value,
        position: filterValues.position.value,
        role: filterValues.role.value,
        bulletType: filterValues['bullet type'].value,
        armorType: filterValues['armor type'].value,
        weaponType: filterValues['weapon type'].value
      }
    })

    const handleSaveFilter = (filter: any) => {
      for (const key in filter) {
        filterValues[key as keyof typeof filterValues].value = filter[key].value
      }
    }

    const filterMethod = (rows: readonly any[], terms: any) => {
      const filtered = rows.filter((row) => {
        const filtered: boolean[] = [
          terms.name.value === ''
            ? true
            : row.name.toLowerCase().includes(terms.name.value.toLowerCase()),
          terms.squadType === '' ||
            terms.squadType === row.squadType.toLowerCase(),
          terms.baseStar.includes(row.baseStar),
          terms.school.includes(row.school.toLowerCase()),
          terms.position.includes(row.position.toLowerCase()),
          terms.role.includes(row.role.toLowerCase()),
          terms.bulletType.includes(row.bulletType.toLowerCase()),
          terms.armorType.includes(row.armorType.toLowerCase()),
          terms.weaponType.includes(row.weaponType.toLowerCase())
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
    const tableJustifyCenter = () => {
      const tableGrid = document.querySelector('.q-table__grid-content')
      tableGrid?.classList.add('justify-center', 'item-stretch')
    }
    // format table content end

    onMounted(() => {
      tableJustifyCenter()
    })

    return {
      props,
      name,
      filterValues,
      sortBy,
      isAsc,
      filter,
      handleSaveFilter,
      filterMethod,
      columns,
      visibleColumns,
      rowsPerPageOptions,
      pagination
    }
  }
})
</script>
