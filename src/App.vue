<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>
<template>
  <div class="container">
<keep-alive>
  <router-view></router-view>
</keep-alive>
  </div>
</template>


<style>
*{
  padding: 0;
  margin: 0;
}

.container{
height:100vh;
}
li{
  list-style: none;
}
</style>
