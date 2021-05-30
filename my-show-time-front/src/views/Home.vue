<template>
  <div class="home">
    <Concerts />
  </div>
</template>

<script lang="ts">
import Concerts from "../components/Concerts.vue";
import { Options, Vue } from "vue-class-component";
//import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    // HelloWorld,
    Concerts,
  },
})
export default class Home extends Vue {}
</script>
