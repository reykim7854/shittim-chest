import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import studentImages from 'src/assets/student-images.json'

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [],
    studentImages,
    studentsLoading: false
  }),
  getters: {
    getStudents: (state) => state.students,
    getStudentImages: (state) => state.studentImages
  },
  actions: {
    async setStudents() {
      try {
        this.$patch({ studentsLoading: true })
        const {
          data: { data },
          status
        } = await api.get('/character')
        if (status < 300) {
          this.$patch({
            students: data,
            studentsLoading: false
          })
        } else {
          console.error('Failed to fetch student list')
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.$patch({ studentsLoading: false })
      }
    }
  }
})
