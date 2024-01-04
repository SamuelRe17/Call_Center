<template>
  <div>
    <q-btn round flat icon="add" @click="openModal" />
    <q-card-section class="modal-content" />
    <q-dialog v-model="modalVisible" persistent style="max-width: 1400px">
      <q-card class="formCliente" style="width: 1303px">
        <q-card-section class="modal-content">
          <!-- Tu contenido del modal aquí -->
          <!-- Por ejemplo, campos para nombre de usuario, contraseña, etc. -->
          <div class="left-content">
            <q-input v-model="user.id" type="number" label="ID" disable />

            <q-input
              v-model="user.person"
              label="Name"
              :rules="[(val) => (val && val.length > 0) || 'Ingrese el nombre']"
            />

            <q-input
              v-model="user.phone"
              label="Teléfono"
              :rules="[
                (val) => (val && val.length > 0) || 'Ingrese el telefono',
              ]"
            />

            <q-input v-model="user.num_casa" label="Número de Casa" />

            <div class="hola">
              <q-input
                v-model="user.address"
                label="Dirección"
                :rules="[
                  (val) => (val && val.length > 0) || 'Ingrese la direccion',
                ]"
              />

              <div class="mapa">
                <q-btn square color="secondary" @click="mostrarMapa">
                  <q-icon name="map" />
                </q-btn>

                <div v-if="!mostrarMapaBoll" class="tam-map">
                  <!-- Contenedor del mapa, se muestra solo si mostrarMapaBoll es falso -->
                  <div ref="mapContainer" class="map-container" />
                </div>
                <q-card v-else class="custom-map">
                  <!-- Mapa, se muestra solo si mostrarMapaBoll es verdadero -->
                  <Mapa
                    v-if="mostrarMapaBoll"
                    @coordenadas-actualizadas="actualizarCoordenadas"
                    class="tam-map"
                  />
                </q-card>
              </div>
            </div>

            <q-input
              v-model="user.barrio"
              label="Barrio"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Ingrese el Barrio o sector',
              ]"
            />

            <q-input v-model="user.correo" type="email" label="Correo" />

            <q-input
              v-model="user.referencia"
              label="Referencia"
              :rules="[
                (val) => (val && val.length > 0) || 'Ingrese la referencia',
              ]"
            />

            <div class="bottom-content">
              <q-checkbox v-model="user.corporativo" label="Corporativo" />
              <q-card-actions>
                <q-btn label="Cancelar" color="red" @click="closeModal" />
                <q-btn
                  v-if="mostrarBoton"
                  label="Guardar"
                  color="positive"
                  @click="saveUser"
                />
                <q-btn
                  v-else
                  label="actualizar"
                  name="actualizar"
                  color="blue"
                  @click="saveUser"
                />
                <q-btn label="Editar" color="orange" @click="editUser" />
              </q-card-actions>
              <q-table
                title="Clientes"
                :rows="rows"
                :columns="columns"
                row-key="name"
                class="custom-table"
              />
              <q-btn
                style="height: 0px"
                round
                flat
                icon="close"
                @click="closeModal"
                class="custom-icon"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ClientView from "./clientview";
export default ClientView;
</script>
<style scoped>
.modal-content {
  display: flex;
  justify-content: space-between;
}
.left-content {
  width: 50%;
  padding: 0 10px;
}
.q-dialog__inner--minimized > div {
  max-height: calc(108vh - 48px);
}

.bottom-content {
  width: 50%;
}
.input-container {
  margin-bottom: 10px;
}
.q-dialog__inner--minimized > div {
  max-width: 1400px;
}

/* Usar CSS Grid para dividir el contenido en dos columnas */
.modal-grid {
  display: grid;
  grid-template-columns: 5fr 5fr; /* Dos columnas de igual ancho */
  gap: 40px; /* Espacio entre las columnas */
}

.custom-table {
  width: 400%; /* Establece un ancho del 100% para que se extienda horizontalmente */
  height: 200px; /* Ajusta la altura según tus necesidades */
  position: relative;
  left: 10px;
  bottom: 0px;
  /* Puedes ajustar otros estilos aquí, como el tamaño de fuente, colores, etc. */
}

.custom-map {
  position: relative;
  left: 650px;
  bottom: 300px;
}
.tam-map {
  width: 100% !important;
  height: 0px !important;
}
.custom-icon {
  position: relative;
  left: 1230px;
  bottom: 890px;
}
.custom-update {
  position: relative;
  left: 0px;
  bottom: 0px;
}
</style>