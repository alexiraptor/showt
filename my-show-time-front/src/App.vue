<template>
  <div id="nav">
    <TheNavigation v-if="$route.name !== 'NotFound'"/>
    <Header v-if="$route.name !== 'NotFound'"/>
    <router-view/>
    <Footer v-if="$route.name !== 'NotFound'"/>
  </div>
</template>

<script>
//import TheNavigation from '@/components/Layouts/TheNavigation'
import Header from '@/components/Layouts/Header.vue'
import Footer from '@/components/Layouts/Footer.vue'

export default {
  name: 'Nav',
  components: {
    Header,
    //TheNavigation,
    Footer
  }
}
</script>

<style scoped>

</style>
