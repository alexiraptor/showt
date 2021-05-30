<template>
  <div>
      <div class="container">
          <form v-on:submit="addconcert">
              <div class="form-group">
                <input type="text" v-model="title" placeholder="title" required = True class="form-control" />
                <input type="text" v-model="description" placeholder="description" required class="form-control" />
                <input type="text" v-model="genre" placeholder="genre" required class="form-control" />
                <input type="text" v-model="artiste" placeholder="artiste" required class="form-control" />
                <input type="text" v-model="date" placeholder="date" required class="form-control" />
                <input type="text" v-model="price" placeholder="price" required class="form-control" />
                <button class="btn btn-danger">
                        Add Concert
                </button>
                </div>
                </form>
        </div>

    </div>

</template>

<script>
import axios from "axios";
export default {
  name: "Addtodo",
  data() {
    return {
      title: "",
      description: "",
      genre: "",
      artiste: "",
      date: "",
      price: "",
    };
  },
  methods: {
    addconcert() {
      console.log("je suis la!");
      axios
        .post("http://localhost:3000/concerts", {
          title: this.title,
          description: this.description,
          genre: this.genre,
          artiste: this.artiste,
          date: this.date,
          price: this.price,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>