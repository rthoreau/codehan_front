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
html{
  background-color:#151c20;
  color:#8395a0;
  font-size:1.2em;
  height:100%;
}
body{
  height:100%;
  margin:0;
}
*{
  box-sizing:border-box;
}
.full{
  display:block;
  width:100%;   
}
label{
  cursor:pointer;
}
.codeForm{
  width:80%;
  box-shadow:0 0 1em 0.2em #090b0d;
  margin:auto;
  padding:1.5em 5%;
  text-align:left;
}
.input_container{
  position:relative;
  padding:0.5em 0;
  margin-bottom:0.5em;
}
.input_container label{
  display:block;
  margin-bottom:0.6em;
  padding-left:0.2em;
}
input, textarea, select {
  background-color:#0e1316;
  border:none;
  box-shadow:0 0 1em 0.2em #090b0d;
  padding:0.5em 0.8em;
  color:#236c97;
  font-size:1.1em;
  font-family:monospace;
}
textarea{
  resize:vertical;
  min-height:12em;
  max-height:30em;
}
button{
  vertical-align:middle;
  background-color:#236c97;
  border:none;
  height:3em;
  padding: 0 3em;
  box-shadow:0 0 1em 0.2em #090b0d;
  cursor:pointer;
}
.button_icon{
  position:relative;
  width:3em;
  padding:0;
  margin-left:1em;
}
.icon_plus{
  position:relative;
}
.icon_plus:before, .icon_plus:after{
  width:0.3em;
  height:1.5em;
  content:'';
  background-color:#0e1316;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
}
.icon_plus:after{
  height:0.3em;
  width:1.5em;
}
.addLanguageContainer{
  display:inline-block;   
}
.newLanguage{
  margin-left:0.8em;   
}
.addLanguageContainer input{
  padding:0.55em 0.8em;
}
.paramSup{
  padding-bottom:0;
  margin-bottom:0;
}
.paramSup:last-child{
  margin-bottom:3em;   
}
.paramSup input{
  margin-right:1em;   
}
.submit{
  margin-top:3em;   
}
.icon_delete{
  position:relative;
}
.icon_delete:before, .icon_delete:after{
  width:0.3em;
  height:1.8em;
  content:'';
  background-color:#0e1316;
  position:absolute;
  top:50%;
  left:50%;
  transform:rotate(45deg) translate(-50%, -50%);
  transform-origin:top left;
}
.icon_delete:after{
  height:0.3em;
  width:1.8em;
}
.icon_file{
  display:inline-block;
  position:relative;
  border:0.3em solid #0e1316;
  width:2.6em;
  height:1em;
}
.icon_file + .icon_plus{
  right:0.3em;
  top:1.3em;
  position:absolute;
  width:1.4em;
  height:1.4em;
  background-color:#236c97;
  border:0.15em solid #0e1316;
  border-radius:50%;
}
.icon_file + .icon_plus:before{
  height:0.7em;
  width:0.15em;
}
.icon_file + .icon_plus:after{
  width:0.7em;
  height:0.15em;
}

.notification{
  box-sizing:border-box;
  position:fixed;
  bottom:0;
  width:80%;
  max-width:40em;
  left:50%;
  padding:1em 1.5em;
  background-color:#2c3940;
  transition:transform 0.8s;
  transform:translate(-50%,0);
}
.notification.hidden{
  transform:translate(-50%,100%);   
}
.notification button{
  position:absolute;
  right:0.5em;
  top:0.5em;
  font-size:0.5rem;
  box-shadow:none;
  background-color:transparent;
}
.notification p{
  margin:0;   
}
.notification.success{
  background-color:#294d3b;   
}
.checkgen_container{
  position:absolute;
  right:0.4rem;
  top:50%;
  transform:translate(0,-50%);
  width:3.90rem;
  line-height:0;
  font-size:0;
}
.checkgen_container .checkgen + label{
  position:static;
}
.checkgen{
  position:absolute;
  left:-9999rem;
}
.checkgen + label{
  display:inline-block;
  width:1rem;
  height:1rem;
  margin:0.15rem;
  background-color:#151c20;
  position:absolute;
}
.checkgen:checked + label{
  background-color:#0e1316;
}
</style>
