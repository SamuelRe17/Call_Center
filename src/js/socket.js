import io from "socket.io-client";
import eventBus from "src/js/EventEmitter";
import { Notify } from "quasar";
let serverURL = "";
let socket = null;
serverURL = "http://169.62.217.189:8080";
socket = io(serverURL);
// const solicitud1 = {
//   acronimo: "KRC",
//   usuario: "andrescall",
// };

// const listaIdesSolicitudes = {
//   lista: ["User1", "User2"],
// };

export const agregar_operador_call = (solicitud1, listaIdesSolicitudes) => {
  socket.on("connect", () => {
    console.log("Conectado al servidor");
    console.log("el socket del inicio ", socket.id);
    // Emitir el evento agregar_operador_call con los datos de la solicitud
    socket.emit("agregar_operador_call", solicitud1, listaIdesSolicitudes);
    console.log(socket.id, "aaqui va el id del socket");
  });

  // Manejar el evento de desconexión
  socket.on("disconnect", () => {
    console.log("Desconectado del servidor");
  });
};

export const closeSocket = () => {
  try {
    console.log("el socket del cierre ", socket.id);
    socket.close();
    console.log("Socket cliente cerrado.");
  } catch (ex) {
    console.log("No se ha podido cerrar el socket cliente: " + ex.message);
  }
};

export const asignar_unidad = (username, envioSolicitud, datosSolicitud) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("el socket del asignar unidad ", socket.id);
      // Emitir el evento "asignar_unidad" al servidor

      socket.emit(
        "asignar_unidad",
        username,
        envioSolicitud,
        datosSolicitud,
        (args) => {
          try {
            resolve(args);
          } catch (ex) {
            console.error("Error al procesar la respuesta del servidor:", ex);
            reject(ex);
          }
        }
      );

      // Cerrar la conexión si estaba desconectada
      if (socket.disconnected) {
        socket.connect();
      }
    } catch (error) {
      console.error("Error al asignar unidad:", error);
    }
  });
};

export const solicitar_carrera_central = (datosSolicitud, metadatos) => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit(
        "solicitar_carrera_central",
        datosSolicitud,
        metadatos,
        (args) => {
          try {
            console.log(socket.id, " el socket del lanzar carrera");
            // let jSONObject = JSON.parse(args[0].toString());
            // console.log(new Date().toString() + "---PRB1-R---" + jSONObject);
            // solicitudModelTable.idSolicitud = jSONObject.idSolicitud;
            // solicitudModelTable.usernameClienteKtaxi = jSONObject.username;
            // let llegoNotificacion = new Date().getTime();
            // console.log("---PRB1-R---" + (llegoNotificacion - inicioEnvioNotificacion));
            // if ((llegoNotificacion - inicioEnvioNotificacion) > 20000) {
            //   let jsonCancelar = {};
            //   jsonCancelar.idSolicitud = jSONObject.idSolicitud;
            //   actuarCancelarCarrera(jsonCancelar, solicitudModelTable.usernameOperadorDriver + "",
            //     "Cancelada por emit con demasiada latencia", VariableGlobal.RAZON_CANCELADA_NO_DESPACHADA);
            //   solicitudModelTable.generadaCallCenter = 0;
            //   principal.mostrarNotificacion("Solicitud cancelada, demasiado tiempo en responder. " + solicitudModelTable.barrio);
            // } else {
            //   principal.mostrarNotificacion("Solicitud generada desde central Barrio " + solicitudModelTable.barrio);
            // }

            console.log(args);
            resolve(args);
          } catch (ex) {
            reject(ex);
            console.log(
              "notificarSolicitudCentral Socket Node " +
                ex +
                " " +
                ex.cause +
                " " +
                ex.message
            );
          }
        }
      );

      // Cerrar la conexión si estaba desconectada
      if (socket.disconnected) {
        socket.connect();
      }
    } catch (error) {
      console.error("Error al solicitar carrera central:", error);
    }
  });
};

export const atender_solicitud = (userNameClient, envioSolicitud, acronimo) => {
  socket.emit(
    "atender_solicitud",
    userNameClient,
    envioSolicitud,
    acronimo,
    (args) => {
      try {
        console.log(
          socket.id,
          "aaqui va el id del socket en atender solicitud"
        );
        console.log(args);
      } catch (ex) {
        console.log("atenderSolicitud " + ex);
      }
    }
  );
};

export const confirmar_tiempo = (username, datosSolicitud) => {
  socket.emit("confirmar_tiempo", username, datosSolicitud, (respuesta) => {
    console.log(respuesta);
  });
};

