<template>
  <div class="notification" :class="classes + (visible ? '' : ' hidden')">
    <div class="content">
      <p>{{messageDisplay}}</p>
      <button @click="close()" title="Fermer" class="button_icon"><i class="icon icon_delete"></i></button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Notification',
  props: {
    classes: String,
    message: String,
    time: Number
  },
  data () {
    return {
      visible: '',
      messageDisplay: '',
      defaultTime: 4000
    }
  },
  methods: {
    close(){
      this.visible = false
    },
    display(){
      var self = this
      this.visible = true
      window.setTimeout(function () {
        self.visible = false;
      }, (this.time ? this.time : this.defaultTime))
    }
  },
  watch: {
    message: function (val) {
      if (val !== '') {
        this.messageDisplay = val
        this.display();
      }
    }
  }
}
</script>

<style>
</style>
