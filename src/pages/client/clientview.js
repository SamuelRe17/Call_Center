import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import Mapa from "components/Mapa.vue";


const columns = [
  {
    name: "id",
    required: true,
    label: "Código",
    align: "center",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "phone",
    align: "center",
    label: "Teléfono",
    field: "phone",
    sortable: true,
  },
  { name: "person", align:"center", label: "Nombres", field: "person", sortable: true },
];
const rows = ref([]);
const rowsAsignacion = ref([]);

const cliente = [
  {
    id: 18,
    person: "Samuel Reyes",
    phone: "1234",
    num_casa: "312-12",
    address: "Rodriguez Witt",
    barrio: "",
    correo: "user1@gmail.com",
    referencia: "porton negro",
    corporativo: true,
    latitud: "",
    longitud: "",
    lastname: "",
    codigo_voucher: "",
    enviado_servidor: "",
    confiabilidad_gps: "",
  },
  {
    id: 32,
    person: "Pablo Malla",
    phone: "456",
    num_casa: "071-23",
    address: "Argentina y Brazil",
    barrio: "San pedro",
    correo: "user2@gmail.com",
    referencia: "Frente al parque",
    corporativo: false,
    latitud: "",
    longitud: "",
    lastname: "",
    codigo_voucher: "",
    enviado_servidor: "",
    confiabilidad_gps: "",
  },
];

