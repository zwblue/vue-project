<template>
  <div id="app">
    <!-- <Notice></Notice> -->
    <Header></Header>
    <Slider></Slider>
    <Section></Section>
  </div>
</template>

<script>
// import Notice from './components/notice'
import Header from './views/Header'
import Slider from './views/Slider'
import Section from './views/Section'
export default {
  name: 'app',
  components: {
    Header,
    Slider,
    Section
  }
}
</script>

<style lang="scss">
#app {
}
</style>