export const actuarCancelarCarrera = (username, datosSolicitud) => {
  socket.emit("cancelar_carrera", username, datosSolicitud, (args) => {
    // Este es el callback que se ejecutará cuando se complete la emisión
    // Puedes realizar acciones adicionales aquí si es necesario
    console.log("Evento 'cancelar_carrera' completado", args);
  });
};

export const cancelar_solicitud_call = (username, datosSolicitud) => {
  socket.emit("cancelar_solicitud_call", username, datosSolicitud, (args) => {
    // Este es el callback que se ejecutará cuando se complete la emisión
    // Puedes realizar acciones adicionales aquí si es necesario
    console.log(args);
  });
};
// -------------------------------------------- ESCUCHAS--------------------------------------------------

export const esucha_en = (rowAsignacion) => {
  socket.on("en_", (data) => {
    console.log("Evento en_ del cliente recibido:", data["acep"]);
    try {
      const objetoEncontrado = rowAsignacion.value.find(
        (objeto) => objeto.idSolicitudCc === data["acep"].idSolicitudCc
      );
      switch (data["acep"].t) {
        case 0:
          console.log("Cancelar");
          // const estadocancelar = rowAsignacion.value.find(
          //   (objeto) => objeto.idSolicitudCc === data["acep"].idSolicitudCc
          // );
          objetoEncontrado.estado = "Confirme unidad";
          objetoEncontrado.unidad = null;

          break;
        case 1:
          console.log("aceptar");
          objetoEncontrado.estado = "Cliente acepto Tiempo";
          break;
        case 2:
          console.log("abordo");
          objetoEncontrado.estado = "Taxi Abordado";
          break;
        case 3:
          console.log("Notificar");

          objetoEncontrado.estado = "Unidad Asignada";

          break;
        case 4:
          console.log("cancelada una vez aceptada");
          break;
        case 5:
          console.log("en el lugar");
          break;
        default:
          break;
      }
    } catch (ex) {
      console.log("error en escucharSolicitud " + ex.message);
    }

    // Aquí puedes realizar acciones en base a los datos recibidos
  });
};

export const escucha_login = () => {
  return new Promise((resolve, reject) => {
    socket.on("login", (dataLog) => {
      console.log("este es el login", dataLog);
      try {
        // console.log(dataLog);
        const idUsuarioLogeado = dataLog.idUsuario;
        // console.log(idUsuarioLogeado);
        // const jsonNuevaSolicitudMovil = JSON.parse(data); // Si 'data' es un string JSON
        // // Aquí puedes realizar el procesamiento necesario con 'jsonNuevaSolicitudMovil'
        // console.log(jsonNuevaSolicitudMovil)
        resolve(idUsuarioLogeado);
      } catch (error) {
        console.error("ERROR al parsear nueva solicitud", error);
        reject(error);
      }
    });
  });
};

// export const en_respuesta_solicitud = () => {
//   return new Promise((resolve, reject) => {
//     socket.on("en_respuesta_solicitud", (args) => {
//       try {
//         // let username = '';
//         // const jsonEnRespuestaSol = JSON.parse(args[0]);
//         // console.log('*******', jsonEnRespuestaSol);
//         // const jsonDatosSol = jsonEnRespuestaSol.datosSolicitud;

//         // if (jsonEnRespuestaSol.hasOwnProperty('username')) {
//         //   username = jsonEnRespuestaSol.username;
//         // }

//         // const estado = jsonDatosSol.estado;

//         // switch (estado) {
//         //   case 4:
//         //     actuarEnRespuestaSolicitudAtendiendo(jsonDatosSol, username);
//         //     break;
//         //   case 7:
//         //     actuarEnRespuestaSOlicitudCancelada(jsonDatosSol, username);
//         //     break;
//         //   case 9:
//         //     abordarVehiculo(jsonDatosSol.idSolicitud);
//         //     break;
//         //   default:
//         //     break;
//         // }
//         console.log("Aqui va la respuesta de en_respuesta_solicitud", args);
//         resolve(args);
//       } catch (ex) {
//         console.log(ex.message);
//         reject(ex.message);
//       }
//     });
//   });
// };
export const en_respuesta_solicitud = (callback) => {
  // Escucha los datos y llama al callback con los datos recibidos
  socket.on("en_respuesta_solicitud", (args) => {
    try {
      console.log("Datos recibidos en en_respuesta_solicitud", args);
      callback(args); // Llama al callback con los datos
    } catch (ex) {
      console.log(ex.message);
    }
  });
};

