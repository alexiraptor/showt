<template>
  <div class="search-form-container">
    <div class="search-form d-flex align-items-center justify-content-between">
      <i class="ml-1 material-icons">artist </i>
      <input
        class="search-input"
        type="text"
        placeholder=" Your band"
        v-model="bandName"
        @keyup="emitter"
      />
      <div
        class="search-form d-flex align-items-center justify-content-between"
      >
        <i class="ml-1 material-icons">genre </i>
        <input
          class="search-input"
          type="text"
          placeholder=" music genre"
          v-model="bandGenre"
          @keyup="emitter"
        />
        <div
          class="search-form d-flex align-items-center justify-content-between"
        >
          <i class="ml-1 material-icons">date </i>
          <input
            class="search-input"
            type="text"
            placeholder=" date"
            v-model="bandDate"
            @keyup="emitter"
          />

          <!-- <div class="separator"></div>
      <select class="select-input" v-model="style" @click="submit">
        <option class="option-text" disabled value="">Your style</option>
        <option v-for="(item, index) in genres" :key="index">{{ item }}</option>
      </select> -->
          <!-- <button @click.prevent="submit" class="search-btn">Search</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",

  data() {
    return {
      bandName: "",
      style: "",
      bandGenre: "",
      bandDate: "",
    };
  },

  methods: {
    emitter() {
      this.$emit("emitter", this.bandName, this.bandGenre, this.bandDate);
      // console.log(this.$emit("band", this.bandName);
      console.log(this.bandName);
      console.log(this.bandGenre);
    },
    // genre() {
    //   this.$emit("genre", this.bandGenre);
    // },

    submit() {
      console.log(this.style);
    },
  },
};
</script>

<style>
.material-icons {
  margin-left: 10px;
}
.search-form-container {
  margin: 0 auto;
  width: 50%;
  padding: 5px;
  background: rgb(138, 26, 160);
  border-radius: 50px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.search-input {
  border: none;
  border-right: 1.5px solid rgba(128, 128, 128, 0.5);
  width: 51%;
  outline: none;
}

.select-input {
  border: none;
  margin-left: 10%;
  width: 50%;
  height: 28px;
  outline: none;
  color: grey;
  font-size: 0.8em;
  letter-spacing: 1px;
}

.material-icons {
  color: rgb(197, 118, 13);
  font-size: 1.3em;
}

.search-input::placeholder {
  font-size: 0.8em;
  letter-spacing: 1px;
}

.search-btn {
  height: 3em;
  width: 40%;
  border-radius: 30px;
  border: none;
  background: rgb(250, 100, 132);
  margin: 1%;
  color: #fff;
  font-weight: 600;
  padding: 0;
  transition-duration: 0.5s;
}

.search-btn:hover {
  color: #fff;
  transform: scale(1.03);
  transition-duration: 0.5s;
}
</style>