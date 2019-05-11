<template>
  <div id="app">
    <button @click="showToastr">Click to show default toastr</button>
    <button @click="showSuccessToastr">Click to show success toastr</button>
    <button @click="showWarningToastr">Click to show warning toastr</button>
    <button @click="showErrorToastr">Click to show error toastr</button>
    <button @click="showInfoToastr">Click to show info toastr</button>
    <Toastr/>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  methods: {
    showToastr() {
      this.$toastr.show("this is some content");
    },
    showSuccessToastr() {
      this.$toastr.success({ content: "bottom-right", position: "bottom-right" });
    },
    showWarningToastr() {
      this.$toastr.warning({ content: "bottom-center", title:"This is title.", position: "bottom-center" });
    },
    showErrorToastr() {
      this.$toastr.error("this is some content");
    },
    showInfoToastr() {
      this.$toastr.info("this is some content");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
