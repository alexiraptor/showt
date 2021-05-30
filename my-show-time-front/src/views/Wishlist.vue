<template>
  <div class="concerts-box container">
    <h2>Your WishList</h2>
    <div v-if="concerts">
      <div v-for="concert of concerts" :key="concert.id">
        <Concerts :concert="concert"> </Concerts>
      </div>
    </div>
  </div>
</template>

<script>
import Concerts from "../components/Concerts";
import axios from "axios";
export default {
  data() {
    return {
      concerts: null,
      token: null,
    };
  },
  name: "Concert",
  components: { Concerts },
  props: ["baseURL"],
  methods: {
    fetchWishlist: function () {
      // fetch concerts
      axios
        .get("http://localhost:3000/concerts/" + "wishlist/" + this.token)
        .then((data) => (this.concerts = data.data))
        .catch((err) => console.log(err));
    },
    refreshNav: function () {
      this.key += 1;
    },
  },
  mounted() {
    //get token
    this.token = localStorage.getItem("token");

    //fetch concerts from the wishlist
    this.fetchWishlist();
  },
};
</script>

<style>
.concerts-box h2 {
  font-family: "Courgette", cursive;
  font-size: 60px;
  text-align: center;
  margin: 70px 0;
}
.add-btn {
  margin: 20px 0;
}
</style>