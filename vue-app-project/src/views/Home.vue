<template>
  <div class="home">
    Home主页
    <div class="list" v-for="(item,index) in listData" :key="index">
      <div>
        {{item.Title}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('list', { listData: 'listData' })
  },
  mounted () {
    this.getTopLineList({ type: 'init' })
  },
  methods: {
    ...mapActions('topLine', ['getTopLineList'])
  }
}
</script>

<style lang="scss" scoped>
</style>
