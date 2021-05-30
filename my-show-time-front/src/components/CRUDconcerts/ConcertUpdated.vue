<template>
  <div>
    <h2>MODIFICATION</h2>
    <div class="container">
      <table class="table table-cover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Artiste</th>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ concert.id }}</td>
            <td contenteditable @blur="titleChanged">{{ concert.title }}</td>
            <td contenteditable @blur="descChanged">
              {{ concert.description }}
            </td>
            <td contenteditable @blur="genreChanged">{{ concert.genre }}</td>
            <td contenteditable @blur="artisteChanged">{{ concert.artiste }}</td>
            <td contenteditable @blur="dateChanged">{{ concert.date }}</td>
            <td contenteditable @blur="priceChanged">{{ concert.price }}</td>
            <!-- <button @deleteConcert="deleteConcert($event)" class="delete">
            X
          </button>
          <button @ConcertUpdated="concertUpdated" class="update">Up</button> -->
            <!-- <button @click="showconcert()" class="show">show</button> -->
            <router-link to="/crudconcert">
              <button type="button" class="btn btn-primary">Back</button></router-link>
              <button class="btn" v-on:click="SaveUpdate(concert.id)">
                Save
              </button>
            
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Showconcert",
  props: ["id"],
  data() {
    return {
      concert: {},
    };
  },
  created() {
    try {
      axios
        .get(`http://localhost:3000/concerts/${this.$route.query.id}`)
        .then((res) => {
          this.concert = res.data;
        })
        .catch((e) => {
          console.log(e.message);
        });
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    SaveUpdate(id) {
      console.log("HEY");
      //var token =localStorage.getItem("authtoken")
      axios
        .patch(
          "http://localhost:3000/concerts/" + id,
          {
            title: `${this.concert.title}`,
            description: `${this.concert.description}`,
            genre: `${this.concert.genre}`,
            artiste: `${this.concert.artiste}`,
            date: `${this.concert.date}`,
            price: `${this.concert.price}`,

          }  
        )
        .then((res) => {
          console.log(res.data);
          console.log("HO");
        })
        .catch((error) => {
          console.log("AH");
          console.log(error.message);
        });
      console.log("HE");
    },
    titleChanged($event) {
      this.concert.title = $event.target.innerText;
      //this.$emit("ConcertUpdated", this.concert);
    },
    descChanged($event) {
      this.concert.description = $event.target.innerText;
      //this.$emit("ConcertUpdated", this.concert);
    },
    genreChanged($event) {
      this.concert.genre = $event.target.innerText;
      //this.$emit("ConcertUpdated", this.concert);
    },
    artisteChanged($event) {
      this.concert.artiste = $event.target.innerText;
      //this.$emit("ConcertUpdated", this.concert);
    },
    dateChanged($event) {
      this.concert.date = $event.target.innerText;
      //this.$emit("ConcertUpdated", this.concert);
    },
    priceChanged($event) {
      this.concert.price = $event.target.innerText;
      //this.$emit("ConcertUpdated", this.concert);
    },
  },
};
</script>

<style lang="scss">
h2 {
  margin-left: 100px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: #33bdea;
  text-shadow: 2px 2px white;
}
</style>