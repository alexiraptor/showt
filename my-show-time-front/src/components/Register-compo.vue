<template>
  <div class="container">
    <h2 class="title">Register :</h2>
    <p>Please fill in this form to create an account.</p>

    <input v-model="firstname" placeholder="FIRSTNAME" />

    <input v-model="lastname" placeholder="LASTNAME" />

    <input v-model="email" placeholder="EMAIL" />

    <input type="password" v-model="pwd" placeholder="PASSWORD" />

    <input
      type="password"
      v-model="pwd_confirm"
      placeholder="CONFIRM PASSWORD"
    />
    <button type="button" class="btn" id="createbtn" v-on:click="createUser">
      CREATE
    </button>

    <h2>{{ errormessage }}</h2>

    <router-link to="login">Already have an account ?</router-link>
  </div>
</template>

<script>
import api from "../http.js";

export default {
  name: "Register",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      pwd: "",
      pwd_confirm: "",
      errormessage: "",
    };
  },

  methods: {
    createUser() {
      if (
        ![
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
              console.log(response.data.data);
              if (response.data.data == null) {
                console.log("THIS EMAIL IS ALREADY TAKEN");
                this.errormessage = "THIS EMAIL IS ALREADY TAKEN";
              } else {
                this.$router.push("/login");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.errormessage = "Password and confirmation doesn't match !";
        }
      }
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
  font-family: "Racing Sans One", sans-serif !important;
  font-size: 15px;
}
a {
  color: #e611e9;
}
</style>