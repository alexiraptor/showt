<template>
  <div>
    <div class="crud text-center">
      <Admin />
    </div>
  </div>
</template>

<script>
import Admin from "../components/Crudallusers.vue";

export default {
  components: { Admin },

  async mounted() {
    // console.log(localStorage.getItem("admintoken"));
    if (localStorage.getItem("admintoken") != null) {
      console.log("ADMIN");
    } else {
      console.log("NOT ADMIN");
      this.$router.push("/myspace");
    }
  },
};
</script>

<style>
.container {
  color: #ffffff;
  text-align: center;
  font-family: "Racing Sans One", sans-serif !important;
}

input::placeholder {
  color: black;
  font-weight: bold;
}
.title {
  font-size: 40px;
  font-family: "Racing Sans One", sans-serif !important;
}
button {
  font-family: "Racing Sans One", sans-serif !important;
  font-size: 15px;
}
.delete {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: rebeccapurple;
}
h2 {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: white;
  text-shadow: 5px 5px rgba(206, 81, 206, 0.712);
}
table {
  width: auto;
  color: black;
  height: auto;
  display: block;
  border-color: black;
  background-color: blanchedalmond;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
}
th {
  border: solid;
  border-color: grey;
  text-align: center;
}
td {
  border: 1px solid;
  border-color: grey;
  width: 200px;
  height: auto;
  text-align: center;
}
input {
  border: 1px solid;
  border-color: grey;
  width: 150px;
  height: auto;
  text-align: center;
}
</style>