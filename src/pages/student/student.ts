import { computed } from 'vue'
import { useStudentStore } from 'src/stores/student-store'

const fetchStudents = () => {
  const studentStore = useStudentStore()
  const loading = computed(() => studentStore.studentsLoading)
  if (studentStore.students.length <= 0) {
    studentStore.setStudents()
  }
  const students = computed(() => studentStore.students)
  const studentImages = computed(() => studentStore.studentImages)

  return { loading, students, studentImages }
}

export { fetchStudents }
