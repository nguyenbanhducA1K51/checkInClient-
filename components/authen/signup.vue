<template>
  <div className="signup">
    <form ref="{formContent}" action="">
      <div class="container">
        <h1 class="lab">Sign Up</h1>
        <p class="lab">Please fill in this form to create an account.</p>
        <hr />
        <div>
          <label htmlFor="email" class="lab"><b>Email</b></label>
          <input
            class="ip"
            v-model="email"
            id="emailSignup"
            type="text"
            placeholder="Enter Email"
            name="email"
            required
          />
        </div>

        <label htmlFor="psw" class="lab"><b>Password</b></label>
        <input
          class="ip"
          v-model="password"
          id="passwordSignup"
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        />

        <label htmlFor="psw-repeat" class="lab"><b>Repeat Password</b></label>
        <input
          class="ip"
          v-model="repeatpassword"
          id="passwordrepeat"
          type="password"
          placeholder="Repeat Password"
          name="psw-repeat"
          required
        />

        <p id="text-warning p-2" class="lab">{{ error }}</p>

        <p class="lab">
          By creating an account you agree to our erms & Privacy.
        </p>

        <div class="clearfix">
          <button @click="showLogin" type="button" class="loginbtn">
            Login
          </button>
          <button @click="submit" type="button" class="signupbtn">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "v-signup",
  data() {
    return {
      email: "",
      password: "",
      repeatpassword: "",
      error: "",
    };
  },
  methods: {
    async submit() {
      if (!this.emailIsValid()) {
        this.error = "email is not valid";
      } else if (!this.passwordIsValid) {
        this.error = "password does not match";
      } else {
        const options = {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        };
        try {
          const rawtoken = await fetch(
            `https://gscheck-in-server.herokuapp.com/user/signup`,
            options
          );
          const res = await rawtoken.json();
          if (!res.success) {
            console.log("fail");
            this.error = res.error;
            console.log(res);
          } else {
            this.error = "";
            alert("create new account successfully");
            console.log(res.token);
            this.$bus.emit("showLogIn");
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    passwordIsValid() {
      if (this.repeatpassword !== this.password) {
        return false;
      }
      return true;
    },
    emailIsValid() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    },
    showLogin() {
      this.$bus.emit("showLogIn", true);
    },
  },
};
</script>
<style>
.signup * {
  box-sizing: border-box;
  margin-left: 10px;
}

/* Full-width input fields */
.lab {
  margin-left: 10px;
}
.ip {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 10px;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

.ip:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

.signup hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}
/* 
Set a style for all buttons
.signup button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
} */

.signup button:hover {
  opacity: 1;
}

/* Extra styles for the cancel button */
/* .signup .cancelbtn {
  padding: 14px 20px;
  background-color: #cbe13a;
} */

.signup .container {
  padding: 16px;
}

/* Clear floats */
.signup .clearfix::after {
  content: "";
  clear: both;
  display: table;
}
.clearfix {
  display: flex;
}
.signupbtn {
  background-color: #23e156;
  color: white;
  padding: 14px 20px;
  margin: 8px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}
.loginbtn {
  background-color: #23e1bb;
  color: white;
  padding: 14px 20px;
  margin: 8px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}
</style>
