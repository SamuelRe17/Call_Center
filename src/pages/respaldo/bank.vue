<template>
  <div class="">
    <!-- <div class="q-pa-md"></div> -->
    <!-- shadow-2 rounded-borders -->
    <q-layout view="hHh Lpr lff" class="">
      <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Call center</q-toolbar-title>
          <!-- <q-avatar  >
            <q-btn round color="red-5" icon="ti-power-off"  @click="submitForm()" />
          </q-avatar> -->
          <div class="dashboard-view-account-container">
            <div class="date">
              {{ dateFormat() }}
            </div>
            <q-separator vertical inset class="q-mx-lg dashboard-view-separator" />
            <div class="reloj">
              <div class="hora">{{ horas }}</div>
              <div class="divisor">:</div>
              <div class="minuto">{{ minutos }}</div>
              <div class="divisor">:</div>
              <div class="segundo">{{ segundos }}</div>

            </div>
            <q-separator vertical inset class="q-mx-lg dashboard-view-separator" />
            <div class="user">
              {{ usuarioAutenticado.user }}
              <span class="role" v-if="usuarioAutenticado.rol == 1">Administrador</span>
              <span class="role" v-if="usuarioAutenticado.rol == 2">Operador</span>
            </div>
            <div class="image">
              <q-avatar size="42px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </div>
            <q-btn-dropdown flat class="dropdown-btn">
              <q-list>
                <q-item class="dashboard-view__item" to="/profile" clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Mi Perfil</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="dashboard-view__item" clickable v-close-popup @click="logout">
                  <q-item-section>
                    <q-item-label>Cerrar Sesión</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>


        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" hide-if-above :width="220" :breakpoint="500" bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
        <q-scroll-area class="fit">
          <q-list>

            <template v-for="(menuItem, index) in menuList" :key="index">
              <Sidebar />
            </template>
          </q-list>
        </q-scroll-area>


      </q-drawer>

      <q-page-container>

        <!-- <q-page padding> -->
        <q-page>
          <div class="WAL position-relative bg-white-4" :style="style">
            <q-layout view="lHh Lpr lFf" class=" shadow-3" container>

              <q-drawer v-model="leftDrawerOpen" show-if-above bordered :breakpoint="690">
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
                          <q-input v-model="user.id" type="number" label="ID" disable />
                          <q-input v-model="user.person" label="Nombre"
                            :rules="[val => val && val.length > 0 || 'Ingrese el nombre']" />
                          <q-input v-model="user.phone" label="Teléfono"
                            :rules="[val => val && val.length > 0 || 'Ingrese el telefono']" />
                          <q-input v-model="user.num_casa" label="Número de Casa" />
                          <div class="hola">
                            <q-input v-model="user.address" label="Dirección"
                              :rules="[val => val && val.length > 0 || 'Ingrese la direccion']" />
                            <div class="mapa">
                              <q-btn square color="secondary" @click="mostrarMapa">Mostrar Mapa <q-icon
                                  name="map" /></q-btn>
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
                  <q-input rounded outlined dense class="WAL__field full-width" bg-color="white" v-model="filtro"
                    placeholder="Buscar Cliente" @keydown.enter="addRow" @blur="clearSearch" @keyup.enter="clearSearch">
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </q-toolbar>


                <q-list>
                  <q-item v-for="(cliente, index) in arrayFiltro" :key="cliente.id" clickable v-ripple
                    @click="setCurrentConversation(index)">

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
                      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary"
                        align="justify" narrow-indicator>
                        <q-tab name="inicio" label="Inicio" />
                        <q-tab name="despachadas" label="Despachadas" />

                      </q-tabs>

                      <q-separator />

                      <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="inicio">
                          <q-page-container class="bg-grey-2 tablas interno">
                            <div class="" @click="containerClickedApp">
                              <q-table flat bordered title="APP" :rows="rowsApp" :columns="columnsapp" row-key="name"
                                hide-bottom style="height: 300px" virtual-scroll>

                                <template v-slot:body="props">
                                  <q-tr :class="{ 'selected-row': props.row.selected }"
                                    @click="toggleRowSelection(props.row, null)">
                                    <q-td v-for="col in columnsapp" :key="col.name">{{ props.row[col.name] }} </q-td>
                                  </q-tr>
                                </template>


                              </q-table>
                            </div>
                            <q-dialog v-model="showDialog">
                              <q-card>
                                <q-card-section>
                                  <div class="text-h6">para atender esta solicitud debe disponer de una unidad.</div>
                                </q-card-section>
                                <q-card-section>
                                  ¿Esta seguro(a) de Tomarla?
                                </q-card-section>
                                <q-card-actions align="right">
                                  <q-btn label="Cancelar" color="primary" @click="showDialog = false" />
                                  <q-btn label="Tomar" color="negative" @click="moveSelectApp" />
                                </q-card-actions>
                              </q-card>
                            </q-dialog>
                          </q-page-container>
                          <q-page-container class="bg-grey-2 tablas interno">
                            <div class="" @click="containerClicked">
                              <q-table flat bordered title="Asignacion" :rows="rowsAsignacion" :columns="columnsasig"
                                row-key="id" hide-bottom style="height: 300px" binar-sort class="my-sticky-header-table"
                                virtual-scroll :rows-per-page-options="[0]" :loading="loading">

                                <template v-slot:body="props">
                                  <q-tr :class="{ 'selected-row': props.row.selected }" :props="props"
                                    @click="toggleRowSelection(null, props.row)">

                                    <q-td key="entrada" :props="props">{{ props.row.entrada }}</q-td>
                                    <q-td key="sms" :props="props">{{ props.row.sms }}</q-td>
                                    <q-td key="hora" :props="props">{{ props.row.hora }}</q-td>
                                    <q-td key="telefono" :props="props">{{ props.row.telefono }}</q-td>
                                    <q-td key="codigo" :props="props">{{ props.row.codigo }}</q-td>
                                    <q-td key="cliente" :props="props">{{ props.row.cliente }}</q-td>
                                    <q-td key="barrio" :props="props">{{ props.row.barrio }}</q-td>
                                    <q-td key="direccion" :props="props">{{ props.row.direccion }}</q-td>
                                    <q-td key="cvaucher" :props="props">{{ props.row.cvaucher }}</q-td>
                                    <q-td key="unidad" :props="props">
                                      {{ props.row.unidad }}

                                      <q-popup-edit v-model="props.row.unidad" v-slot="scope">
                                        <q-input type="number" v-model="scope.value" dense autofocus counter
                                          @keyup.enter="() => { saveIntegerInput(scope); asignarUnidad(props.row); }" />

                                      </q-popup-edit>
                                    </q-td>
                                    <q-td key="tiempo" :props="props">{{ props.row.tiempo }}
                                      <q-popup-edit v-model="props.row.tiempo" v-slot="scope">
                                        <q-input type="number" v-model="scope.value" dense autofocus counter
                                          @keyup.enter="() => { saveIntegerInput(scope); asignarTiempo(props.row); }" />

                                      </q-popup-edit>
                                    </q-td>
                                    <q-td key="atrseg" :props="props">{{ formatTime(props.row.atrseg) }}</q-td>
                                    <q-td key="nota" :props="props">{{ props.row.nota }}</q-td>
                                    <q-td key="placav" :props="props">{{ props.row.placav }}</q-td>
                                    <q-td key="estado" :props="props">
                                      {{ props.row.estado }}
                                      <q-popup-edit v-model="props.row.estado" v-slot="scope" :label="props.row.estado">
                                        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                                      </q-popup-edit>
                                    </q-td>
                                  </q-tr>

                                </template>

                              </q-table>
                            </div>

                          </q-page-container>
                        </q-tab-panel>

                        <q-tab-panel name="despachadas">


                          <q-page-container class="bg-grey-2 tablas interno">
                            <div class="">
                              <q-table flat bordered title="Despacho" :rows="rowsDespacho" :columns="columnsDespacho"
                                row-key="name" hide-bottom style="height: 450px" virtual-scroll binary-state-sort
                                separator="cell" :rows-per-page-options="[0]">
                                <template v-slot:top-right>
                                  <div>
                                    <q-input v-model="date" filled type="date" hint="Ingrese la fecha"
                                      @change="consultaDespachadas()" />
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
              <q-fab v-model="fab1" label="Ayuda" label-position="top" label-class="bg-grey-3 text-purple" external-label
                color="yellow-8" icon="warning" direction="left">
                <q-fab-action label-class="bg-grey-3 text-grey-8" external-label label-position="top" color="primary"
                  @click="onClick" icon="book" label="Manual" />

                <q-separator inset dark />

                <q-fab-action label-class="bg-grey-3 text-grey-8" external-label label-position="top" color="secondary"
                  @click="onClick" icon="ti-bell" label="Notificacion" />

                <q-separator inset dark />

                <q-fab-action label-class="bg-grey-3 text-grey-8" external-label label-position="top" color="orange"
                  @click="onClick" icon="ti-video-clapper" label="Video" />

              </q-fab>
            </q-page-sticky>

          </div>
        </div>
        <!-- fin del btn flotante -->

        <!-- btn flotante borrador -->
        <q-page-sticky position="bottom-right" :offset="[18, 78]">
          <q-btn fab icon="ti-eraser" color="red-8" @click="moveSelectedRow" />
        </q-page-sticky>
        <!-- fin del btn flotante -->

        <!-- btn flotante despacho -->
        <q-page-sticky position="bottom-right" :offset="[18, 138]">
          <q-btn fab icon="local_taxi" color="green-8" @click="lanzarCarrera" />
        </q-page-sticky>
        <!-- fin del btn flotante -->

      </q-page-container>

    </q-layout>
    <!-- <q-layout class="shadow-2 rounded-borders">

    </q-layout> -->

  </div>
