import { defineComponent, ref } from "vue";
import clientview from "src/pages/client/clientview.vue";
import EssentialLink from "components/EssentialLink.vue";
import openModal from "src/pages/client/clientview.vue";
import moment from "moment";
let $q;
import { useQuasar } from "quasar";
import { closeSocket } from "src/js/socket";
const linksList = [
  {
    title: "Clientes",
    caption: "quasar.dev",
    icon: "school",
    data: [
      {      element: "Agregar",
      action: () => {
        this.$refs.clientView.openModal(); 
        this.leftDrawerOpen = false; 
      }, },
      { element: "Editar", url: "https://youtube.com" },
    ],
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "SidebarLayout",
  data() {
    return {
      horas: 0,
      minutos: 0,
      segundos: 0,
      contenidoClases: "mi-clase-contenido", // Clases personalizadas para el contenido
      superposicionClases: "mi-clase-superposicion",
    };
  },
  components: {
    EssentialLink,
    clientview,
    openModal,
    
    
  },
  created() {},
  mounted() {
    setInterval(() => this.setTiempo(), 1000), ($q = useQuasar());
    const miDrawer = this.$refs.miDrawer;
    const aside1 = miDrawer.$el.querySelector("aside");

    if (aside1) {
      // Modificar clases o agregar un ID
      aside1.id = "mi-id-unico";
    }
  },
  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    function dateFormat() {
      const date = new Date();
      moment.locale("es");

      return moment(date).format(`dddd, DD [de] MMMM [de] YYYY`);
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      dateFormat,
     
    };
  },
  methods: {
    logout() {
      closeSocket();
      this.$router.push("/");
    },
    setTiempo() {
      const date = new Date();
      let horas = date.getHours();
      let minutos = date.getMinutes();
      let segundos = date.getSeconds();
      horas = horas <= 9 ? `${horas}`.padStart(2, 0) : horas;
      minutos = minutos <= 9 ? `${minutos}`.padStart(2, 0) : minutos;
      segundos = segundos <= 9 ? `${segundos}`.padStart(2, 0) : segundos;
      this.horas = horas;
      this.minutos = minutos;
      this.segundos = segundos;
    },
    openModal(element) {
      if (element === "Agregar") {
        this.$refs.clientView.openModal();
      }
    },
    toggleLeftDrawer() {
      // const v1 = ref(document.querySelector("aside"));

      // v1.value.classList.add("hola");
      // console.log(v1.value);
      this.leftDrawerOpen = !this.leftDrawerOpen;
      // leftDrawerOpen.value = !leftDrawerOpen.value;
    },
  },
});
