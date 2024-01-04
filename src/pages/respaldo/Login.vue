<template>
  <img src="~assets/wave.png" class="wave">

  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-6 flex justify-center content-center">
      <img src="~assets/Wavy.png" class="responsive" alt="login-image">
    </div>
    <div v-bind:class="{ 'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs }"
      class="col-12 col-md-6 flex content-center">
      <q-card v-bind:style="$q.screen.lt.sm ? { 'width': '80%' } : { 'width': '50%' }">
        <q-card-section>
          <q-avatar size="105px" class="absolute-center shadow-10">
            <img src="~assets/kradac.png" alt="avatar">
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h3 text-uppercase q-my-none text-weight-regular text-primary">Login</h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="submitForm">
            <q-input label="Username" v-model="login.username">
            </q-input>
            <q-input label="Password" type="password" v-model="login.password">
            </q-input>
            <div>
              <q-btn class="full-width" color="primary" label="Login" type="submit" rounded></q-btn>
              <div class="text-center q-mt-sm q-gutter-lg">
                <router-link class="text-white" to="/login">Olvidaste la contraseña?</router-link>
                <router-link class="text-white" to="/login">Crear cuenta</router-link>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import eventBus from '../../js/EventEmitter';

let $q

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      login: {
        username: 'andrescall',
        password: 'andrescall'
      },
      users: []
    }
  },
  created() {
    this.loadUsers();

  },
  methods: {
    loadUsers() {
      this.$axios.get('http://localhost:3000/loginUsers')
        .then(response => {
          const listUser = response.data;

          console.log(listUser)
          this.users = listUser
          // console.log(this.users, "aqui va")



        })
        .catch(error => {
          console.error('Error al obtener usuarios:', error);
        });
      console.log("Hola")
    },
    async submitForm() {
      // const user1 = 'andrescall'
      const hashedPassword = await this.sha1(this.login.password);
      console.log(this.login.username, "aqui esta la clave")

      const usuarioExistente = this.users.find(usuario => usuario.user === this.login.username);

      if (usuarioExistente) {

        console.log('El usuario existe:', usuarioExistente);
        if (this.login.username != usuarioExistente.user || hashedPassword != usuarioExistente.password) {
          $q.notify({
            type: 'negative',
            message: 'Datos invalidos'
          })
        } else if (this.login.password.length < 6) {
          $q.notify({
            type: 'negative',
            message: 'necesita mas de 6 digitos.'
          })

        } else {
          // $q.notify({
          //   type: 'positive',
          //   message: 'Acceso'
          // })
          let temporaluser = {
            user: usuarioExistente.user,
            rol: usuarioExistente.id_rol_user
          }
          eventBus.userAuthenticated = temporaluser;
          this.$router.push('/bank');
        }
      } else {
        $q.notify({
          type: 'negative',
          message: 'El usuario no existe'
        })
      }

    },
    async sha1(input) {
      const msgBuffer = new TextEncoder().encode(input);
      return crypto.subtle.digest('SHA-1', msgBuffer)
        .then(buffer => {
          const hashArray = Array.from(new Uint8Array(buffer));
          const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
          return hashHex;
        });
    }
  },
  mounted() {
    $q = useQuasar()
  },
  setup() {
    return {

    }
  }

})
</script>
<style  scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>>

