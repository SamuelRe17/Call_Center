import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import eventBus from "src/js/EventEmitter";

let $q;

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      login: {
        username: "andrescall",
        password: "andrescall",
      },
      users: [],
    };
  },
  created() {
    this.loadUsers();
  },
  methods: {
    loadUsers() {
      this.$axios
        .get("http://localhost:3000/loginUsers")
        .then((response) => {
          const listUser = response.data;

          console.log(listUser);
          this.users = listUser;
          // console.log(this.users, "aqui va")
        })
        .catch((error) => {
          console.error("Error al obtener usuarios:", error);
        });
      console.log("Hola");
    },
    async submitForm() {
      // const user1 = 'andrescall'
      const hashedPassword = await this.sha1(this.login.password);
      console.log(this.login.username, "aqui esta la clave");

      const usuarioExistente = this.users.find(
        (usuario) => usuario.user === this.login.username
      );

      if (usuarioExistente) {
        console.log("El usuario existe:", usuarioExistente);
        if (
          this.login.username != usuarioExistente.user ||
          hashedPassword != usuarioExistente.password
        ) {
          $q.notify({
            type: "negative",
            message: "Datos invalidos",
          });
        } else if (this.login.password.length < 6) {
          $q.notify({
            type: "negative",
            message: "necesita mas de 6 digitos.",
          });
        } else {
          // $q.notify({
          //   type: 'positive',
          //   message: 'Acceso'
          // })
          let temporaluser = {
            user: usuarioExistente.user,
            rol: usuarioExistente.id_rol_user,
          };
          eventBus.userAuthenticated = temporaluser;
          this.$router.push("/dashboard");
        }
      } else {
        $q.notify({
          type: "negative",
          message: "El usuario no existe",
        });
      }
    },
    async sha1(input) {
      const msgBuffer = new TextEncoder().encode(input);
      return crypto.subtle.digest("SHA-1", msgBuffer).then((buffer) => {
        const hashArray = Array.from(new Uint8Array(buffer));
        const hashHex = hashArray
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");
        return hashHex;
      });
    },
  },
  mounted() {
    $q = useQuasar();
  },
  setup() {
    return {};
  },
});
