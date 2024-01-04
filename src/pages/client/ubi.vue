<template>
  <div>
    <div ref="map" class="map-container"></div>

    <div class="coordinates" ref="coordinatesDisplay">
      <!-- Coordenadas se mostrarán aquí -->
      <p>Latitud: {{ markerPosition.lat.toFixed(6) }}</p>
      <p>Longitud: {{ markerPosition.lng.toFixed(6) }}</p>
      <p>Nombre de la calle: {{ direccion }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "MapaCompo",
  setup() {
    const map = ref(null);
    const markers = [];
    let marker = null; // Variable para el marcador

    const markerPosition = ref({ lat: 0, lng: 0 });
    const direccion = ref("");

    const marcarUbicacion = async (event) => {
      const latLng = event.latLng;
      const lat = latLng.lat();
      const lng = latLng.lng();

      // Eliminar el marcador anterior si existe
      if (marker) {
        marker.setMap(null);
      }

      // Crear un nuevo marcador
      marker = new google.maps.Marker({
        position: { lat, lng },
        map: map.value,
      });

      // Inicializar la variable direccion con "Dirección no disponible"
      direccion.value = "Dirección no disponible";

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
                    direccion.value = direccionAPI;
                  } else {
                    // Las propiedades "st1" y/o "st2" no están presentes en los datos, mostrar un mensaje de error
                    console.error(
                      "Las propiedades 'st1' y/o 'st2' no están presentes en los datos de la API."
                    );
                    direccion.value = "Dirección no disponible";
                  }
                } else {
                  console.error("Error al obtener la dirección desde la API.");
                }
              } catch (error) {
                console.error("Error al realizar la solicitud HTTP:", error);
              }
            }
          }
        );
      }

      // Actualizar datos
      markerPosition.value = { lat, lng };
    };

    onMounted(() => {
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
          const gMap = new google.maps.Map(map.value, {
            center: { lat: -4.011669, lng: -79.203614 },
            zoom: 15,
          });

          // Agrega un listener de clic para marcar la ubicación
          gMap.addListener("click", (event) => marcarUbicacion(event));
        })
        .catch((error) => {
          console.error("Error al cargar la API de Google Maps:", error);
        });
    });

    return {
      map,
      markers,
      markerPosition,
      direccion,
    };
  },
};
</script>

<style>
.map-container {
  width: 100%;
  height: 400px;
}
</style>
