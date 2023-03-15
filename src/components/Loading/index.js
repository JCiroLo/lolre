import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true
    },
    progress: {
      type: Number,
      required: true
    }
  }
})
