<template>
  <div class="optional-box">
    <ShareIndex :shareIndexData='shareIndexData'></ShareIndex>
    <OptionalTitle></OptionalTitle>
  </div>
</template>

<script>
  import ShareIndex from '@/components/home/ShareIndex.vue'
  import OptionalTitle from '@/components/optional/OptionalTitle.vue'
  import request, { marketIndex } from '@/api'
  export default {
    components: {
      ShareIndex,
      OptionalTitle
    },
    data () {
      return {
        shareIndexData: {}
      }
    },
    mounted () {
      this.getShareIndexData()
    },
    methods: {
      async getShareIndexData () {
        const {data} = await request(marketIndex)
        console.log('shareIndex', data)
        this.shareIndexData = data
      }
    }
  }
</script>

<style scoped>
.optional-box{
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
</style>