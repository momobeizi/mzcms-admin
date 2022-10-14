<template>
  <div class="edit-content-container"></div>
</template>

<script>
import { findOneContent } from '@/api/docManage.js'
export default {
  data () {
    return {
      id: '',
      condition:{

      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getContentInfo()
    }
  },
  methods: {
    getContentInfo () {
      findOneContent({id:this.id}).then(res=>{

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-content-container {
}
</style>