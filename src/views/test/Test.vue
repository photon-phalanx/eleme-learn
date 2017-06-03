<template>
  <div class="test">
    this is a test page
    <p>
      {{index}}
      {{index2}}
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unused-vars */
  var index = 0
  import {getData} from '../../api/testGetData'
  export default {
    data () {
      return {
        index2: index
      }
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
