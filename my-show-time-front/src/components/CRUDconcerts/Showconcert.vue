<template>
<div>
<h2> SHOW</h2>
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
          <td>{{ concert.title }}</td>
          <td>{{ concert.description }}</td>
          <td>{{ concert.genre }}</td>
          <td>{{ concert.artiste }}</td>
          <td>{{ concert.date }}</td>
          <td>{{ concert.price }}</td>
          <!-- <button @deleteConcert="deleteConcert($event)" class="delete">
            X
          </button>
          <button @ConcertUpdated="concertUpdated" class="update">Up</button> -->
          <!-- <button @click="showconcert()" class="show">show</button> -->
          <router-link to="/crudconcert" >
          <button type="button" class="btn btn-primary">
            Back
          </button>
          </router-link>
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
};
</script>

<style>
h2{
  margin-left: 100px;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  color: #33bdea;
  text-shadow: 2px 2px white;
}
</style>