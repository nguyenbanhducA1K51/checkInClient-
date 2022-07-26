 <!-- @loginSuccessful="passLogin" -->
<template>
  <div>
    <Login v-if="isVisible.login" />
    <Signup
      v-if="isVisible.signup"
     
    />
  </div>
</template>
<script>
import Login from "./login";
import Signup from "./signup.vue";
export default {
  name: "v-authen",
  data() {
    return {
      isVisible: {
        login: true,
        signup: false,
      },
    };
  },
  created() {
    this.$bus.on("showSignUp", () => {
      this.isVisible.login = false;
      this.isVisible.signup = true;
    });
     this.$bus.on("showLogIn", () => {
      this.isVisible.login = true;
      this.isVisible.signup = false;
    });
  },
  methods: {},
  components: {
    Login,
    Signup,
  },
};
</script>
<style></style>
