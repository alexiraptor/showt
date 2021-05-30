<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__backdrop" @click="closeModal()" />

      <div class="modal__dialog">
        <div class="modal__header">
          <slot name="header" />
          <button
            type="button"
            class="modal__close"
            @click="closeModal()"
          ></button>
        </div>

        <div class="modal__body">
          <slot name="body" />
          <div class="container">
            <input v-model="email" placeholder="EMAIL" />
            <input type="password" v-model="pwd" placeholder="PASSWORD" />
            <div>{{ errormessage }}</div>
          </div>
          <!-- <button @click="$refs.modalName.DeleteUser()">DELETE</button> -->
        </div>

        <div class="modal__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import api from "../http.js";

export default {
  name: "Modal",
  data() {
    return {
      show: false,
      people: [],
      email: "",
      pwd: "",
      errormessage: "",
    };
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
    },
    DeleteUser() {
      if (![this.email, this.pwd].every(Boolean)) {
        console.log("NULL");
        this.errormessage = "All fields are required !";
      } else {
        api
          .post("", {
            query: `mutation Login { login(email: "${this.email}", password: "${this.pwd}")}`,
          })
          .then((response) => {
            //   console.log(this.pwd);
            //   console.log(this.email);
            //   console.log(response);
            if (response.data.data == null) {
              console.log("ERROR");
              this.errormessage = "Password or Email doesn't match !";
            } else {
              console.log(response);
              var token = response.data.data.login;
              localStorage.setItem("authtoken", token);
              token = localStorage.getItem("authtoken");

              api
                .get("", {
                  params: {
                    query: `query CurrentUser { CurrentUser { _id, firstName, lastName, email } }`,
                  },
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((response) => {
                  console.log(response);
                  this.people = response.data.data.CurrentUser;
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
                      localStorage.removeItem("authtoken");
                      this.$router.push("/register");
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.container {
  color: #ffffff;
  text-align: center;
}

button {
  font-family: "Racing Sans One", sans-serif !important;
  font-size: 15px;
}

input {
  color: black;
  width: 50%;
  text-align: center;
  padding: 12px 20px;
  margin: 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
input::placeholder {
  color: black;
  font-weight: bold;
}
.modal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  &__backdrop {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  &__dialog {
    background-color: #ffffff;
    position: relative;
    width: 600px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    z-index: 2;
    @media screen and (max-width: 992px) {
      width: 90%;
    }
  }
  &__close {
    width: 30px;
    height: 30px;
    background-image: url("https://icon-library.com/images/cancel-icon-png/cancel-icon-png-26.jpg");
    background-size: 100%;
  }
  &__header {
    padding: 20px 20px 10px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__body {
    padding: 10px 20px 10px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  &__footer {
    padding: 10px 20px 20px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#img {
  max-width: 100%;
}
</style>