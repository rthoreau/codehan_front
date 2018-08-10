<template>
  <div class="codeForm">
    <form v-on:submit.prevent>
      <div class="input_container">
        <label for="title">Titre *</label>
        <input type="text" id="title" v-model="title" class="full" autocomplete="off" required>
      </div>
      <div class="input_container">
        <label for="content">Contenu *</label>
        <textarea id="content" v-model="content" class="full" spellcheck="false" required></textarea>
      </div>
      <div class="input_container">
        <label for="language">Langage</label>
        <select v-model="language" id="language">
          <option :value="lang.id_language" v-for="lang in languages" :key="lang.id_language">{{lang.name}}</option>
        </select>
        <div class="addLanguageContainer" v-if="addLanguageVisible">
          <input type="text" v-model="newLanguage" class="newLanguage" v-on:keyup.enter="addLanguage()" placeholder="Nom" autocomplete="off">
        </div>
        <button @click="addLanguage()" title="Ajouter un langage" class="button_icon"><i class="icon" :class="addLanguageVisible && newLanguage === '' ? 'icon_delete' : 'icon_plus'"></i></button>
      </div>
      <label for="paramName">Paramètres supplémentaires</label>
      <div class="input_container paramSup" v-for="(param, index) in params" :key="index" v-if="param !== undefined">
        <input type="text" id="paramName" v-model="param.name" @input="addParam(param, index)" placeholder="Nom">
        <input type="text" v-model="param.value" @input="addParam(param, index)" placeholder="Valeur" autocomplete="off">
        <button @click="copyParam(index)" v-if="param.name || param.value" title="Copier" class="button_icon"><i class="icon_file"></i><i class="icon icon_plus"></i></button>
        <button @click="deleteParam(index)" v-if="param.name || param.value || index !== params.length -1" title="Supprimer" class="button_icon"><i class="icon icon_delete"></i></button>
      </div>
      <button @click="validSubmit()" class="submit">Créer</button>
      <Alert :amessage="a_message" :amode="a_mode" @alertResponse="a_response"/>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Alert from './Alert'

export default {
  name: 'CodeForm',
  components: {
    Alert
  },
  data () {
    return {
      addLanguageVisible: false,
      initLanguages: [
        {id_language: 1, name: 'CSS'},
        {id_language: 2, name: 'JS'},
        {id_language: 3, name: 'PHP'},
        {id_language: 4, name: 'JSON'}
      ],
      languages: '',
      params: [{name: 'Yay', value: 'Dude'}, {name: '', value: ''}],
      title: 'testseg',
      content: 'egerge rgoiehrgoiehrgi ohreog heorigheoi rgheoirghoeir ghioer hgioeh oiherogiheoirgheirgheirhoi ehrgoeh oieh rogiheroigh aozdhoa hdoah oiahzdhaoizhd oiahzdiohao haoid oazh oadoa hoahoazhda zihd',
      language: 0,
      newLanguage: '',
      submitObject:false,
      a_message: '',
      a_mode: '',
      a_response: ''
    }
  },
  methods: {
    addParam (param, index) {
      if ((param.name !== '' || param.value !== '') && index === this.params.length -1) {
        this.params.push({name: '', value: ''});
      }
    },
    copyParam (copyIndex) {
      let savedParam = false;
      let tempParam = '';
      this.params = this.params.map(function (param, index) {
        if (index === copyIndex) {
          savedParam = param
        } else if (savedParam) {
          tempParam = savedParam
          savedParam = param
          return tempParam
        }
        return param;
      });
      this.params.push({name: '', value: ''});
    },
    deleteParam (deleteIndex) {
      this.params = this.params.map(function (param, index) {
        if (index !== deleteIndex) {
          return param;
        } 
      });
      this.params = this.params.filter(param => param !== undefined);
    },
    validSubmit () {
      if (!this.title || !this.content) {
        this.a_alert('Il faut un titre et un contenu !', 'confirm', function () {return;});
        return false;
      }
      this.submitData(true)
    },
    submitData (valid) {
      if (!valid) {
        return;
      }
      this.doSubmitObject();
      var self = this;
      axios.post(
        'http://localhost/codehanback/xmlhttp.php', 
        self.submitObject
      )
      .then(function (response) {
        console.log(response);
        return;
        var data = response.data;
        if (response.data.id) {
          self.$session.set('user_id', data.id)
          self.$session.set('admin', data.admin)
          self.$session.set('nom', data.nom)
          self.$session.set('prenom', data.prenom)
          self.$session.set('mail', data.mail)
          self.$emit('session');
        } else {
          alert(data.erreur)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    addLanguage () {
      let self = this;
      if (!this.addLanguageVisible) {
        this.addLanguageVisible = true;
        return;
      }
      let nextId = this.languages.filter(function (lang, index) {
        if (index === self.languages.length -1) {
          return lang;
        }
      })[0].id_language + 1;
      if (this.newLanguage && this.newLanguage.indexOf(this.languages) < 0) {
        this.languages.push({id_language: nextId, name: this.newLanguage});
        this.language = nextId;
      }
      this.newLanguage = '';
      this.addLanguageVisible = false;
    },
    doSubmitObject() {
      let object = {
        operation: 'save_code',
        title: this.title,
        content: this.content,
        language: this.language,
      };
      object.params = this.params.filter(param => param.name !== '' || param.value !== '');
      let existingLanguages = [];
      this.initLanguages.map(function (lang) {
        existingLanguages.push(lang.id_language)
      });
      object.newLanguages = this.languages.filter(function (lang) {
        if (!existingLanguages.includes(lang.id_language)){
          return lang;
        }
      });
      this.submitObject = object;
    },
    a_alert(a_message, a_mode, a_response) {
      this.a_message = a_message
      this.a_mode = a_mode
      this.a_response = a_response
      var self = this;
      this.$nextTick(function () {
        self.a_message = '';
      })
    }
  },
  mounted () {
    //clone
    this.languages = this.initLanguages.slice(0);
    this.language = this.languages[0].id_language;
  }
}
</script>

<style>

</style>
