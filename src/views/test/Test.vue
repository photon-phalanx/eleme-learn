<template>
  <div class="test">
    this is a test page
  </div>
</template>

<script type="text/ecmascript-6">
  import {getData} from '../../api/testGetData'
  export default {
    data () {
      return {}
    },
    mounted () {
      getData()
    },
    props: [],
    methods: {}
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
