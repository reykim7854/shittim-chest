<style lang="sass" scoped>
.student-card-size
  min-width: 150px
  max-width: 150px

.img-caption
  padding: 8px
  background-color: rgba(0, 0, 0, 0.7)
</style>

<template>
  <q-card class="student-card-size column q-ma-sm">
    <q-img
      :src="generateThumbImages(row.name)"
      :alt="`${row.name}'s Avatar'`"
      height="169px"
      loading="lazy"
    >
      <template v-slot:default>
        <div class="img-caption absolute-bottom text-center text-subtitle2">
          <template v-if="sortBy === 'baseStar' || sortBy === 'name'">
            <q-icon
              v-for="n in row.baseStar"
              :key="`star-${n}`"
              name="star"
              color="yellow"
            />
          </template>
          <template
            v-else-if="
              sortBy === 'urban' || sortBy === 'outdoor' || sortBy === 'indoor'
            "
            >{{ formatSortByValue(row.terrain[sortBy].DamageDealt) }}</template
          >
          <template v-else>{{ formatSortByValue(row[sortBy]) }}</template>
        </div>
      </template>
      <template v-slot:loading>
        <q-spinner color="primary" />
      </template>
      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-negative text-white">
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

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StudentCardImage',
  props: {
    studentImages: {
      type: Object,
      default: () => Object,
      required: true
    },
    sortBy: {
      type: String,
      default: 'name',
      required: true
    },
    row: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const formatName = (val: string) => val.replace(/\(/, '\n(')
    const formatSortByValue = (val: string) =>
      val.replace(/([a-z])([A-Z])/g, '$1 $2')

    const checkStudentImages = (name: string) =>
      props.studentImages[name] &&
      Object.prototype.hasOwnProperty.call(props.studentImages[name], 'avatar')
        ? props.studentImages[name].avatar
        : false

    const generateThumbImages = (name: string) => {
      const url = checkStudentImages(name)
      if (url) {
        const newUrl = url.replace(/bluearchivewiki/, 'bluearchivewiki/thumb')
        return `${newUrl}/150px-${url.substring(url.lastIndexOf('/') + 1)}`
      }

      return 'false'
    }

    return {
      props,
      formatName,
      formatSortByValue,
      generateThumbImages
    }
  }
})
</script>