</template>

<script>
import { defineComponent, watchEffect } from 'vue'
import { useQuasar } from 'quasar'
import Sidebar from 'pages/sidebar.vue';
import 'bootstrap-icons/font/bootstrap-icons.css';
import moment from 'moment';
let $q
import { ref, computed } from 'vue'
import io from 'socket.io-client';
import Mapa from 'components/Mapa.vue';
import eventBus from '../../js/EventEmitter';
const menuList = [
  {
    icon: 'inbox',
    label: 'Inbox',
    separator: true
  },
]
const cliente = [

  {
    id: 31,
    person: 'Andres Alavardo',
    phone: '1234',
    num_casa: '071-23',
    address: 'Argentina y Brazil',
    barrio: 'San pedro',
    correo: 'user2@gmail.com',
    referencia: 'Frente al parque',
    corporativo: true,
    latitud: '',
    longitud: '',
    lastname: '',
    codigo_voucher: '',
    enviado_servidor: '',
    confiabilidad_gps: '',

  },
  {
    id: 32,
    person: 'Pablo Malla',
    phone: '456',
    num_casa: '071-23',
    address: 'Argentina y Brazil',
    barrio: 'San pedro',
    correo: 'user2@gmail.com',
    referencia: 'Frente al parque',
    corporativo: false,
    latitud: '',
    longitud: '',
    lastname: '',
    codigo_voucher: '',
    enviado_servidor: '',
    confiabilidad_gps: '',

  },
  {
    id: 33,
    person: 'Eduardo Riera',
    phone: '789',
    num_casa: '071-23',
    address: 'Av. 18 de noviembre y Mercadillo',
    barrio: 'Perpetuo socorro',
    correo: 'user3@gmail.com',
    referencia: 'Frente al parque',
    corporativo: false,
    latitud: '',
    longitud: '',
    lastname: '',
    codigo_voucher: '',
    enviado_servidor: '',
    confiabilidad_gps: '',

  },
  {
    id: 34,
    person: 'Franz Burneo',
    phone: '0876',
    num_casa: '071-23',
    address: 'Bernardo valdiviezo y 10 de Agosto',
    barrio: 'San Sebatian',
    correo: 'user4@gmail.com',
    referencia: 'Frente al parque',
    corporativo: false,
    latitud: '',
    longitud: '',
    lastname: '',
    codigo_voucher: '',
    enviado_servidor: '',
    confiabilidad_gps: '',

  },
  {
    id: 35,
    person: 'Jordy Celi',
    phone: '0976',
    num_casa: '071-23',
    address: 'Bernardo valdiviezo y 10 de Agosto',
    barrio: 'San Sebatian',
    correo: 'user33@gmail.com',
    referencia: 'frente al colegio',
    corporativo: false,
    latitud: '',
    longitud: '',
    lastname: '',
    codigo_voucher: '',
    enviado_servidor: '',
    confiabilidad_gps: '',

  }
]
const columnsapp = [
  { name: 'entrada', align: 'center', label: 'Entrada', field: 'entrada', sortable: true },
  { name: 'hora', label: 'Hora', field: 'hora', sortable: true },
  { name: 'pago', label: 'Pago', field: 'pago' },
  { name: 'telefono', label: 'Telefono', field: 'telefono' },
  { name: 'codigo', label: 'Codigo', field: 'codigo' },
  { name: 'cliente', label: 'Cliente', field: 'cliente', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'barrio', label: 'Barrio', field: 'barrio', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'direccion', label: 'Direccion', field: 'direccion' },
  { name: 'solicitud', label: 'Solicitud', field: 'solicitud' },
  { name: 'tiempo', label: 'Seg', field: 'tiempo' },
]
const columnsasig = [
  {
    name: 'entrada', align: 'center', label: 'Entrada', field: 'entrada', sortable: true, field: row => row.entrada,
    format: val => `${val}`, sortable: true
  },
  { name: 'sms', label: 'Sms', field: 'sms', sortable: true, align: 'center', align: 'center' },
  { name: 'hora', label: 'Hora', field: 'hora', sortable: true, align: 'center' },
  { name: 'telefono', label: 'Telefono', field: 'telefono', align: 'center' },
  { name: 'codigo', label: 'Codigo', field: 'codigo', align: 'center' },
  { name: 'cliente', label: 'Cliente', field: 'cliente', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10), align: 'center' },
  { name: 'barrio', label: 'Barrio', field: 'barrio', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10), align: 'center' },
  { name: 'direccion', label: 'Direccion', field: 'direccion', align: 'center' },
  { name: 'cvaucher', label: 'C.vaucher', field: 'cvaucher', align: 'center' },
  { name: 'unidad', label: 'Unidad', field: 'unidad', align: 'center' },
  { name: 'tiempo', label: 'Tiempo', field: 'tiempo', align: 'center' },
  { name: 'atrseg', label: 'Atr Seg', field: 'atrseg', align: 'center' },
  { name: 'nota', label: 'Nota', field: 'nota', align: 'center' },
  { name: 'placav', label: 'Placa V', field: 'placav', align: 'center' },
  { name: 'estado', label: 'Estado', field: 'estado', align: 'center' },
]
// const columnsDespacho = [
//   { name: 'entrada', align: 'center', label: 'Entrada', field: 'entrada', sortable: true },
//   { name: 'hora', label: 'Hora', field: 'hora', sortable: true },
//   { name: 'horaasig', label: 'H.Asig', field: 'horaasig', sortable: true },
//   { name: 'telefono', label: 'Telefono', field: 'telefono' },
//   { name: 'codigo', label: 'Codigo', field: 'codigo' },
//   { name: 'cliente', label: 'Cliente', field: 'cliente', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
//   { name: 'barrio', label: 'Barrio', field: 'barrio', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
//   { name: 'calles', label: 'Calles', field: 'calles' },
//   { name: 'cvaucher', label: 'C.vaucher', field: 'cvaucher' },
//   { name: 'unidad', label: 'Unidad', field: 'unidad' },
//   { name: 'tiempo', label: 'Tiempo', field: 'tiempo' },
//   { name: 'atr', label: 'Atr', field: 'atr' },
//   { name: 'nota', label: 'Nota', field: 'nota' },
//   { name: 'valoracion', label: 'Valoracion', field: 'valoracion' },
//   { name: 'observacion', label: 'Observaciones', field: 'observacion' },
// ]
const columnsDespacho = [
  { name: 'line', align: 'center', label: 'Entrada', field: 'line', sortable: true },
  { name: 'time', label: 'Hora', field: 'time', sortable: true },
  { name: 'time_asig', label: 'H.Asig', field: 'time_asig', sortable: true },
  { name: 'phone', label: 'Telefono', field: 'phone' },
  { name: 'code', label: 'Codigo', field: 'code' },
  { name: 'client', label: 'Cliente', field: 'client', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'sector', label: 'Barrio', field: 'sector', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'direction', label: 'Calles', field: 'direction' },
  { name: 'codigo_voucher', label: 'C.vaucher', field: 'codigo_voucher' },
  { name: 'vehiculo', label: 'Unidad', field: 'vehiculo' },
  { name: 'minute', label: 'Tiempo', field: 'minute' },
  { name: 'atraso', label: 'Atr', field: 'atraso' },
  { name: 'note', label: 'Nota', field: 'note' },
  { name: 'valoracion', label: 'Valoracion', field: 'valoracion' },
  { name: 'observacion', label: 'Observaciones', field: 'observacion' },
]

