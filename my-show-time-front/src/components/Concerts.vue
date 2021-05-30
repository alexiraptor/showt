<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div class="tc-notes-wrapper">
        <div class="concerts" @emitter="emitters">
          <SearchBar @emitter="emitters" />
          <div class="adminbtn">
            <button
              type="button"
              class="btn"
              id="CRUDconcert"
              v-on:click="gotoCRUDconcert"
            >
              CRUD CONCERTS
            </button>
            <button
              type="button"
              class="btn"
              id="CRUDadmin"
              v-on:click="gotoCRUDadmin"
            >
              CRUD USERS
            </button>
            <button
              type="button"
              class="btn"
              id="myspace"
              v-on:click="gotoMyspace"
            >
              PERSONAL SPACE
            </button>
          </div>
          <div class="concerts-wrapper" @emitter="emitters">
            <div class="tc-notes">
              <Concert
                v-for="concert in filteredConcerts"
                v-bind:concert="concert"
                v-bind:key="concert.key"
                @emitter="emitters"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Concert from "./Concert.vue";
import SearchBar from "./SearchBar.vue";

export default {
  name: "Concerts",
  components: { Concert, SearchBar },
  data() {
    return {
      concerts: [],
      filteredConcerts: [],
    };
  },
  async created() {
    try {
      const res = await axios.get("http://localhost:3000/concerts");
      console.log(res);
      console.log(res.data);
      this.concerts = res.data;
      this.filteredConcerts = res.data;
    } catch (e) {
      console.error(e);
    }
    if (localStorage.getItem("authtoken") != null) {
      console.log("LOGGED");
    } else {
      console.log("NOT LOGGED");
    }

    var A = document.getElementById("CRUDconcert");
    var B = document.getElementById("CRUDadmin");
    var C = document.getElementById("myspace");
    // console.log(A + B);
    if (localStorage.getItem("admintoken")) {
      // A.style.display = "block";
      // B.style.display = "block";
    } else {
      A.style.display = "none";
      B.style.display = "none";
    }

    if (localStorage.getItem("authtoken")) {
      // C.style.display = "block";
    } else {
      C.style.display = "none";
    }
  },

  methods: {
    gotoMyspace() {
      this.$router.push(`/myspace`);
    },
    gotoCRUDconcert() {
      this.$router.push(`/crudconcert`);
    },
    gotoCRUDadmin() {
      this.$router.push(`/admin`);
    },
    emitters(bandName, bandGenre, bandDate) {
      if (bandName == "" && bandGenre == "" && bandDate == "") {
        console.log("normalement rien");
        this.filteredConcerts = this.concerts;
      } else if (bandName && bandGenre == "" && bandDate == "") {
        console.log("bandnameee");
        this.filteredConcerts = this.concerts.filter((c) =>
          c.artiste.toLowerCase().includes(bandName.toLowerCase())
        );
      } else if (bandName == "" && bandGenre && bandDate == "") {
        console.log("bandgenreeee");
        this.filteredConcerts = this.concerts.filter((c) =>
          c.genre.toLowerCase().includes(bandGenre.toLowerCase())
        );
      } else if (bandName == "" && bandGenre == "" && bandDate) {
        console.log("bandate");
        this.filteredConcerts = this.concerts.filter((c) =>
          c.date.toLowerCase().includes(bandDate.toLowerCase())
        );
      } else if (bandName && bandGenre && bandDate == "") {
        console.log("bandname et bandgenre");
        this.filteredConcerts = this.concerts
          .filter((c) =>
            c.genre.toLowerCase().includes(bandGenre.toLowerCase())
          )
          .filter((c) =>
            c.artiste.toLowerCase().includes(bandName.toLowerCase())
          );
      } else if (bandName && bandGenre == "" && bandDate) {
        console.log("bandname et bandate");
        this.filteredConcerts = this.concerts
          .filter((c) => c.date.toLowerCase().includes(bandDate.toLowerCase()))
          .filter((c) =>
            c.artiste.toLowerCase().includes(bandName.toLowerCase())
          );
      } else if (bandName == "" && bandGenre && bandDate) {
        console.log("bandgenre et bandate");
        this.filteredConcerts = this.concerts
          .filter((c) => c.date.toLowerCase().includes(bandDate.toLowerCase()))
          .filter((c) =>
            c.genre.toLowerCase().includes(bandGenre.toLowerCase())
          );
      } else {
        console.log("bandnameeee et bandgenreeee et banddate");
        this.filteredConcerts = this.concerts
          .filter((c) =>
            c.genre.toLowerCase().includes(bandGenre.toLowerCase())
          )
          .filter((c) =>
            c.artiste.toLowerCase().includes(bandName.toLowerCase())
          )
          .filter((c) => c.date.toLowerCase().includes(bandDate.toLowerCase()));
      }
    },
    watch(value) {
      this.concerts = value;
    },
  },
};
</script>
<style scoped>
.concerts {
  /* background: rgb(77, 74, 74); */
  margin-top: 100px;
}
.concerts-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
</style>





<style scoped>
</style>