<template>
  <div id="app">
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
      }
    },
    created () {
      // 获取相关数据
      this.$store.dispatch('setMessage')
    },
    computed: {

    },
    components: {

    }
  }
</script>

<style lang="less">
  #app {
    padding: 0 1rem;
  }

</style>