const rowsAsignacion = ref([
  {
    entrada: 'En curso',
    sms: 'hola',
    hora: '8:30',
    telefono: '987765',
    codigo: 1,
    cliente: 'Andres',
    barrio: ' La tebaida',
    direccion: 'Mexico y curazao',
    cvaucher: '0000',
    unidad: 22,
    tiempo: 5,
    atrseg: 'asd',
    nota: 'hola como estas',
    placav: 'laaa1111',
    estado: 'En Curso',
  },
  {
    entrada: 'Cancelada',
    sms: '',
    hora: '8:30',
    telefono: '987765',
    codigo: 2,
    cliente: 'asdaa',
    barrio: ' adsd',
    direccion: 'asdasd',
    cvaucher: 'asdasd',
    unidad: null,
    tiempo: 3,
    atrseg: 'asd',
    nota: 'asda',
    placav: 'asdad',
    estado: 'Cancelada',
  },
  {
    entrada: 'Confirmada',
    sms: '',
    hora: '8:30',
    telefono: '987765',
    codigo: 3,
    cliente: 'asdaa',
    barrio: ' adsd',
    direccion: 'asdasd',
    cvaucher: 'asdasd',
    unidad: null,
    tiempo: 4,
    atrseg: 'asd',
    nota: 'asda',
    placav: 'asdad',
    estado: 'Confirmada',
  }
]
)
const rowsDespacho = ref([
  {
    line: 'Entrada',
    time: '8:30',
    time_asig: '12:12:13',
    phone: '0983233118',
    code: 2,
    client: 'ANDRES2',
    sector: 'CAMPO SANTO LOS ROSALES',
    direction: 'VIA A MALACATOS Y /',
    codigo_voucher: 0,
    vehiculo: 22,
    minute: 5,
    atraso: -119,
    note: ' - Conf.',
    valoracion: 0,
    observacion: null
  }
])
const rowsApp = ref([
  {
    entrada: 'Andrioid',
    hora: '8:30',
    pago: 'EFECTIVO',
    telefono: '987765',
    codigo: 2,
    cliente: 'Andres',
    barrio: ' La tebaida',
    direccion: 'Mexico y curazao',
    solicitud: 'TOD......',
    tiempo: 3,
  },
])
// const rowsAsg = ref([...rowsAsignacion])
// const rowsDes = ref([...rowsDespacho])
// const rowsAp = ref([...rowsApp])
let h = 0
let s = 0
let m = 0

