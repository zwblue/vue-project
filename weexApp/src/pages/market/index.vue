<template>
  <div>
    <SearchEntry></SearchEntry>
    <Tab :activeIndex='tabConfig.activeIndex' @switchTabIndex='switchTabIndex' :color='tabConfig.tabColor' :bdColor='tabConfig.tabColor'></Tab>
    <Title></Title>
  </div>
</template>

<script>
  import SearchEntry from '@/components/home/SearchEntry.vue'
  import Tab from '@/components/market/Tab.vue'
  import Title from '@/components/market/Title.vue'
  export default {
    components: {
      SearchEntry,
      Tab,
      Title
    },
    data () {
      return {
        tabConfig: {
          tabColor: '#5899d8',
          activeIndex: 0
        }
      }
    },
    methods: {
      switchTabIndex (index) {
        if (index === this.tabConfig.activeIndex) return
        this.tabConfig.activeIndex = index
      }
    }
  }
</script>

<style scoped>

</style>