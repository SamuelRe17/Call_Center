<template>
  <q-page class="">
    <!-- <div class="q-pa-md"></div> -->
    <!-- shadow-2 rounded-borders -->
    <div>
      <div>
        <!-- <q-page padding> -->
        <q-page>
          <div class="WAL position-relative bg-white-4" :style="style">
            <q-layout view="lHh Lpr lFf" class="shadow-3" container>
              <q-drawer
                v-model="leftDrawerOpen"
                show-if-above
                bordered
                :breakpoint="690"
              >
                <q-toolbar class="bg-grey-3">
                  <q-avatar class="cursor-pointer">
                    <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
                  </q-avatar>

                  <q-space />
                  <div>
                    <q-btn round flat icon="add" @click="openModal" />
                    <q-dialog v-model="modalVisible">
                      <q-card class="formCliente">
                        <q-card-section>
                          <!-- Aquí coloca tu formulario para ingresar un usuario -->
                          <!-- Por ejemplo, campos para nombre de usuario, contraseña, etc. -->
                          <q-input
                            v-model="user.id"
                            type="number"
                            label="ID"
                            disable
                          />
                          <q-input
                            v-model="user.person"
                            label="Nombre"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Ingrese el nombre',
                            ]"
                          />
                          <q-input
                            v-model="user.phone"
                            label="Teléfono"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Ingrese el telefono',
                            ]"
                          />
                          <q-input
                            v-model="user.num_casa"
                            label="Número de Casa"
                          />
                          <div class="hola">
                            <q-input
                              v-model="user.address"
                              label="Dirección"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) ||
                                  'Ingrese la direccion',
                              ]"
                            />
                            <div class="mapa">
                              <q-btn
                                square
                                color="secondary"
                                @click="mostrarMapa"
                                >Mostrar Mapa <q-icon name="map"
                              /></q-btn>
                              <q-card>
                                <Mapa
                                  v-if="mostrarMapaBoll"
                                  @coordenadas-actualizadas="
                                    actualizarCoordenadas
                                  "
                                />
                              </q-card>
                              <div v-if="latitud !== null && longitud !== null">
                                Latitud: {{ latitud.toFixed(6) }}, Longitud:
                                {{ longitud.toFixed(6) }}
                                <div class="address">
                                  Dirección: {{ direccion }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <q-input
                            v-model="user.barrio"
                            label="Barrio"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Ingrese el Barrio o sector',
                            ]"
                          />
                          <q-input
                            v-model="user.correo"
                            type="email"
                            label="Correo"
                          />
                          <q-input
                            v-model="user.referencia"
                            label="Referencia"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Ingrese la referencia',
                            ]"
                          />

                          <q-checkbox
                            v-model="user.corporativo"
                            label="Corporativo"
                          />
                        </q-card-section>

                        <q-card-actions>
                          <q-btn
                            label="Cancelar"
                            color="primary"
                            @click="closeModal"
                          />
                          <q-btn
                            label="Guardar"
                            color="positive"
                            @click="saveUser"
                          />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>
                  </div>
                  <q-btn round flat icon="ti-filter">
                    <q-menu auto-close :offset="[110, 8]">
                      <q-list style="min-width: 150px">
                        <q-item clickable>
                          <q-item-section>codigo</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>Reciente</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>Mas antiguo</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>Favorito</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>A - Z</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>Z - A</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>

                  <!-- <q-btn round flat icon="close" class="WAL__drawer-close" @click="toggleLeftDrawer" /> -->
                </q-toolbar>

                <q-toolbar class="bg-grey-2">
                  <q-input
                    rounded
                    outlined
                    dense
                    class="WAL__field full-width"
                    bg-color="white"
                    v-model="filtro"
                    placeholder="Buscar Cliente"
                    @keydown.enter="addRow"
                    @blur="clearSearch"
                    @keyup.enter="clearSearch"
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </q-toolbar>

                <q-list>
                  <q-item
                    v-for="(cliente, index) in arrayFiltro"
                    :key="cliente.id"
                    clickable
                    v-ripple
                    @click="setCurrentConversation(index)"
                  >
                    <q-item-section avatar>
                      <q-avatar>
                        {{ cliente.id }}
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines=" 1">
                        {{ cliente.person }}
                      </q-item-label>
                      <q-item-label class="conversation__summary" caption>
                        <q-icon name="not_interested" v-if="cliente.deleted" />
                        <q-icon name="room" />
                        {{ cliente.address }}
                        <!-- <span v-html="cliente.id"></span> -->
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label caption>
                        <q-icon name="home_work" v-if="cliente.corporativo" />
                      </q-item-label>

                      <q-icon name="keyboard_arrow_down" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-drawer>
              <!-- panel con pestañas incio -->
              <q-page-container class="bg-grey-2 tablas">
                <!-- <div class="q-pa-md"> -->
                <div class="">
                  <div class="q-gutter-y-md" style="max-width: 100%">
                    <q-card>
                      <q-tabs
                        v-model="tab"
                        dense
                        class="text-grey"
                        active-color="primary"
                        indicator-color="primary"
                        align="justify"
                        narrow-indicator
                      >
                        <q-tab name="inicio" label="Inicio" />
                        <q-tab
                          name="despachadas"
                          label="Despachadas"
                          @click="consultaDespachadas"
                        />
                      </q-tabs>

                      <q-separator />

                      <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="inicio">
                          <q-page-container class="bg-grey-2 tablas interno">
                            <div class="" @click="containerClickedApp">
                              <q-table
                                flat
                                bordered
                                title="APP"
                                :rows="rowsApp"
                                :columns="columnsapp"
                                row-key="name"
                                hide-bottom
                                style="height: 300px"
                                virtual-scroll
                                class="my-sticky-header-table"
                              >
                                <template v-slot:body="props">
                                  <q-tr
                                    :class="{
                                      'selected-row': props.row.selected,
                                    }"
                                    @click="toggleRowSelection(props.row, null)"
                                  >
                                    <q-td
                                      v-for="col in columnsapp"
                                      :key="col.name"
                                      >{{ props.row[col.name] }}
                                    </q-td>
                                  </q-tr>
                                </template>
                              </q-table>
                            </div>
                            <q-dialog v-model="showDialog_download_movil">
                              <q-card>
                                <q-card-section>
                                  <div class="text-h6">
                                    para atender esta solicitud debe disponer de
                                    una unidad.
                                  </div>
                                </q-card-section>
                                <q-card-section>
                                  ¿Esta seguro(a) de Tomarla?
                                </q-card-section>
                                <q-card-actions align="right">
                                  <q-btn
                                    label="Cancelar"
                                    color="primary"
                                    @click="showDialog_download_movil = false"
                                  />
                                  <q-btn
                                    label="Tomar"
                                    color="negative"
                                    @click="moveSelectApp"
                                  />
                                </q-card-actions>
                              </q-card>
                            </q-dialog>
                          </q-page-container>
                          <q-page-container class="bg-grey-2 tablas interno">
                            <div class="" @click="containerClicked">
                              <q-table
                                flat
                                bordered
                                title="Asignacion"
                                :rows="rowsAsignacion"
                                :columns="columnsasig"
                                row-key="id"
                                hide-bottom
                                style="height: 300px"
                                binar-sort
                                class="my-sticky-header-table"
                                virtual-scroll
                                :rows-per-page-options="[0]"
                                :loading="loading"
                              >
                                <template v-slot:body="props">
                                  <q-tr
                                    :class="{
                                      'selected-row': props.row.selected,
                                    }"
                                    :props="props"
                                    @click="
                                      toggleRowSelection(
                                        null,
                                        props.row,
                                        props.rowIndex
                                      )
                                    "
                                  >
                                    <q-td key="entrada" :props="props">{{
                                      props.row.entrada
                                    }}</q-td>
                                    <q-td key="sms" :props="props">{{
                                      props.row.sms
                                    }}</q-td>
                                    <q-td key="hora" :props="props">{{
                                      props.row.hora
                                    }}</q-td>
                                    <q-td key="telefono" :props="props">{{
                                      props.row.telefono
                                    }}</q-td>
                                    <q-td key="codigo" :props="props">{{
                                      props.row.codigo
                                    }}</q-td>
                                    <q-td key="cliente" :props="props">{{
                                      props.row.cliente
                                    }}</q-td>
                                    <q-td key="barrio" :props="props">{{
                                      props.row.barrio
                                    }}</q-td>
                                    <q-td key="direccion" :props="props">{{
                                      props.row.direccion
                                    }}</q-td>
                                    <q-td key="cvaucher" :props="props">{{
                                      props.row.cvaucher
                                    }}</q-td>
                                    <q-td key="unidad" :props="props">
                                      {{ props.row.unidad }}

                                      <q-popup-edit
                                        v-model="props.row.unidad"
                                        v-slot="scope"
                                      >
                                        <q-input
                                          type="number"
                                          v-model="scope.value"
                                          dense
                                          autofocus
                                          counter
                                          @keyup.enter="
                                            () => {
                                              saveIntegerInput(scope);
                                              asignarUnidad(props.row);
                                            }
                                          "
                                        />
                                      </q-popup-edit>
                                    </q-td>
                                    <q-td key="tiempo" :props="props"
                                      >{{ props.row.tiempo }}
                                      <q-popup-edit
                                        v-model="props.row.tiempo"
                                        v-slot="scope"
                                      >
                                        <q-input
                                          type="number"
                                          v-model="scope.value"
                                          dense
                                          autofocus
                                          counter
                                          @keyup.enter="
                                            () => {
                                              saveIntegerInput(scope);
                                              asignarTiempo(props.row);
                                            }
                                          "
                                        />
                                      </q-popup-edit>
                                    </q-td>
                                    <q-td key="atrseg" :props="props">{{
                                      formatTime(props.row.atrseg)
                                    }}</q-td>
                                    <q-td key="nota" :props="props">{{
                                      props.row.nota
                                    }}</q-td>
                                    <q-td key="placav" :props="props">{{
                                      props.row.placav
                                    }}</q-td>
                                    <q-td key="estado" :props="props">
                                      {{ props.row.estado }}
                                      <q-popup-edit
                                        v-model="props.row.estado"
                                        v-slot="scope"
                                        :label="props.row.estado"
                                      >
                                        <q-input
                                          v-model="scope.value"
                                          dense
                                          autofocus
                                          counter
                                          @keyup.enter="scope.set"
                                        />
                                      </q-popup-edit>
                                    </q-td>
                                  </q-tr>
                                  <q-dialog v-model="showDialog_acep_time">
                                    <q-card>
                                      <q-card-section>
                                        <div class="text-h6">
                                          ¡Confirmar unidad asignada!
                                        </div>
                                      </q-card-section>
                                      <q-card-section>
                                        Asignar carrera a unidad:
                                        {{ unidadRS }} Código de carrera:
                                        {{ codeRS }} Tiempo:
                                        {{ tiempoRS }}
                                      </q-card-section>
                                      <q-card-actions align="right">
                                        <q-btn
                                          label="Si"
                                          color="negative"
                                          @click="
                                            accept_time(
                                              props.row,
                                              unidadRS,
                                              tiempoRS
                                            )
                                          "
                                        />
                                        <q-btn
                                          label="No"
                                          color="primary"
                                          @click="no_accept_time"
                                        />
                                      </q-card-actions>
                                    </q-card>
                                  </q-dialog>
                                </template>
                              </q-table>
                            </div>
                          </q-page-container>
                        </q-tab-panel>

                        <q-tab-panel name="despachadas">
                          <q-page-container class="bg-grey-2 tablas interno">
                            <div class="">
                              <q-table
                                flat
                                bordered
                                title="Despacho"
                                :rows="rowsDespacho"
                                :columns="columnsDespacho"
                                row-key="name"
                                hide-bottom
                                style="height: 450px"
                                virtual-scroll
                                binary-state-sort
                                separator="cell"
                                :rows-per-page-options="[0]"
                                class="my-sticky-header-table"
                              >
                                <template v-slot:top-right>
                                  <div>
                                    <q-input
                                      v-model="date"
                                      filled
                                      type="date"
                                      hint="Ingrese la fecha"
                                      @change="consultaDespachadas()"
                                    />
                                  </div>
                                </template>
                              </q-table>
                            </div>
                          </q-page-container>
                        </q-tab-panel>
                      </q-tab-panels>
                    </q-card>
                  </div>
                </div>
              </q-page-container>
              <!-- panel pestañas fin  -->
            </q-layout>
            <!-- <div class="q-pa-md">
              <div class="row justify-between">
                <q-fab v-model="fabRight" vertical-actions-align="right" color="primary" glossy icon="keyboard_arrow_up"
                  direction="up">
                  <q-fab-action label-position="left" color="primary" @click="onClick" icon="mail" label="Email" />
                  <q-fab-action label-position="left" color="secondary" @click="onClick" icon="alarm" label="Alarm" />
                  <q-fab-action label-position="left" color="orange" @click="onClick" icon="airplay" label="Airplay" />
                  <q-fab-action label-position="left" color="accent" @click="onClick" icon="room" label="Map" />
                </q-fab>
              </div>
            </div> -->
          </div>
        </q-page>

        <!-- btn flotante -->
        <div class="q-pa-md float-left" style="">
          <div>
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
              <q-fab
                v-model="fab1"
                label="Ayuda"
                label-position="top"
                label-class="bg-grey-3 text-purple"
                external-label
                color="yellow-8"
                icon="warning"
                direction="left"
                padding="sm"
              >
                <q-fab-action
                  label-class="bg-grey-3 text-grey-8"
                  external-label
                  label-position="top"
                  color="primary"
                  @click="onClick"
                  icon="book"
                  label="Manual"
                />

                <q-separator inset dark />

                <q-fab-action
                  label-class="bg-grey-3 text-grey-8"
                  external-label
                  label-position="top"
                  color="secondary"
                  @click="onClick"
                  icon="ti-bell"
                  label="Notificacion"
                />

                <q-separator inset dark />

                <q-fab-action
                  label-class="bg-grey-3 text-grey-8"
                  external-label
                  label-position="top"
                  color="orange"
                  @click="onClick"
                  icon="ti-video-clapper"
                  label="Video"
                />
              </q-fab>
            </q-page-sticky>
          </div>
        </div>
        <!-- fin del btn flotante -->

        <!-- btn flotante borrador -->
        <q-page-sticky position="bottom-right" :offset="[18, 78]">
          <q-btn
            fab
            icon="ti-eraser"
            color="red-8"
            @click="moveSelectedRow"
            padding="sm"
          />
        </q-page-sticky>
        <!-- fin del btn flotante -->

        <!-- btn flotante despacho -->
        <q-page-sticky position="bottom-right" :offset="[18, 138]">
          <q-btn
            fab
            icon="local_taxi"
            color="green-8"
            @click="lanzarCarrera"
            :disable="
              filaSeleccionada === -1 ||
              rowsAsignacion[filaSeleccionada]?.deactivate
            "
            padding="sm"
          />
        </q-page-sticky>
        <!-- fin del btn flotante -->
      </div>
    </div>
    <!-- <q-layout class="shadow-2 rounded-borders">

    </q-layout> -->
  </q-page>
</template>

<script>
import DashBoardView from "./DashboardView";
export default DashBoardView;
</script>

<style lang="scss" src="./DashboardView.scss"></style>
<style lang="sass" src="./DashboardView.sass"></style>
