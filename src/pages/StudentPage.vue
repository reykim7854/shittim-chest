<template>
  <q-page>
    <student-list
      :students="students"
      :student-images="studentImages"
      :loading="loading"
    ></student-list>
  </q-page>
</template>

<script lang="ts">
import StudentList from 'src/components/StudentList.vue'
import { defineComponent, computed } from 'vue'
import { useStudentStore } from 'src/stores/student-store'
import { useMetaStore } from 'src/stores/meta-store'

export default defineComponent({
  name: 'StudentPage',
  components: { StudentList },
  setup() {
    const studentStore = useStudentStore()
    const loading = computed(() => studentStore.studentsLoading)
    if (studentStore.students.length <= 0) {
      studentStore.setStudents()
    }
    const students = computed(() => studentStore.students)
    const studentImages = computed(() => studentStore.studentImages)

    const metaStore = useMetaStore()
    metaStore.setMetaData(
      'Students',
      'List of available students in Blue Archive global version'
    )

    return { students, studentImages, loading }
  }
})
</script>
