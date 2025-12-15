<template>
  <div class="contacts-page">
    <div class="box">
      <h2>Contacts</h2>
      <p><b>Email:</b> example@ut.ee</p>
      <p><b>Phone:</b> +372 0000 0000</p>
    </div>
  </div>
</template>

<script>
export default { name: "ContactsPage" };
</script>

<style scoped>
.contacts-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  width: 100%;
  background-color: #f0f0f0;
}
.box {
  background: #fff;
  padding: 30px 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 350px;
}
</style>
