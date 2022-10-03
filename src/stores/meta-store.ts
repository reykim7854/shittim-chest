import { defineStore } from 'pinia'
import { useMeta } from 'quasar'

export const useMetaStore = defineStore('meta', {
  state: () => ({
    metaData: {
      // sets document title
      title: 'Home',
      // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      titleTemplate: (title: string) => `${title} - Shittim Chest`,

      // meta tags
      meta: {
        description: { name: 'description', content: 'Welcome to Shittim Chest! A Blue Archive Interactive App' },
        keywords: { name: 'keywords', content: 'Shittim Chest,Blue Archive,Buruaka,ブルーアーカイブ,ブルアカ' },
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
      },

      // <noscript> tags
      noscript: {
        default: 'This is content for browsers with no JS (or disabled JS)'
      }
    }
  }),
  actions: {
    async setMetaData (title = 'Home', description = 'A Blue Archive Interactive App') {
      this.$patch((state) => {
        state.metaData.title = title
        state.metaData.meta.description.content = description
      })

      useMeta(this.metaData)
    }
  }
})