export default defineComponent({
  name: "ClientView",
  data() {
    return {
      filter: ref(''),
      editing: false,
      rowsAsignacion: [],
      modalVisible: false,
      mostrarMapaBoll: false,
      mostrarBoton: true,
      botonG: true,
      isEditing: false,
      selectedRow: null,

      user: ref({
        id: null,
        person: "",
        phone: "",
        num_casa: "",

        barrio: "",
        correo: "",
        referencia: "",
        corporativo: false,
        address: "",

        latitud: "",
        longitud: "",
        lastname: "",
        codigo_voucher: "",
        enviado_servidor: "",
        confiabilidad_gps: "",
      }),
      combinedData: ref([]),

      latitud: null,
      longitud: null,
      
      mostrarMapaToggle: false,
      code: null,
      usuarioAutenticado: null,
      hora_asignacion: null,
      filaSeleccionada: null,
    };
  },
  mounted(){
 //this.user.address = this.$refs.mapaAdd.direccion.value

  },
  methods: {
    openModal() {
      this.modalVisible = true;
      this.combineData();
    },
    combineData() {
      this.combinedData = [];

      this.combinedData = this.combinedData.concat(cliente);
    },
    closeModal() {
      this.modalVisible = false;
      this.mostrarMapaBoll = false;
    },
    mostrarMapa() {
      this.mostrarMapaBoll = true;
    },
    buscarDireccionMapa() {
      // Emitir evento para que mapa.vue realice la búsqueda de dirección
      this.$refs.mapaAdd.buscarDireccion();
    },

    // Método para actualizar la dirección en clientview.vue
    actualizarDireccion(direccion) {
      this.user.address = direccion;
    },
  
   async actualizarCoordenadas(coordenadas) {
  this.latitud = coordenadas.lat;
  this.longitud = coordenadas.lng;
  // Actualiza la dirección en user.address si es necesario
  if (coordenadas.direccion) {
    this.user.address = coordenadas.direccion;
  }
},

    async saveUser() {
      if (
        !this.user.person ||
        !this.user.phone ||
        !this.user.num_casa ||
        !this.user.barrio ||
        !this.user.correo ||
        !this.user.referencia
      ) {
        if (!this.user.person) {
          this.$q.notify({
            color: "negative",
            message: "Por favor, complete el Nombre",
          });
        }
        if (!this.user.phone) {
          this.$q.notify({
            color: "negative",
            message: "Por favor, ubique el Telefono",
          });
        }
        if (!this.user.address) {
          this.$q.notify({
            color: "negative",
            message: "Por favor, ubique la Direccion",
          });
        }
        if (!this.user.barrio) {
          this.$q.notify({
            color: "negative",
            message: "Por favor, ubique el Barrio",
          });
        }
        if (!this.user.referencia) {
          this.$q.notify({
            color: "negative",
            message: "Por favor, ubique la referencia",
          });
        }

        return;
      } else {
        const newUser = {
          id: this.user.id || Math.max(...this.rows.map((r) => r.id), 0) + 1,
          person: this.user.person,
          phone: this.user.phone,
          num_casa: this.user.num_casa,
          address: this.user.address,
          barrio: this.user.barrio,
          correo: this.user.correo,
          referencia: this.user.referencia,
          corporativo: this.user.corporativo,
        };

        

        console.log(newUser);
        // Agrega el nuevo usuario a combinedData
        this.combinedData.push(newUser);

        // Restablece el usuario actual
        this.resetUser();

        // Luego puedes realizar otras acciones necesarias aquí, si es necesario
      }
    },

    editUser() {
      this.isEditing = !this.isEditing; // Cambia el estado de edición
      this.editing = !this.editing; // Cambia el estado de edición
      this.mostrarBoton = !this.mostrarBoton;

      // Si estás en modo de edición, deselecciona todas las filas
      if (this.isEditing) {
        this.combinedData.forEach((row) => {
          row.selected = false;
        });
      }
    },
    handleRowClick(row, index) {
      if (this.isEditing) {
        this.selectedRow = row; // Asigna la fila seleccionada a selectedRow
        if (this.selectedRow === row) {
          const foundIndex = this.combinedData.findIndex(
            (r) => r === this.selectedRow
          );
          console.log(foundIndex);
        }
        this.toggleRowSelection(row, index);
      }
    },
    handleRowDoubleClick(row, index) {
      if ((this.isEditing = true)) {
        this.mostrarBoton = !this.mostrarBoton;
        this.toggleRowSelection(row, index);
      }
    },
    updateUser() {
      if (this.selectedRow) {
        // Verifica si hay una fila seleccionada

        if (
          !this.user.person ||
          !this.user.phone ||
          !this.user.num_casa ||
          !this.user.address ||
          !this.user.barrio ||
          !this.user.correo ||
          !this.user.referencia
        ) {
          if (!this.user.person) {
            this.$q.notify({
              color: "negative",
              message: "Por favor, complete el Nombre",
            });
          } else if (!this.user.phone) {
            this.$q.notify({
              color: "negative",
              message: "Por favor, ubique el Telefono",
            });
          } else if (!this.user.address) {
            this.$q.notify({
              color: "negative",
              message: "Por favor, ubique la direccion",
            });
          } else if (!this.user.barrio) {
            this.$q.notify({
              color: "negative",
              message: "Por favor, ubique el barrio",
            });
          } else if (!this.user.referencia) {
            this.$q.notify({
              color: "negative",
              message: "Por favor, complete la referencia",
            });
          }

          return;
        }

        const updatedUser = {
          id: this.user.id,
          person: this.user.person,
          phone: this.user.phone,
          num_casa: this.user.num_casa,
          address: this.user.address,
          barrio: this.user.barrio,
          correo: this.user.correo,
          referencia: this.user.referencia,
          corporativo: this.user.corporativo,
        };

        
        console.log(updatedUser.corporativo)

        const foundIndex = this.combinedData.findIndex(
          (r) => r === this.selectedRow
        );

        if (foundIndex !== -1) {
          // Reemplaza la fila seleccionada con los datos actualizados
          this.combinedData[foundIndex] = updatedUser;

          // Restablece el usuario actual
          this.resetUser();

          // Desselecciona todas las filas y finaliza la edición
          this.combinedData.forEach((row) => {
            row.selected = false;
          });
          this.isEditing = false;
          this.mostrarBoton = true;
        }
      }
    },

    resetUser() {
      this.isEditing = false;

      this.user = {
        id: null,
        person: null,
        phone: null,
        num_casa: null,
        address: null,
        barrio: null,
        correo: null,
        referencia: null,
        corporativo: false,
        latitud: null,
        longitud: null,
        lastname: null,
        codigo_voucher: null,
        enviado_servidor: null,
        confiabilidad_gps: null,
      };
    },
    toggleRowSelection(row, index) {
      if (row != null) {
        // Deseleccionar la fila anterior si hay una
        if (
          this.filaSeleccionadaAnterior >= 0 &&
          this.combinedData[this.filaSeleccionadaAnterior]
        ) {
          this.combinedData[this.filaSeleccionadaAnterior].selected = false;
        }
        this.combinedData.forEach((row) => {
          row.selected = false;
        });

        this.filaSeleccionadaAnterior = index;

        // Solo permitir selección durante la edición
        row.selected = !row.selected;
        this.selectedRow = row;
        

        this.showSelectedRowData(row);
      
      }
    },
    showSelectedRowData(row) {
      this.user.id = row.id;
      this.user.person = row.person;
      this.user.phone = row.phone;
      this.user.num_casa = row.num_casa;
      this.user.address = row.address;
      this.user.barrio = row.barrio;
      this.user.correo = row.correo;
      this.user.referencia = row.referencia;
      this.user.corporativo = row.corporativo; // Actualiza el estado de la casilla de verificación
    }
    
    
  },

  components: {
    Mapa,
  },
  setup() {
   
    return {
      columns,
      rows,
      
    };
  },
});