<template>
  <div>
    <div style="text-align: center" class="crud text-center">
      <button
        type="button"
        class="btn"
        id="CRUDadmin"
        v-on:click="gotoCRUDadmin"
      >
        CRUD USERS
      </button>
      <Addconcerts />
      <h1>CRUD CONCERTS</h1>
    </div>
    <div class="container">
      <table class="table table-cover table-bordered">
        <thead>
          <tr>
            <!-- <th>ID</th> -->
            <th>Title</th>
            <!-- <th>Description</th> -->
            <th>Genre</th>
            <th>Artiste</th>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="concert in concerts" :key="concert.id">
            <!-- <td>{{ concert.id }}</td> -->
            <td>{{ concert.title }}</td>
            <!-- <td>{{ concert.description }}</td> -->
            <td>{{ concert.genre }}</td>
            <td>{{ concert.artiste }}</td>
            <td>{{ concert.date }}</td>
            <td>{{ concert.price }}</td>
            <button v-on:click="deleteConcert(concert.id)" class="delete">
              X
            </button>
            <button @click="concertupdated(concert.id)" class="updated">
              Up
            </button>
            <button @click="showconcert(concert.id)" class="show">Show</button>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
//import Modal from './Modal.vue';
import Showconcert from "./Showconcert.vue";
import Addconcerts from "./Addconcerts.vue";
import axios from "axios";
export default {
  name: "Crud",
  data() {
    return {
      concerts: [],
      title: "",
      description: "",
      genre: "",
      artiste: "",
      date: "",
      price: "",
      //id: this.concert.id,
    };
  },
  components: {
    Addconcerts,

    // Showconcert
  },

  async created() {
    try {
      const res = await axios.get("http://localhost:3000/concerts");
      console.log(res);
      this.concerts = res.data;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    gotoCRUDadmin() {
      this.$router.push(`/admin`);
    },
    deleteConcert(id) {
      axios
        .delete("http://localhost:3000/concerts/" + id)
        .then((res) => {
          console.log(id);
          this.concerts.splice(this.concerts.indexOf({ _id: id }), 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // concertUpdated() {
    //   axios
    //     .put("http://localhost:3000/concerts/" + this.id, {
    //       title: this.title,
    //       description: this.description,
    //       genre: this.genre,
    //       artiste: this.artiste,
    //       date: this.date,
    //       price: this.price,
    //     })
    //     .then((res) => {
    //       console.log(res.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    concertupdated(id) {
      console.log(`/concertupdated?id=${id}`);
      this.$router.push(`/concertupdated?id=${id}`);
    },
    showconcert(id) {
      console.log(`/showconcert?id=${id}`);
      this.$router.push(`/showconcert?id=${id}`);
    },
  },
};
</script>

<style>
.delete {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: rebeccapurple;
}
h1 {
  margin-left: 400px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: white;
  text-shadow: 5px 5px rgba(206, 81, 206, 0.712);
}
.table {
  width: 1150px;
  height: auto;
  display: block;
  border-color: black;
  background-color: blanchedalmond;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-left: 10px;
  margin-right: 10px;
}
th {
  border: solid;
  border-color: grey;
}
td {
  border: 1px solid;
  border-color: grey;
  width: 200px;
  height: auto;
}
</style>