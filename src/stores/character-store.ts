import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import characterImages from 'src/assets/character-images.json'

export const useCharacterStore = defineStore('character', {
  state: () => ({
    characters: [],
    characterImages,
    charactersLoading: false
  }),
  getters: {
    getCharacters: (state) => state.characters,
    getCharacterImages: (state) => state.characterImages
  },
  actions: {
    async setCharacters () {
      try {
        this.$patch({ charactersLoading: true })
        const { data: { data }, status } = await api.get('/character')
        if (status < 300) {
          this.$patch({
            characters: data,
            charactersLoading: false
          })
        } else {
          console.error('Failed to fetch character list')
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.$patch({ charactersLoading: false })
      }
    }
  }
})
