<template>
  <div>
    <q-btn round flat icon="add" @click="openModal" />
    <q-card-section class="modal-content" />
    <q-dialog
      v-model="modalVisible"
      persistent
      style="max-width: 1400px"
      ref="clientView"
    >
      <q-card class="formCliente" style="width: 1303px">
        <q-card-section class="modal-content">
          <!-- Tu contenido del modal aquí -->
          <!-- Por ejemplo, campos para nombre de usuario, contraseña, etc. -->
          <div class="left-content">
            <q-input v-model="user.id" type="number" label="ID" />

            <q-input v-model="user.person" label="Name" ref="prueba1" />

            <q-input v-model="user.phone" label="Teléfono" ref="prueba2" />

            <q-input
              v-model="user.num_casa"
              label="Número de Casa"
              ref="prueba3"
            />

            <div class="hola">
              <div class="mapa">
                <q-input
                  v-model="user.address"
                  label="Dirección"
                  ref="prueba4"
                />
                <q-btn square color="secondary" @click="buscarDireccionMapa">
                  <q-icon name="map" />
                </q-btn>

                <div class="tam-map">
                  <!-- Contenedor del mapa, se muestra solo si mostrarMapaBoll es falso -->
                  <div ref="mapContainer" class="map-container" />
                </div>
                <q-card class="custom-map">
                  <!-- Mapa, se muestra solo si mostrarMapaBoll es verdadero -->
                  <Mapa
                    @coordenadas-actualizadas="actualizarCoordenadas"
                    @direccion_actualizada="actualizarDireccion"
                    class="tam-map"
                    ref="mapaAdd"
                    :direccion="user.address"
                  />
                </q-card>
              </div>
            </div>

            <q-input v-model="user.barrio" label="Barrio" ref="prueba5" />

            <q-input
              v-model="user.correo"
              type="email"
              label="Correo"
              ref="prueba6"
            />

            <q-input
              v-model="user.referencia"
              label="Referencia"
              ref="prueba7"
            />

            <div class="bottom-content">
              <q-checkbox v-model="user.corporativo" label="Corporativo" />
              <q-card-actions>
                <q-btn label="Cancelar" @click="closeModal" />

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
                  @click="updateUser"
                />
                <q-btn
                  v-if="mostrarBoton"
                  label="Editar"
                  color="orange"
                  @click="editUser"
                />
              </q-card-actions>
              <q-table
                title="Clientes"
                :rows="combinedData"
                :columns="columns"
                :filter="filter"
                no-data-label="No se han encontrado resultados"
                no-results-label="No se han encontrado resultados"
                row-key="id"
                class="custom-table"
              >
                <template v-slot:body="props">
                  <q-tr
                    :class="{
                      'selected-row': props.row.selected,
                    }"
                    @click="handleRowClick(props.row, props.index)"
                    @dblclick="handleRowDoubleClick(props.row, props.index)"
                  >
                    <q-td key="id" class="center-cell">{{ props.row.id }}</q-td>
                    <!-- Agregar la clase center-cell -->
                    <q-td key="phone" class="center-cell">{{
                      props.row.phone
                    }}</q-td>
                    <!-- Agregar la clase center-cell -->
                    <q-td key="person" class="center-cell">{{
                      props.row.person
                    }}</q-td>
                    <!-- Agregar la clase center-cell -->
                  </q-tr>
                </template>
                <template v-slot:top-right>
                  <q-input
                    borderless
                    dense
                    debounce="300"
                    v-model="filter"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>

                <template v-slot:no-data="{ icon, message, filter }">
                  <div
                    class="full-width row flex-center text-accent q-gutter-sm"
                  >
                    <q-icon size="2em" name="sentiment_dissatisfied" />
                    <span>{{ message }} </span>
                    <q-icon
                      size="2em"
                      :name="filter ? 'filter_b_and_w' : icon"
                    />
                  </div>
                </template>
              </q-table>

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
  bottom: 790px;
}
.custom-update {
  position: relative;
  left: 0px;
  bottom: 0px;
}
.selected-row {
  background-color: rgb(180, 234, 234);
  /* Cambia el color de fondo deseado */
}
.center-cell {
  text-align: center; /* Centra el contenido en las celdas */
}
</style>
