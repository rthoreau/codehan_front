<template>
  <div id="app">
    <CodeForm />
  </div>
</template>

<script>
import CodeForm from './components/CodeForm'

export default {
  name: 'app',
  components: {
    CodeForm
  }
}
</script>

<style>
#app {
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 60px;
}
</style>
