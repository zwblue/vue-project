<template>
  <div class="home">
    Home主页 
    <div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  mounted () {
    this.getTopLineList({type: 'init'})
  },
  methods: {
    ...mapActions('topLine', ['getTopLineList'])
  }
}
</script>

<style lang="scss" scoped>
  .home{
    display: flex;
  }
</style>
