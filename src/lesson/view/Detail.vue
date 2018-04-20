<template>
  <div class="c-detail">
    <div class="info">
      <p>
        <span>span</span>
      </p>
    </div>
    <button @click="login">LOGIN</button>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    created() {
    },
    methods: {
      login: function() {
        this.wxa.login()
      }
    }
  }
</script>

<style scoped>
  div {color: #333}
  .c-detail .info { color: #f00}
  .c-detail p {color: #0f0}
  .span {color: #00f}
</style>
