<template>
  <div>
    <!-- Contenido de tu componente Quasar -->
    <button @click="sendMessage">Enviar Mensaje</button>
    <button @click="asignarUnidad">Asignar</button>
    <button @click="atenderSolicitud">atender</button>
    <button @click="llamar_funcion">llamar funcion</button>
    <button @click="desconectar">desconectar</button>
    <h3>{{ data }}</h3>
    <h3>{{ moviNameuser }}</h3>
  </div>
  <div>
    <q-input v-model="date" filled type="date" hint="Ingrese la fecha" @change="consultaNoAsignadas()" />
    <div v-if="date">Has seleccionado la fecha: {{ date }}</div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import { ref } from 'vue'
import * as socke from "src/js/socket";
let serverURL = ''
let socket = null
export default {
  name: 'pruebaPage',
  data() {
    return {
      data: {},
      moviNameuser: null,
      dataDriver: {},
      userName: null,

    };
  },
  created() {
    serverURL = 'http://169.62.217.189:8080';
    socket = io(serverURL);

    const solicitud1 = {
      acronimo: 'KRC',
      usuario: 'andrescall',
    };

    const listaIdesSolicitudes = {
      lista: ['User1', 'User2']
    };
    socket.on('connect', () => {
      console.log('Conectado al servidor');
      console.log("el socket del inicio ", socket.id)
      // Emitir el evento agregar_operador_call con los datos de la solicitud
      socket.emit('agregar_operador_call', solicitud1, listaIdesSolicitudes);
      console.log(socket.id, "aaqui va el id del socket")
    });

    // Manejar el evento de desconexión
    socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
    });
    this.login();
  },
  methods: {
    desconectar() {
      try {
        console.log("el socket del cierre ", socket.id);
        socket.close();
        console.log("Socket cliente cerrado.");
      } catch (ex) {
        console.log("No se ha podido cerrar el socket cliente: " + ex.message);
      }
    },
    llamar_funcion() {
      let a = new Date().getTime();
      console.log(a)
    },
    consultaNoAsignadas() {
      console.log(this.date);
      const dateForm = {
        fecha: this.date
      }
      console.log("aqui va la data antes", dateForm)
      this.$axios.post('http://localhost:3000/buscarPorFecha', dateForm)
        .then(response => {
          // Manejar la respuesta del servidor aquí
          console.log(response.data);
        })
        .catch(error => {
          // Manejar los errores aquí
          console.error(error);
        });

    },
    login() {
      socket.on('login', (dataLog) => {
        console.log('nueva solicitud');
        try {
          console.log(dataLog)
          const idUsuarioLogeado = dataLog.idUsuario
          console.log(idUsuarioLogeado)
          // const jsonNuevaSolicitudMovil = JSON.parse(data); // Si 'data' es un string JSON
          // // Aquí puedes realizar el procesamiento necesario con 'jsonNuevaSolicitudMovil'
          // console.log(jsonNuevaSolicitudMovil)
        } catch (error) {
          console.error('ERROR al parsear nueva solicitud', error);
        }
      });
    },
    sendMessage() {
      // Conecta el cliente Socket.IO al servidor
      // Cambia la URL según tu configuración de servidor
      // const serverURL = 'http://169.62.217.189:8080'; // Cambia la URL según tu configuración de servidor

      // Datos para enviar en la solicitud
      // const solicitud1 = {
      //   acronimo: 'KRC',
      //   usuario: 'andrescall',
      // };

      // const listaIdesSolicitudes = {
      //   lista: ['User1', 'User2']
      // };

      // Crear una instancia del socket cliente
      // const socket = io(serverURL);

      // Manejar el evento de conexión
      // socket.on('connect', () => {
      //   console.log('Conectado al servidor');

      //   // Emitir el evento agregar_operador_call con los datos de la solicitud
      //   socket.emit('agregar_operador_call', solicitud1, listaIdesSolicitudes);
      // });

      // Manejar el evento de desconexión
      socket.on('disconnect', () => {
        console.log('Desconectado del servidor');
      });

      // Escuchar el evento agregar_operador_call





      // Escuchar el evento en_nueva_solicitud
      socket.on('en_nueva_solicitud', (dataNS) => {
        console.log('Evento en_nueva_solicitud recibido:', dataNS);
        this.data = dataNS['datosSolicitud']['hora']
        this.moviNameuser = dataNS['idSolicitud']
        this.userName = dataNS['username']
        // Aquí puedes realizar acciones en base a los datos recibidos
      });

      // Escuchar el evento en_solicitud
      socket.on('en_solicitud', (dataES) => {
        console.log('Evento en_solicitud recibido:', dataES);

        // Aquí puedes realizar acciones en base a los datos recibidos
      });

      // Escuchar el evento asignarUnidad
      socket.on('asignar_unidad', (dataES) => {
        console.log('Evento asignar_unidad recibido:', dataES);

        // Aquí puedes realizar acciones en base a los datos recibidos
      });

      // Escuchar el evento atender_solicitud
      socket.on('atender_solicitud', (dataES) => {
        console.log('Evento atender_solicitud recibido:', dataES);

        // Aquí puedes realizar acciones en base a los datos recibidos
      });

      // Escuchar el evento solicitar_carrera_central
      socket.on('solicitar_carrera_central', (dataES) => {
        console.log('Evento solicitar_carrera_central recibido:', dataES);

        // Aquí puedes realizar acciones en base a los datos recibidos
      });

      // Escuchar el evento liberar_solicitud
      socket.on('liberar_solicitud', (dataES) => {
        console.log('Evento liberar_solicitud recibido:', dataES);

        // Aquí puedes realizar acciones en base a los datos recibidos
      });


      // Escuchar el evento asignar_tiempo
      socket.on('asignar_tiempo', (dataES) => {
        console.log('Evento asignar_tiempo recibido:', dataES);

        // Aquí puedes realizar acciones en base a los datos recibidos
      });


      // Escuchar el evento abordar_vehiculo
      socket.on('abordar_vehiculo', (dataES) => {
        console.log('Evento abordar_vehiculo recibido:', dataES);

        // Aquí puedes realizar acciones en base a los datos recibidos
      });



      // Escuchar el evento en_estado_driver
      socket.on('en_estado_driver', (dataED) => {
        console.log('Evento en_estado_driver recibido:', dataED);
        this.dataDriver = dataED

        // Aquí puedes realizar acciones en base a los datos recibidos
      });

      socket.on('en_consulta_solicitudes', (dataES) => {
        console.log('Evento en_estado_driver recibido:', dataES);

        // Aquí puedes realizar acciones en base a los datos recibidos
      });


      socket.on('en_respuesta_solicitud', (dataES) => {
        console.log('Evento en_respuesta_solicitud del cliente recibido:', dataES);

        // Aquí puedes realizar acciones en base a los datos recibidos
      });

    },
    asignarUnidad() {
      try {
        const serverURL = 'http://169.62.217.189:8080'; // Cambia la URL según tu configuración de servidor
        const socket = io(serverURL);

        // Construir objeto de envío similar a JsonSolicitudMovil
        // const envioSolicitud = {
        //   idSolicitud: 2222,
        //   estado: 1,
        //   unidad: 200,
        //   idEmpresa: 4,
        //   empresa: 'Clipp Demo Loja',
        //   username: 12955, //id unidad 12955 id cliete 28771
        //   chat: '',
        //   // ... otras propiedades
        // };
        const envioSolicitud = {
          estado: 3,
          calificacion: null,
          idVehiculo: 0,
          abordadoPor: 0,
          usernameAtendio: null,
          idSolicitud: 0,
          unidad: 152,
          pin: 0,
          tiempo: 0,
          chat: 1,
          idEmpresa: 4,
          empresa: 'Clipp Demo Loja',
          razon: 0,
          razonCancelada: null,
          username: -1
        }

        // const datosSolicitud = {
        //   "datosSolicitud": {
        //     "pin": 456,
        //     "idServicioActivo": 522,
        //     "isValidar": 1,
        //     "tFp": 5,
        //     "tiempo": 2,
        //     "id_aplicativo": 1
        //   }
        // }
        const datosSolicitud = {
          tiempoTranscurrido: null,
          retrasoApp: 0,
          chat: 0,
          datosSolicitud: {
            idSolicitudCc: '1692999799423-6507',
            latitud: -6.77028295559253,
            idServicioActivo: 1,
            c: 0,
            callePrincipal: 'PRUEBA UNO NO ATENDER',
            referenciaCliente: 'PRUEBA UNO NO ATENDER',
            barrioCliente: 'PRUEBA UNO NO ATENDER',
            nombres: 'Andres Alvarado',
            longitud: -79.85462783305603,
            id_aplicativo: 1,
            pin: 0,
            tiempo: 15,
            celular: '123132',
            idEmpresa: 0,
            isValidar: 1,
            calleSecundaria: '',
            TFp: 0
          },
          idSolicitud: 0,
          idPlataformaKtaxi: null,
          username: -1
        }
        console.log("aqui van el objeto", envioSolicitud)
        // Emitir el evento "asignar_unidad" al servidor
        socket.emit('asignar_unidad', 27215, envioSolicitud, datosSolicitud, (args) => {
          try {
            console.log("holalaaa")
            console.log(args)
            // Procesar la respuesta del servidor

            // if (json.estado === -2) {
            //   this.actuarEnRespuestaSolicitudCanceladaCC(json.idSolicitudCc, false);
            // } else {
            //   // ... procesar otras respuestas
            // }
          } catch (ex) {
            console.error('Error al procesar la respuesta del servidor:', ex);
          }
        });

        // Cerrar la conexión si estaba desconectada
        if (socket.disconnected) {
          socket.connect();
        }
      } catch (error) {
        console.error('Error al asignar unidad:', error);
      }
    },
    atenderSolicitud() {
      console.log(this.dataDriver)
      // const serverURL = 'http://169.62.217.189:8080'; // Cambia la URL según tu configuración de servidor
      // const socket = io(serverURL);


      const envioSolicitud = {
        estado: 2,
        calificacion: null,
        idVehiculo: 0,
        abordadoPor: 0,
        usernameAtendio: null,
        idSolicitud: this.moviNameuser,
        unidad: 0,
        pin: 0,
        tiempo: 0,
        chat: 0,
        idEmpresa: 4,
        empresa: "Clipp Demo Loja",
        razon: 0,
        razonCancelada: null,
        username: 0
      };

      console.log(this.userName, "aqui va el id del usuario")

      socket.emit("atender_solicitud", this.userName, envioSolicitud, 'KRC', (args) => {
        try {
          console.log(socket.id, "aaqui va el id del socket en atender solicitud")
          console.log(args)
        } catch (ex) {
          console.log("atenderSolicitud " + ex);
        }
      });


    }

  }, setup() {
    return {

      date: ref('')
    }
  }


};
</script>
