<template>
  <div>
    <!-- Resto de tu código ... -->

    <!-- Agrega un input para que el usuario ingrese el nombre de la calle -->
    <q-input v-model="direccion" placeholder="Ingresa el nombre de la calle" />

    <!-- Mostrar sugerencias debajo del input -->
    <ul v-if="sugerencias.length > 0" class="sugerencias">
      <li
        v-for="sugerencia in sugerencias"
        :key="sugerencia.place_id"
        @click="seleccionarSugerencia(sugerencia)"
      >
        {{ sugerencia.description }}
      </li>
    </ul>

    <!-- Agrega un botón para buscar la dirección en el mapa -->
    <button @click="buscarDireccion">Buscar en el mapa</button>

    <!-- Mapa -->
    <div ref="map" class="map-container"></div>

    <!-- Coordenadas se mostrarán aquí -->
    <div class="coordinates" ref="coordinatesDisplay">
      <p>Latitud: {{ markerPosition.lat.toFixed(6) }}</p>
      <p>Longitud: {{ markerPosition.lng.toFixed(6) }}</p>
      <p>Nombre de la calle: {{ direccion }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
let direccion = ref("");
export default {
  name: "MapaCompo",
  data() {
    this.markers = [];
    return {
      map: null,
      marker: null, // Variable para el marcador
      markerPosition: { lat: 0, lng: 0 },
      direccion: "",
      sugerencias: [],
    };
  },
  methods: {
    async marcarUbicacion(event) {
      const latLng = event.latLng;
      const lat = latLng.lat();
      const lng = latLng.lng();
      let direccion = null;

      // Eliminar todos los marcadores anteriores
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });

      // Crear un nuevo marcador
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.map,
      });
      this.markers = [];
      this.markers.push(marker);

      // Inicializar la variable direccion con "Dirección no disponible"
      this.direccion = "Dirección no disponible";

      // Obtener la dirección a partir de las coordenadas
      if (lat !== 0 && lng !== 0) {
        const reverseGeocoder = new google.maps.Geocoder();
        const latlng = { lat, lng };

        reverseGeocoder.geocode(
          { location: latlng },
          async (results, status) => {
            if (status === "OK" && results.length > 0) {
              const direccionLocal = results[0].formatted_address;

              const apiUrl = `http://investigacion.kradac.com:3000/direccion?username=kdespachos&lat=${lat}&lng=${lng}`;
              console.log(apiUrl);
              try {
                const response = await fetch(apiUrl);
                console.log(response);
                if (response.ok) {
                  const data = await response.json();

                  // Verificar si las propiedades "st1" y "st2" están presentes en los datos
                  if ("st1" in data && "st2" in data) {
                    const direccionCalle1 = data.st1;
                    const direccionCalle2 = data.st2;
                    const direccionAPI = `${direccionCalle1}, ${direccionCalle2}`;

                    // Actualizar la dirección con los resultados de la API
                    this.direccion = direccionAPI;
                    console.log(this.direccion);

                    // Emitir el evento después de actualizar la dirección
                  } else {
                    // Las propiedades "st1" y/o "st2" no están presentes en los datos, mostrar un mensaje de error
                    console.error(
                      "Las propiedades 'st1' y/o 'st2' no están presentes en los datos de la API."
                    );
                  }
                } else {
                  console.error("Error al obtener la dirección desde la API.");
                }
              } catch (error) {
                console.error("Error al realizar la solicitud HTTP:", error);
              }
              console.log(this.direccion);
              this.$emit("coordenadas-actualizadas", {
                lat,
                lng,
              });
              this.$emit("direccion-actualizada", this.direccion);
            }
          }
        );
      }

      // Actualizar datos
      this.markerPosition = { lat, lng };
    },
    buscarDireccion() {
      const direccionIngresada = this.direccion;
      const direccionConLoja = direccionIngresada + ", Loja";

      // Crear una instancia del geocodificador
      const geocoder = new google.maps.Geocoder();
      const lojaBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-3.998252, -79.23107), // Límite suroeste de Loja
        new google.maps.LatLng(-3.982668, -79.202798) // Límite noreste de Loja
      );

      // Realizar la geocodificación de la dirección ingresada
      geocoder.geocode(
        { address: direccionConLoja, bounds: lojaBounds },

        (results, status) => {
          if (status === "OK" && results.length > 0) {
            const resultado = results[0];
            const latitud = resultado.geometry.location.lat();
            const longitud = resultado.geometry.location.lng();

            // Centrar el mapa en las coordenadas encontradas
            this.map.setCenter({ lat: latitud, lng: longitud });

            // Eliminar todos los marcadores anteriores
            this.markers.forEach((marker) => {
              marker.setMap(null);
            });

            // Crear un marcador en las coordenadas encontradas
            const marker = new google.maps.Marker({
              position: { lat: latitud, lng: longitud },
              map: this.map,
            });

            // Agregar el marcador a la lista de marcadores
            this.markers.push(marker);
            console.log(this.direccion, ",Loja");

            // Actualizar la posición del marcador
            this.markerPosition = { lat: latitud, lng: longitud };
          } else {
            // No se encontraron resultados o hubo un error en la geocodificación
            console.error("No se pudo encontrar la dirección:", status);
          }
        }
      );
    },

    buscarSugerencias() {
      if (this.direccion === "") {
        this.sugerencias = [];
        return;
      }

      const autocompleteService = new google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions(
        { input: this.direccion },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.sugerencias = predictions;
          } else {
            this.sugerencias = [];
          }
        }
      );
    },

    seleccionarSugerencia(sugerencia) {
      this.direccion = sugerencia.description;
      this.sugerencias = [];
    },
  },

  mounted() {
    // Crear un cargador de la API de Google Maps
    const loader = new Loader({
      apiKey: "AIzaSyAnXJU_TdJAsxpxsLRT6PzkADR5pBciLYE", // Reemplaza con tu propia API Key de Google Maps
      version: "weekly",
      libraries: ["places"],
    });

    // Cargar la API de Google Maps
    loader
      .load()
      .then(() => {
        // Inicializar el mapa de Google Maps
        this.map = new google.maps.Map(this.$refs.map, {
          center: { lat: -4.011669, lng: -79.203614 },
          zoom: 15,
        });

        // Agrega un listener de clic para marcar la ubicación
        this.map.addListener("click", (event) => this.marcarUbicacion(event));
      })
      .catch((error) => {
        console.error("Error al cargar la API de Google Maps:", error);
      });
  },
};
</script>

<style>
.map-container {
  width: 100%;
  height: 400px;
}
</style>
