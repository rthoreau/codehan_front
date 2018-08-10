<template>
  <div id="a_" class="a_ overlay" :class="amode + visibleClass">
    <div class="a_ content">
      <div id="a_content">{{message}}</div>
      <div class="actions">
        <button ref="a_ok" class="ok" @click="a_action(true)">Ok</button>
        <button class="cancel" @click="a_action(false)">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Alert',
  props: {
    amessage: String,
    amode: String
  },
  data () {
    return {
      message: '',
      visibleClass: ''
    }
  },
  methods: {
    a_show(){
      var self = this;
      this.visibleClass = ' visible';
      document.activeElement.blur();
      this.$nextTick(function() {
        self.$refs.a_ok.focus();
      });
    },
    a_action(response) {
      this.visibleClass = '';
      this.$emit('alertResponse', response)
    }
  },
  watch: {
    amessage: function (val) {
      if (val !== '') {
        this.message = val;
        this.a_show();
      }
    }
  }
}
</script>

<style>
.a_.overlay {
	display:none;
	position:fixed;
	top:0;
	left:0;
	bottom:0;
	right:0;
	background: radial-gradient(farthest-corner at  50% 33%,rgba(52, 52, 62, .18), rgba(0, 0, 0, .46));
}
.a_.overlay.visible{
  display:block;
}
.a_.content{
	position:absolute;
	background-color:#fff;
	border-radius:2px;
	top:25%;
	left:50%;
	transform:translate(-50%,-25%);
	width:300px;
	min-height:100px;
	text-align:left;
	box-sizing:border-box;
	padding:20px 20px 45px;
}
.a_ .actions {
	position:absolute;
	left:50%;
	bottom:15px;
	right:20px;
	text-align:right;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-o-user-select: none;
	user-select: none;
}
.a_ .actions button{
	padding:3px 12px;
	margin:0 3px;
	border:1px solid #d3d3d3;
	box-shadow:none;
	background:white;
	-webkit-appearance:none;
}
.a_ .actions button.ok{
	background-color:#5092ff;
	color:white;
	border-color:#8ea4c0;
}
.cancel{
	display:none;
}
.a_.confirm .cancel{
	display:inline-block;
}
</style>
