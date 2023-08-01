import { defineStore } from 'pinia'
import { getStudents } from 'src/api/student'
import studentImages from 'src/assets/student-images.json'
import { StudentListAttributes } from 'src/models/StudentModel'

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [] as StudentListAttributes[],
    studentImages
  }),
  getters: {
    getStudents: (state) => state.students,
    getStudentImages: (state) => state.studentImages
  },
  actions: {
    async setStudents() {
      try {
        const { data, status } = await getStudents()
        if (status < 300) {
          this.$patch({
            students: data
          })
        } else {
          throw new Error('Failed to fetch student list')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})
