<template>
  <q-page>
    <student-list
      :grid="true"
      :row="students"
      row-key="id"
      :loading="loading"
      :columns="columns"
      :hide-header="true"
      :visible-columns="visibleColumns"
      :rows-per-page-options="rowsPerPageOptions"
      :pagination="pagination"
      :filter="filter"
      :filter-method="filterMethod"
    >
      <template v-slot:top>
        <student-data-table-top>
          <template v-slot:left>
            <input-text-field
              class="q-ma-xs"
              v-model="name"
              debounce="300"
              placeholder="Search Student Name"
            ></input-text-field>
          </template>
          <template v-slot:right>
            <button-filter
              :filter-values="filterValues"
              @save-filter="handleSaveFilter"
            />
            <button-sort
              class="q-ml-xs"
              :sort-values="columns"
              v-model:sort-by="sortBy"
              v-model:is-asc="isAsc"
            />
          </template>
        </student-data-table-top>
      </template>
      <template v-slot:item="{ row }">
        <student-card-image
          :student-images="studentImages"
          :sort-by="sortBy"
          :row="row"
        ></student-card-image>
      </template>
    </student-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { fetchStudents } from 'pages/student/student'
import {
  columns,
  visibleColumns,
  name,
  rowsPerPageOptions,
  pagination,
  filterValues,
  sortBy,
  isAsc,
  filter,
  handleSaveFilter,
  filterMethod
} from 'pages/student/student-data-table'
import { useMetaStore } from 'src/stores/meta-store'
import StudentList from 'src/components/student/TableStudentList.vue'
import StudentCardImage from 'src/components/student/StudentCardImage.vue'
import StudentDataTableTop from 'src/components/student/StudentDataTableTop.vue'
import InputTextField from 'src/components/InputTextField.vue'
import ButtonFilter from 'src/components/ButtonFilter.vue'
import ButtonSort from 'src/components/ButtonSort.vue'

export default defineComponent({
  name: 'StudentPage',
  components: {
    StudentList,
    StudentCardImage,
    StudentDataTableTop,
    InputTextField,
    ButtonFilter,
    ButtonSort
  },
  setup() {
    const metaStore = useMetaStore()
    metaStore.setMetaData(
      'Students',
      'List of available students in Blue Archive global version'
    )
    const { loading, students, studentImages } = fetchStudents()

    return {
      students,
      studentImages,
      loading,
      name,
      sortBy,
      isAsc,
      columns,
      visibleColumns,
      rowsPerPageOptions,
      pagination,
      filterValues,
      filter,
      handleSaveFilter,
      filterMethod
    }
  }
})
</script>
