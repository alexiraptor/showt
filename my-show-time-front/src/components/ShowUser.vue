<template>
  <div class="container">
    <h2 class="title">SHOW USER :</h2>

    <thead>
      <tr>
        <th>ID</th>
        <th>FIRSTNAME</th>
        <th>LASTNAME</th>
        <th>EMAIL</th>
        <!-- <th>PASSWORD</th> -->
        <!-- <th>ROLES</th> -->
        <th>CREATED AT</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ people._id }}</td>
        <td>{{ people.firstName }}</td>
        <td>{{ people.lastName }}</td>
        <td>{{ people.email }}</td>
        <!-- <td>{{ people.password }}</td> -->
        <!-- <td>{{ people.roles }}</td> -->
        <td>{{ people.createdAt }}</td>
        <button v-on:click="deleteUser" class="delete">X</button>
        <!-- <button @ConcertUpdated="concertUpdated" class="update">Up</button> -->
        <!-- <button @click="ShowUser(person._id)" class="show">Show</button> -->
      </tr>
    </tbody>
  </div>
</template>

<script>
import api from "../http.js";

export default {
  name: "ShowUser",
  data() {
    return {
      people: [],
      firstname: "",
      lastname: "",
      email: "",
      new_email: "",
      new_pwd: "",
      pwd: "",
      pwd_confirm: "",
    };
  },
  async mounted() {
    console.log(this.$route);
    console.log(this.$route.fullPath);
    var ID = this.$route.fullPath.slice(14);
    console.log(ID);
    // console.log("PRE MOUNT TOKEN :");
    // console.log(localStorage.getItem("authtoken"));
    var token = localStorage.getItem("authtoken");

    api
      .get("", {
        params: {
          query: `query findOne {
                            findOne(_id: "${ID}") {
                                _id
                                firstName
                                lastName
                                email
                                password
                                createdAt
                                roles
                                }
                            }`,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        // console.log(response.data.data.CurrentUser);
        this.people = response.data.data.findOne;
        console.log(this.people._id);
        // console.log(localStorage.getItem("authtoken"));
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    deleteUser() {
      console.log(this.people);
      console.log("ATTEMPT TO DELETE USER");
      var token = localStorage.getItem("authtoken");
      api
        .post(
          "",
          {
            query: `mutation RemoveUser { removeUser(_id: "${this.people._id}") {_id}}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$router.push("/admin");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  color: #ffffff;
  text-align: center;
  font-family: "Racing Sans One", sans-serif !important;
}

input {
  font-size: 15px;
  color: black;
  width: 15%;
  text-align: center;
  padding: 12px 20px;
  margin: 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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
#createbtn {
  color: black;
  font-weight: bold;
}
a {
  color: #e611e9;
}
button {
  font-family: "Racing Sans One", sans-serif !important;
  font-size: 15px;
}
</style>