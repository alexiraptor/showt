<template>
  <main>
    <div class="container">
      <button
        type="button"
        class="btn"
        id="CRUDconcert"
        v-on:click="gotoCRUDconcert"
      >
        CRUD CONCERTS
      </button>
      <!-- <button
        type="button"
        class="btn"
        id="CRUDadmin"
        v-on:click="gotoCRUDadmin"
      >
        CRUD USERS
      </button> -->
      <table class="table table-cover table-bordered">
        <h2 class="title">REGISTERED USERS :</h2>
        <thead>
          <tr>
            <th>ID</th>
            <th>FIRSTNAME</th>
            <th>LASTNAME</th>
            <th>EMAIL</th>
            <th>CREATED AT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in people" :key="person._id">
            <td>{{ person._id }}</td>
            <td>{{ person.firstName }}</td>
            <td>{{ person.lastName }}</td>
            <td>{{ person.email }}</td>
            <td>{{ person.createdAt }}</td>
            <!-- <button v-on:click="ShowUser" class="delete">X</button> -->
            <!-- <button @ConcertUpdated="concertUpdated" class="update">Up</button> -->
            <button @click="ShowUser(person._id)" class="show">Show</button>
          </tr>
        </tbody>
        <h2 class="title">ADD USER :</h2>
        <div>{{ errormessage }}</div>
        <div>
          <input v-model="firstname" placeholder="FIRSTNAME" />
          <input v-model="lastname" placeholder="LASTNAME" />
          <input v-model="email" placeholder="EMAIL" />
          <input v-model="pwd" placeholder="PASSWORD" />
          <input v-model="pwd_confirm" placeholder="CONFIRM PASSWORD" />
          <button type="button" class="btn" id="create" v-on:click="createUser">
            CREATE
          </button>
          <!-- <button type="button" class="btn" id="create" v-on:click="updateUser">
            UPDATE
          </button> -->
        </div>
      </table>
    </div>
  </main>
</template>

<script>
import api from "../http.js";

export default {
  name: "Admin",
  data() {
    return {
      people: [],
      firstname: "",
      lastname: "",
      email: "",
      // new_email: "",
      // new_pwd: "",
      pwd: "",
      pwd_confirm: "",
      errormessage: "",
    };
  },
  async mounted() {
    console.log("ATTEMPT TO LOAD USERS");
    var token = localStorage.getItem("authtoken");

    api
      .get("", {
        params: {
          query: `query FindAll { findAllUsers { _id, firstName, lastName, email, createdAt } }`,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        this.people = response.data.data.findAllUsers;
        // console.log(this.people);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    gotoCRUDconcert() {
      this.$router.push(`/crudconcert`);
    },
    // gotoCRUDadmin() {
    //   this.$router.push(`/admin`);
    // },
    ShowUser(_id) {
      // console.log(this._id);
      // console.log(this.people._id);
      console.log(`/showuser?_id=${_id}`);
      this.$router.push(`/showuser?_id=${_id}`);
    },

    updateUser() {
      console.log("ATTEMPT TO UPDATE USER");
    },

    createUser() {
      console.log("ATTEMPT TO CREATE USER");
      if (
        ![
          // this._id,
          this.firstname,
          this.lastname,
          this.email,
          this.pwd,
          this.pwd_confirm,
        ].every(Boolean)
      ) {
        console.log("NULL");
        this.errormessage = "All fields are required !";
      } else {
        if (this.pwd == this.pwd_confirm) {
          console.log("PWD MATCHES");

          console.log("ATTEMPT TO CREATE USER");

          api
            .post("", {
              query: `
                mutation Create {
                    createUser(createUserInput: {
                    firstName: "${this.firstname}"
                    lastName: "${this.lastname}"
                    email: "${this.email}"
                    password: "${this.pwd}"
                    }) {
                    _id
                    firstName
                    email
                    password
                    createdAt
                    roles
                    }
                    }`,
            })
            .then((response) => {
              console.log(response);
              console.log("ATTEMPT TO LOAD USERS");
              var token = localStorage.getItem("authtoken");

              api
                .get("", {
                  params: {
                    query: `query FindAll { findAllUsers { _id, firstName, lastName, email, createdAt } }`,
                  },
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((response) => {
                  console.log(response);
                  this.people = response.data.data.findAllUsers;
                  // console.log(this.people);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.errormessage = "Password and confirmation doesn't match !";
        }
      }
    },

    // loginUser() {
    //   console.log("ATTEMPT TO LOGIN");

    //   api
    //     .post("", {
    //       query: `mutation Login { login(email: "ulysse@gmail.com", password: "tomtom")}`,
    //     })
    //     .then((response) => {
    //       // console.log(response.data.data.login);
    //       var token = response.data.data.login;
    //       console.log(response);
    //       localStorage.setItem("authtoken", token);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
  },
};
</script>

<style scoped>
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
</style>