export const asignar_tiempo = (username, datosSolicitud) => {
  socket.emit("asignar_tiempo", username, datosSolicitud, (args) => {
    console.log("asignar timepo: ", args);
    // principal.solicitudEnviadaAservidor(idSolicitud, true);
    // cahce.remove(envioSolicitud);
    // console.log(new Date() + " SE ASIGNO TEMPO idSOlicitud: " + idSolicitud);
    // if (idSolicitud > 0) {
    //   const solicitudModelTable = principal.modelTablaParaDespachar.obtenerSolicitudPorIdSOlicitud(idSolicitud);
    //   if (solicitudModelTable != null) {
    //     try {
    //       if (!solicitudModelTable.entrada.equals(Acronimo.DESDE_CODIGO) && args[0].toString() === "6") {
    //         cancelarCarrera(idSolicitud);
    //       } else if (solicitudModelTable.entrada === Acronimo.DESDE_CODIGO) {
    //         confirmarTiempo(idSolicitud);

    //         actuarConfirmarTiempo({ idSolicitud: idSolicitud.toString() }, (-ID_EMPRESA).toString());
    //       }
    //     } catch (error) {
    //       console.log("asignarTiempo Error: " + error);
    //     }
    //   }
    // }
  });
};
// obtener solicitudes de aplicativo
export const en_nueva_solicitud = (rowsApp) => {
  // Escuchar el evento en_nueva_solicitud
  socket.on("en_nueva_solicitud", (dataNS) => {
    console.log("el socket del en_nueva_solicitud ", socket.id);
    console.log("Evento en_nueva_solicitud recibido:", dataNS);
    let dataNStemporal = {
      entrada: `${dataNS.idPlataformaKtaxi}-${dataNS.idSolicitud}`,
      hora: dataNS["datosSolicitud"]["hora"],
      pago: "EFECTIVO",
      telefono: dataNS["datosSolicitud"]["celular"],
      codigo: 0,
      cliente: dataNS["datosSolicitud"]["nombres"],
      barrio: `${dataNS["datosSolicitud"]["barrioCliente"]}/${dataNS["datosSolicitud"]["referenciaCliente"]}`,
      direccion: `${dataNS["datosSolicitud"]["callePrincipal"]}/${dataNS["datosSolicitud"]["calleSecundaria"]}`,
      solicitud: "TOD......",
      tiempo: null,
      username: dataNS.username,
      longitud: dataNS["datosSolicitud"]["longitud"],
      latitud: dataNS["datosSolicitud"]["latitud"],
      idSolicitud: dataNS.idSolicitud,
      referencia: dataNS["datosSolicitud"]["referenciaCliente"],
      barrioCliente: dataNS["datosSolicitud"]["barrioCliente"],
      callePrincipal: dataNS["datosSolicitud"]["callePrincipal"],
      calleSecundaria: dataNS["datosSolicitud"]["calleSecundaria"],
      cvaucher: "0000",
    };
    // rowsAp.value.push(dataNStemporal)
    rowsApp.value.push(dataNStemporal);
  });
};

export const en_solicitud = (rowsApp, rowAsignacion) => {
  socket.on("en_solicitud", (args) => {
    try {
      console.log("en_solicitud :", args);
      switch (args.estado) {
        case 2:
          // eliminar cuando es atendida
          const indiceEncontradoA = rowsApp.value.findIndex(
            (objeto) => objeto.idSolicitud === args.idSolicitud
          );
          if (indiceEncontradoA != -1) {
            console.log("es el index a elimiar ", indiceEncontradoA);
            rowsApp.value.splice(indiceEncontradoA, 1);
          }

          break;
        case 5:
          // debe de cambiar el estado al 5 que es Cliente acepto Tiempo
          const objetoEncontrado = rowAsignacion.value.find(
            (objeto) => objeto.idSolicitud === args.idSolicitud
          );
          objetoEncontrado.estado = "Cliente acepto Tiempo";
          break;
        case 10:
          break;
        case 9:
          console.log("EL CLIENTE ABORDO LA UNIDAD");
          break;
        case 6:
          // eliminar cuando el cliente cancela
          const indiceEncontrado = rowsApp.value.findIndex(
            (objeto) => objeto.idSolicitud === args.idSolicitud
          );
          if (indiceEncontrado != -1) {
            console.log("es el index a elimiar ", indiceEncontrado);
            rowsApp.value.splice(indiceEncontrado, 1);
          }

          break;
        case 11:
          break;
        case -2:
          break;
        default:
          break;
      }
    } catch (ex) {
      console.log("error en escucharSolicitud " + ex.message);
    }
  });
};