let texto
// const loading = ref(false)

// const rowCount = ref(10)
let serverURL = ''
let socket = null
export default defineComponent({
  name: 'bankPage',
  data() {
    return {
      horas: 0,
      minutos: 0,
      segundos: 0,
      texto: '',
      arrayFiltro: cliente,
      showDialog: false,
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
      clientes2: [],
      mostrarMapaBoll: false,
      latitud: null,
      longitud: null,
      direccion: null,
      mostrarMapaToggle: false,
      code: null,
      usuarioAutenticado: null,
      hora_asignacion: null,
    }
  },
  created() {
    serverURL = 'http://169.62.217.189:8080';
    socket = io(serverURL);
    this.cargar_clientes();
    this.usuarioAutenticado = eventBus.userAuthenticated;

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

  },
  mounted() {
    setInterval(() => this.setTiempo(), 1000), $q = useQuasar();
    // const serverURL = 'http://169.62.217.189:8080';
    // const solicitud1 = {
    //   acronimo: 'KRC',
    //   usuario: 'andrescall',
    // };

    // const listaIdesSolicitudes = {
    //   lista: ['User1', 'User2']
    // };

    // // Crear una instancia del socket cliente
    // const socket = io(serverURL);

    // // Manejar el evento de conexión
    // socket.on('connect', () => {
    //   console.log('Conectado al servidor');

    //   // Emitir el evento agregar_operador_call con los datos de la solicitud
    //   socket.emit('agregar_operador_call', solicitud1, listaIdesSolicitudes);
    // });

    // // Manejar el evento de desconexión
    // socket.on('disconnect', () => {
    //   console.log('Desconectado del servidor');
    // });

    // // Escuchar el evento en_nueva_solicitud
    // socket.on('en_nueva_solicitud', (dataNS) => {
    //   console.log('Evento en_nueva_solicitud recibido:', dataNS);
    //   let dataNStemporal = {
    //     entrada: `${dataNS.idPlataformaKtaxi}-${dataNS.idSolicitud}`,
    //     hora: dataNS['datosSolicitud']['hora'],
    //     pago: 'EFECTIVO',
    //     telefono: dataNS['datosSolicitud']['celular'],
    //     codigo: 2,
    //     cliente: dataNS['datosSolicitud']['nombres'],
    //     barrio: `${dataNS['datosSolicitud']['barrioCliente']}/${dataNS['datosSolicitud']['referenciaCliente']}`,
    //     direccion: `${dataNS['datosSolicitud']['callePrincipal']}/${dataNS['datosSolicitud']['calleSecundaria']}`,
    //     solicitud: 'TOD......',
    //     tiempo: 3,
    //   }
    //   // rowsAp.value.push(dataNStemporal)
    //   rowsApp.value.push(dataNStemporal)


    // });
    socket.on('en_respuesta_solicitud', (args) => {
      try {
        // let username = '';
        // const jsonEnRespuestaSol = JSON.parse(args[0]);
        // console.log('*******', jsonEnRespuestaSol);
        // const jsonDatosSol = jsonEnRespuestaSol.datosSolicitud;

        // if (jsonEnRespuestaSol.hasOwnProperty('username')) {
        //   username = jsonEnRespuestaSol.username;
        // }

        // const estado = jsonDatosSol.estado;

        // switch (estado) {
        //   case 4:
        //     actuarEnRespuestaSolicitudAtendiendo(jsonDatosSol, username);
        //     break;
        //   case 7:
        //     actuarEnRespuestaSOlicitudCancelada(jsonDatosSol, username);
        //     break;
        //   case 9:
        //     abordarVehiculo(jsonDatosSol.idSolicitud);
        //     break;
        //   default:
        //     break;
        // }
        console.log(args)
      } catch (ex) {
        console.log(ex.message);
      }
    });

  },

  computed: {
    filtro: {
      get() {
        return this.texto
      },
      set(value) {

        value = value.toLowerCase();

        // console.log(Number.isInteger(cliente))

        this.arrayFiltro = cliente.filter(cliente => cliente.id.toString().indexOf(value) !== -1)

        this.texto = value

        texto = this.texto

      }
    }

  },
  methods: {
    cargar_clientes() {
      this.$axios.get('http://localhost:3000/lc').then((response) => {

        this.clientes2 = response.data;

        this.clientes2.forEach(cliente => {
          let temporal = {
            id: cliente.code,
            person: cliente.name,
            phone: cliente.phone,
            num_casa: cliente.num_house,
            address: cliente.direction,
            barrio: cliente.sector,
            correo: cliente.correo_electronico,
            referencia: cliente.reference,
            corporativo: cliente.corporativo.data[0] == 0 ? false : true,
            latitud: cliente.latitud,
            longitud: cliente.longitud,
            lastname: cliente.lastname,
            codigo_voucher: cliente.codigo_voucher,
            enviado_servidor: cliente.enviado_servidor,
            confiabilidad_gps: cliente.confiabilidad_gps,
          }
          this.arrayFiltro.push(temporal)
        });

        console.log(cliente, "Aqui van los clientes")

      }).catch((error) => {
        console.error('Error al obtener clientes:', error);
      });
    },
    logout() {
      try {
        socket.close();
        console.log('Socket cliente cerrado.');
      } catch (ex) {
        console.log('No se ha podido cerrar el socket cliente: ' + ex.message);
      }
      this.$router.push('/');
    },
    obtenerUser() {
      console.log("hola")

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
      h = horas
      m = minutos
      s = segundos
    },

    clearSearch() {
      texto = ''
      this.texto = ''
      this.arrayFiltro = cliente
    },
    toggleRowSelection(row, row2) {
      // Realizar la acción deseada con la fila seleccionada (por ejemplo, mostrar detalles)
      // let newObject
      // newObject = { ...row }
      if (row2 != null) {
        console.log("hola como estas", row2)
        row2.selected = !row2.selected;
        this.rowsApp.forEach(row2 => {
          row2.selected = false;
        });

      } else if (row != null) {
        row.selected = !row.selected;
        this.rowsAsignacion.forEach(row => {
          row.selected = false;
        });

      }

      // console.log('Fila clickeada:', row);


      // Aquí puedes realizar la lógica que deseas al hacer clic en una fila
    },
    moveSelectedRow() {

      const selectedRowIndex = this.rowsAsignacion.findIndex(row => row.selected);
      const selectedRowIndexApp = this.rowsApp.findIndex(row => row.selected);

      if (selectedRowIndex != -1) {

        let selectedRow = this.rowsAsignacion[selectedRowIndex];
        selectedRow = { ...selectedRow }
        console.log("Aqui va la columna", selectedRow)
        console.log("Aqui va la hora de asignacion", this.hora_asignacion)
        if (selectedRow.estado == 'Confirmada') {
          const filaTemporal = {
            line: selectedRow.entrada,
            time: selectedRow.hora,
            time_asig: this.hora_asignacion,
            phone: selectedRow.telefono,
            code: selectedRow.codigo,
            client: selectedRow.cliente,
            sector: selectedRow.barrio,
            direction: selectedRow.direccion,
            codigo_voucher: selectedRow.cvaucher,
            vehiculo: selectedRow.unidad,
            minute: selectedRow.tiempo,
            atraso: selectedRow.atrseg,
            note: selectedRow.nota,
            valoracion: 0,
            observacion: '',

          }
          rowsAsignacion.value.splice(selectedRowIndex, 1);
          // rowsAsignacion.splice(selectedRowIndex, 1);
          // rowsDespacho.value.push(selectedRow);
          rowsDespacho.value.push(filaTemporal)
          console.log("aqui esta asg", rowsAsignacion)
          console.log("aqui esta despaclo", rowsDespacho)
          console.log("Aqui va la app", rowsApp)
        } else if (selectedRow.estado == 'En Curso' || selectedRow.estado == undefined) {
          $q.notify({
            type: 'negative',
            message: 'No se asginado la unidad'
          })
        } else {
          console.log(selectedRow.estado)
          rowsAsignacion.value.splice(selectedRowIndex, 1);
          // rowsAsignacion.splice(selectedRowIndex, 1);
          console.log("aqui esta asg", rowsAsignacion)
          console.log("aqui esta despaclo", rowsDespacho)
          console.log("Aqui va la app", rowsApp)

        }



      } else if (selectedRowIndexApp != -1) {

        this.showDialog = true;
      }
      else {
        console.log("No hay elementos seleccionados")

      }

    },
    // moveDespachado() {
    //   const selectedRowIndex = this.rowsAsignacion.findIndex(row => row.selected);
    //   if (selectedRowIndex != -1) {

    //     let selectedRow = this.rowsAsignacion[selectedRowIndex];
    //     selectedRow = { ...selectedRow }
    //     rowsAsg.value.splice(selectedRowIndex, 1);
    //     rowsAsignacion.splice(selectedRowIndex, 1);
    //     rowsDespacho.push(selectedRow);
    //     rowsDes.value.push(selectedRow)
    //     console.log("aqui esta asg", rowsAsignacion)
    //     console.log("aqui esta despaclo", rowsDespacho)
    //     console.log("Aqui va la app", rowsApp)


    //   }


    // },
    moveSelectApp() {
      const selectedRowIndexApp = this.rowsApp.findIndex(row => row.selected);
      let selectedRowApp = this.rowsApp[selectedRowIndexApp];
      selectedRowApp = { ...selectedRowApp }
      // rowsAp.value.splice(selectedRowIndexApp, 1);
      rowsApp.value.splice(selectedRowIndexApp, 1);
      // rowsAsignacion.push(selectedRowApp);
      rowsAsignacion.value.push(selectedRowApp)
      console.log(rowsApp)
      console.log(rowsAsignacion)
      this.showDialog = false;
    },
    containerClicked(event) {
      // Si el elemento clicado no es parte de la tabla, deselecciona las filas
      if (!event.target.closest('.q-table')) {
        this.rowsAsignacion.forEach(row => {
          row.selected = false;
        });
      }
    },
    containerClickedApp(event) {
      // Si el elemento clicado no es parte de la tabla, deselecciona las filas
      if (!event.target.closest('.q-table')) {
        this.rowsApp.forEach(row => {
          row.selected = false;
        });
      }
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
        corporativo: false
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
          num_house: this.user.num_casa.toUpperCase(),
          latitud: this.user.latitud,
          longitud: this.user.longitud,
          reference: this.user.referencia.toUpperCase(),
          enviado_servidor: this.user.enviado_servidor,
          corporativo: this.user.corporativo,
          codigo_voucher: this.user.codigo_voucher,
          correo_electronico: this.user.correo,
          confiabilidad_gps: this.user.confiabilidad_gps,
        }
        this.arrayFiltro.push(this.user)
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
    saveIntegerInput(scope) {
      // Convierte el valor a un número entero usando parseInt()
      const integerValue = parseInt(scope.value);
      console.log(integerValue)
      // Verifica si la conversión fue exitosa y actualiza el valor en scope
      if (!isNaN(integerValue)) {
        scope.value = integerValue;
        scope.set();
      } else {
        scope.value = null;
        scope.set();
      }
    },

    asignarUnidad(row) {
      //Lupre22
      console.log("hola soy la unidad", row.unidad, row.codigo)
      this.hora_asignacion = `${h}:${m}:${s}`;
      let objetosCoincidentes = cliente.filter((objeto) => objeto.id === row.codigo);
      objetosCoincidentes = { ...objetosCoincidentes[0] }
      console.log("el cliente de asigfnacion", objetosCoincidentes)
      console.log(objetosCoincidentes.latitud);

      try {
        // const serverURL = 'http://169.62.217.189:8080'; // Cambia la URL según tu configuración de servidor
        // const socket = io(serverURL);

        const envioSolicitud = {
          estado: 3,
          calificacion: null,
          idVehiculo: 0,
          abordadoPor: 0,
          usernameAtendio: null,
          idSolicitud: 0,
          unidad: row.unidad,
          pin: 0,
          tiempo: 0,
          chat: 1,
          idEmpresa: 4,
          empresa: 'Clipp Demo Loja',
          razon: 0,
          razonCancelada: null,
          username: -1
        }
        const datosSolicitud = {
          tiempoTranscurrido: null,
          retrasoApp: 0,
          chat: 0,
          datosSolicitud: {
            idSolicitudCc: '1692999799423-6507',
            latitud: objetosCoincidentes.latitud,
            idServicioActivo: 1,
            c: 0,
            callePrincipal: objetosCoincidentes.address,
            referenciaCliente: objetosCoincidentes.referencia,
            barrioCliente: objetosCoincidentes.barrio,
            nombres: objetosCoincidentes.person,
            longitud: objetosCoincidentes.longitud,
            id_aplicativo: 1,
            pin: 0,
            tiempo: 15,
            celular: objetosCoincidentes.phone,
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
        socket.emit('asignar_unidad', 1, envioSolicitud, datosSolicitud, (args) => {
          try {
            if (args.e != 1) {
              $q.notify({
                type: 'negative',
                message: args.m
              })
            }

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
    asignarTiempo(row) {
      // console.log("hola soy la unidad", row.unidad, row.codigo, 'y el tiempo', row.tiempo)
      row.atrseg = row.tiempo * -60
    },
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
    consultaDespachadas() {

      const dateForm = {
        fecha: this.date
      }

      this.$axios.post('http://localhost:3000/buscarPorFecha', dateForm)
        .then(response => {
          // Manejar la respuesta del servidor aquí
          console.log(response.data, "la data");
          if (response.data.length == 0) {
            rowsDespacho.value = []
          } else {
            response.data.forEach(fila => {
              rowsDespacho.value.push(fila)
            })
          }


        })
        .catch(error => {
          // Manejar los errores aquí
          console.error(error);
        });

    },
    lanzarCarrera() {
      const selectedRowIndex = this.rowsAsignacion.findIndex(row => row.selected);
      console.log(selectedRowIndex, "aqui va el index")
      let selectedRow = this.rowsAsignacion[selectedRowIndex];
      selectedRow = { ...selectedRow }
      console.log("Aqui va la columna", selectedRow)
      let objetosCoincidentes = cliente.filter((objeto) => objeto.id === selectedRow.codigo);
      objetosCoincidentes = { ...objetosCoincidentes[0] }
      console.log("el cliente de asigfnacion", objetosCoincidentes)
      try {
        // const serverURL = 'http://169.62.217.189:8080'; // Cambia la URL según tu configuración de servidor
        // const socket = io(serverURL);

        const datosSolicitud = {

          idAplicativo: 1,
          estado: 0,
          tipo: 0,
          realizadoDesde: 0,
          idPago: 7,
          referenciaCliente: objetosCoincidentes.referencia,
          idSolicitud: 0,
          nombreEmpresa: null,
          longitud: objetosCoincidentes.longitud,
          tiempo_establecido: 0,
          pin: 0,
          pedido: null,
          fecha_hora_registro: null,
          idEmpresa: 4,
          telefono: null,
          observacion: null,
          conP: 0,
          image: null,
          latitud: objetosCoincidentes.latitud,
          idDispositivo: '1',
          barrioCliente: objetosCoincidentes.barrio,
          tiempoAsignado: 0,
          ciudad: 1,
          empresa: null,
          caracteristicas: [1],
          calificaion: 0,
          valoracion: 0,
          usernameAtendio: null,
          nombreUsuario: null,
          nombres: 'CLIPP2',
          id_solicitud_general: 0,
          username_atendio: null,
          idCliente: 0,
          alias: null,
          celular: objetosCoincidentes.phone,
          placa: null,
          tFp: 5,
          apellidos: null,
          idVehiculo: 0,
          servicio: 'Call Center ',
          callePrincipal: objetosCoincidentes.address,
          vehiculo: 0,
          razonCancelado: 0,
          comentario: null,
          room: 1,
          id_empresa_atendio: 0,
          id_vehiculo: 0,
          reg_municipal: null,
          idSa: 4,
          id_empresa: 0,
          calleSecundaria: '',
          username: 0
        }
        const metadatos = {
          tipoRed: 'WIFI',
          usandoGps: 0,
          marca: 'PC',
          realizadoDesde: 6,
          versionSo: '0.01',
          nivelBateria: 100,
          versionKtaxi: '4.5',
          modelo: 'PC',
          idPlataformaKtaxi: 5,
          operadora: 'WIFI',
          tipoConexion: 1
        }
        console.log("aqui van el objeto", datosSolicitud)
        // Emitir el evento "asignar_unidad" al servidor

        socket.emit("solicitar_carrera_central", datosSolicitud, metadatos, (args) => {
          try {
            console.log(socket.id, " el socket del lanzar carrera")
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

            console.log(args)
          } catch (ex) {
            console.log("notificarSolicitudCentral Socket Node " + ex + " " + ex.cause + " " + ex.message);
          }
        });



        // Cerrar la conexión si estaba desconectada
        if (socket.disconnected) {
          socket.connect();
        }
      } catch (error) {
        console.error('Error al solicitar carrera central:', error);
      }


    }
  },
  components: {
    Sidebar,
    Mapa,
  },

  setup() {

    function dateFormat() {
      const date = new Date();
      moment.locale('es');
      return moment(date).format(`dddd, DD [de] MMMM [de] YYYY`);
    }
    const $q = useQuasar()

    const leftDrawerOpen = ref(false)
    const search = ref('')
    const message = ref('')
    const currentConversationIndex = ref(0)

    const currentConversation = computed(() => {
      return cliente[currentConversationIndex.value]
    })

    const style = computed(() => ({
      height: $q.screen.height + 'px'
    }))

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    function setCurrentConversation(index) {
      currentConversationIndex.value = index
    }
    const loading = ref(false)
    const filter = ref('')
    const rowCount = ref(10)
    const formatTime = (seconds) => {
      const absSeconds = Math.abs(seconds);
      const minutes = Math.floor(absSeconds / 60);
      const remainingSeconds = absSeconds % 60;
      return `${seconds < 0 ? '-' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const updateCountdown = () => {
      setInterval(() => {
        rowsAsignacion.value.forEach((row) => {
          row.atrseg++;
        });
      }, 1000);
    };

    watchEffect(() => {
      updateCountdown();
    });

    return {
      drawer: ref(false),
      menuList,
      dateFormat,
      leftDrawerOpen,
      search,
      message,
      currentConversationIndex,


      currentConversation,
      setCurrentConversation,
      style,

      toggleLeftDrawer,
      fab1: ref(false),
      fab2: ref(false),

      onClick() {
        // console.log('Clicked on a fab action')
      },
      columnsapp,
      columnsasig,
      columnsDespacho,
      rowsAsignacion: ref(rowsAsignacion),

      // rowsAsg,

      loading,
      filter,
      rowCount,
      rowsDespacho,
      // rowsDes,
      // rowsAp,
      rowsApp,
      tab: ref('inicio'),
      date: ref(''),

      // emulate fetching data from server
      addRow() {
        console.log("aqui esta la t", texto)
        console.log(`${h}:${m}:${s}`)

        loading.value = true
        let clienteSelect = {}
        for (let i = 0; i < cliente.length; i++) {
          const element = cliente[i];
          if (element.id === parseInt(texto)) {
            //console.log(element)
            clienteSelect = {
              entrada: 'Pruebas',
              sms: 'hola',
              hora: `${h}:${m}:${s}`,
              telefono: element.phone,
              codigo: element.id,
              cliente: element.person,
              barrio: element.barrio,
              direccion: element.address,
              cvaucher: '0000',
              unidad: '',
              tiempo: '',
              atrseg: '',
              nota: 'hola como estas',
              placav: 'laaa1111',
              estado: 'Confirmada',
            }
            // rowsAsignacion.value.push(clienteSelect)

          }
        }
        console.log("cliente seleccionado,", clienteSelect)
        if (Object.keys(clienteSelect).length != 0) {

          setTimeout(() => {
            const
              index = rowsAsignacion.value.length + 1,
              row = rowsAsignacion.value[Math.floor(Math.random() * rowsAsignacion.value.length)]

            if (rowsAsignacion.value.length === 0) {
              rowCount.value = 0
            }

            row.id = ++rowCount.value

            const newRow = clienteSelect // extend({}, row, { name: `${row.name} (${row.__count})` })
            rowsAsignacion.value = [...rowsAsignacion.value.slice(0, index), newRow, ...rowsAsignacion.value.slice(index)]
            loading.value = false

          }, 500)

          console.log("aqui esta el array", rowsAsignacion)
          console.log(rowsDespacho)
        } else {
          loading.value = false

        }

      },
      formatTime,
    }
  },
})
</script>
<style lang="scss">
.dashboard-view {
  &-toolbar {
    background-color: #FFFFFF !important;
    color: var(--q-primary) !important;
  }

  &-toolbar-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    >.information {
      display: flex;
      flex-direction: row;
      align-items: center;

      >.date {
        font-size: 12px;
        margin: 5px;
      }
    }
  }

  &-account-container {
    display: flex;

    >.user {
      display: flex;
      flex-direction: column;
      margin-right: 12px;

      >.role {
        color: #FFFFFF;
      }
    }

    >.dropdown-btn {
      padding: 10px 8px;
    }
  }

  &__item {
    font-family: 'Meta Pro Regular';
    color: var(--q-primary) !important;
  }



}

.mini-icon {
  font-size: 1.718em
}

//Responsive Design
@media only screen and (max-width: 560px) {
  .dashboard-view {
    &-toolbar {
      >.hamburger {
        display: block;
      }
    }

    &-toolbar-container {
      >.information {
        >.date {
          display: none;
        }
      }
    }

    &-account-container {
      >.user {
        display: none;
      }

      >.image {
        display: none;
      }
    }

    &-separator {
      display: none;
    }
  }
}

.hide-icon .icon {
  display: none;
}

.reloj {
  display: inline-flex;

}
</style>
<style>
.q-drawer--left.q-drawer--bordered {
  width: 240px !important;
}

.tablas {
  padding-left: 238px !important;

}

.WAL {
  /* height: 997.2px !important; */
  height: 766.2px !important;
}

.selected-row {
  background-color: rgb(180, 234, 234);
  /* Cambia el color de fondo deseado */
}

.interno {
  padding-left: 0px !important;
}

.q-tab-panel {
  padding: 0px;
}

.formCliente {
  width: 550px;
}
</style>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #ffff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>

