<template>
  <div class="login-page">
    <div class="form-box">
      <form @submit.prevent="submitForm">

        <label>Email:</label>
        <input v-model="email" type="email" required />

        <label>Password:</label>
        <input v-model="password" type="password" @input="checkPassword" required />

        <div v-if="errors.length > 0" class="error-box">
          <p>The password is not valid:</p>
          <div>
            <p v-for="err in errors">{{ err }}</p>
          </div>
        </div>

        <button :disabled="errors.length > 0">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    checkPassword() {
      const p = this.password;
      const err = [];

      if (p.length < 8 || p.length > 15) err.push("- Must be 8–15 characters");
      if (!/^[A-Z]/.test(p)) err.push("- Must start with an uppercase letter");
      if (!/[A-Z]/.test(p)) err.push("- Needs at least 1 uppercase letter");
      if ((p.match(/[a-z]/g) || []).length < 2) err.push("- Needs at least 2 lowercase letters");
      if (!/[0-9]/.test(p)) err.push("- Needs at least 1 number");
      if (!/_/.test(p)) err.push("- Must include '_'");

      this.errors = err;
    },
    submitForm() {
      this.$router.push({ name: "Main" });
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  width: 100%;
  background-color: #f0f0f0;
}

.form-box {
  background: #fff;
  padding: 30px 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 350px;
}

label {
  display: block;
  margin-top: 15px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #999;
  cursor: not-allowed;
}

.error-box {
  background: #ffdddd;
  border-left: 4px solid red;
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
}
</style>
