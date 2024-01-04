<template>
  <div>
    <q-btn round flat icon="add" @click="openModal" />
    <q-dialog v-model="modalVisible">
      <q-card class="formCliente">
        <q-card-section>
          <!-- Aquí coloca tu formulario para ingresar un usuario -->
          <!-- Por ejemplo, campos para nombre de usuario, contraseña, etc. -->
          <q-input v-model="user.id" type="number" label="ID" disable />
          <q-input v-model="user.person" label="Nombre" :rules="[val => val && val.length > 0 || 'Ingrese el nombre']" />
          <q-input v-model="user.phone" label="Teléfono"
            :rules="[val => val && val.length > 0 || 'Ingrese el telefono']" />
          <q-input v-model="user.num_casa" label="Número de Casa" />
          <div class="hola">
            <q-input v-model="user.address" label="Dirección"
              :rules="[val => val && val.length > 0 || 'Ingrese la direccion']" />
            <div class="mapa">
              <q-btn square color="secondary" @click="mostrarMapa">Mostrar Mapa <q-icon name="map" /></q-btn>
              <q-card>
                <Mapa v-if="mostrarMapaBoll" @coordenadas-actualizadas="actualizarCoordenadas" />
              </q-card>
              <div v-if="latitud !== null && longitud !== null">
                Latitud: {{ latitud.toFixed(6) }}, Longitud: {{ longitud.toFixed(6) }}
                <div class="address">
                  Dirección: {{ direccion }}
                </div>
              </div>
            </div>
          </div>
          <q-input v-model="user.barrio" label="Barrio"
            :rules="[val => val && val.length > 0 || 'Ingrese el Barrio o sector']" />
          <q-input v-model="user.correo" type="email" label="Correo" />
          <q-input v-model="user.referencia" label="Referencia"
            :rules="[val => val && val.length > 0 || 'Ingrese la referencia']" />

          <q-checkbox v-model="user.corporativo" label="Corporativo" />
        </q-card-section>

        <q-card-actions>
          <q-btn label="Cancelar" color="primary" @click="closeModal" />
          <q-btn label="Guardar" color="positive" @click="saveUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <div>
    <Mapa v-if="mostrarMapaBoll" @coordenadas-actualizadas="actualizarCoordenadas" />
  </div>
</template>

<script>
import Mapa from 'components/Mapa.vue'; // Ruta al componente del mapa

export default {
  name: 'MapaPage',
  components: {
    Mapa,
  },
  data() {
    return {
      mostrarMapaBoll: false,
      latitud: null,
      longitud: null,
      direccion: null,
      modalVisible: false,
      user: {
        id: null,
        person: '',
        phone: '',
        num_casa: '',
        address: '',
        barrio: '',
        correo: '',
        referencia: '',
        corporativo: false,
        latitud: '',
        longitud: '',
        lastname: '',
        codigo_voucher: '',
        enviado_servidor: '',
        confiabilidad_gps: '',
      },
      mostrarMapaToggle: false,
      code: null
    };
  },
  methods: {
    mostrarMapa() {

      this.mostrarMapaBoll = !this.mostrarMapaBoll;

    },
    actualizarCoordenadas(coordenadas) {
      this.latitud = coordenadas.lat;
      this.longitud = coordenadas.lng;
      this.direccion = coordenadas.direccion;
      this.user.address = this.direccion;
      this.user.latitud = this.latitud;
      this.user.longitud = this.longitud;
      // console.log(coordenadas.direccion)
      // console.log("aqui va en timepo real", this.latitud.toFixed(6))
    },
    openModal() {

      this.modalVisible = true;
      this.$axios.get('http://localhost:3000/getLastClientCode')
        .then(response => {
          const lastCode = response.data.lastCode;
          this.user.id = lastCode + 1;
          console.log(lastCode + 1)

        })
        .catch(error => {
          console.error('Error al obtener el último código del cliente:', error);
        });

    },
    closeModal() {
      this.modalVisible = false;
      this.user = {
        id: null,
        person: '',
        phone: '',
        num_casa: '',
        address: '',
        barrio: '',
        correo: '',
        referencia: '',
        corporativo: false,
        latitud: '',
        longitud: '',
        lastname: '',
        codigo_voucher: '',
        enviado_servidor: '',
        confiabilidad_gps: '',
      }
      this.latitud = null;
      this.longitud = null;
    },
    saveUser() {

      if (
        !this.user.person ||
        !this.user.phone ||
        !this.user.num_casa ||
        !this.user.address ||
        !this.user.barrio ||
        !this.user.correo ||
        !this.user.referencia
      ) {
        this.$q.notify({
          color: 'negative',
          message: 'Por favor, completa todos los campos requeridos.',
        });
        return; // Detener la ejecución si falta algún campo
      } else {
        this.user.id = parseInt(this.user.id)
        this.user.codigo_voucher = 0
        this.user.enviado_servidor = 0
        this.user.confiabilidad_gps = 0
        this.user.corporativo = this.user.corporativo == false ? 0 : 1
        const fromData = {
          name: this.user.person.toUpperCase(),
          lastname: this.user.lastname.toUpperCase(),
          phone: this.user.phone,
          direction: this.user.address.toUpperCase(),
          sector: this.user.barrio.toUpperCase(),
          code: this.user.id,
          num_house: this.user.num_casa,
          latitud: this.user.latitud,
          longitud: this.user.longitud,
          reference: this.user.referencia.toUpperCase(),
          enviado_servidor: this.user.enviado_servidor,
          corporativo: this.user.corporativo,
          codigo_voucher: this.user.codigo_voucher,
          correo_electronico: this.user.correo,
          confiabilidad_gps: this.user.confiabilidad_gps,
        }
        console.log("aqui va la data antes del server", fromData)

        this.$axios.post('http://localhost:3000/addClient', fromData)
          .then(response => {
            console.log(response.data); // Mensaje del servidor
            // Aquí puedes manejar el resultado de la inserción si es necesario
          })
          .catch(error => {
            console.error('Error al enviar los datos al servidor:', error);
            // Manejar el error si ocurrió un problema al enviar los datos
          });



        this.modalVisible = false;


        console.log("aqui va el cliente", this.user)
        this.user = {
          id: null,
          person: '',
          phone: '',
          num_casa: '',
          address: '',
          barrio: '',
          correo: '',
          referencia: '',
          corporativo: false,
          latitud: '',
          longitud: '',
          lastname: '',
          codigo_voucher: '',
          enviado_servidor: '',
          confiabilidad_gps: '',
        }
        this.latitud = null;
        this.longitud = null;
      }

    },
  },
};
</script>

<style>
.formCliente {
  width: 550px;
}
</style>
