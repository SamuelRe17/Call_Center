<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
      <q-toolbar>
        <q-btn flat @click="toggleLeftDrawer()" round dense icon="menu" />
        <q-toolbar-title>Call center</q-toolbar-title>
        <!-- <q-avatar  >
            <q-btn round color="red-5" icon="ti-power-off"  @click="submitForm()" />
          </q-avatar> -->
        <div class="dashboard-view-account-container">
          <div class="date">
            {{ dateFormat() }}
          </div>
          <q-separator
            vertical
            inset
            class="q-mx-lg dashboard-view-separator"
          />
          <div class="reloj">
            <div class="hora">{{ horas }}</div>
            <div class="divisor">:</div>
            <div class="minuto">{{ minutos }}</div>
            <div class="divisor">:</div>
            <div class="segundo">{{ segundos }}</div>
          </div>
          <q-separator
            vertical
            inset
            class="q-mx-lg dashboard-view-separator"
          />
          <div class="user">
            <!-- {{ usuarioAutenticado.user }}
            <span class="role" v-if="usuarioAutenticado.rol == 1">Administrador</span>
            <span class="role" v-if="usuarioAutenticado.rol == 2">Operador</span> -->
            Andrescall
            <span class="role">Administrador</span>
          </div>
          <div class="image">
            <q-avatar size="42px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </div>
          <q-btn-dropdown flat class="dropdown-btn">
            <q-list>
              <q-item
                class="dashboard-view__item"
                to="/profile"
                clickable
                v-close-popup
              >
                <q-item-section>
                  <q-item-label>Mi Perfil</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                class="dashboard-view__item"
                clickable
                v-close-popup
                @click="logout"
              >
                <q-item-section>
                  <q-item-label>Cerrar Sesión</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" hide-if-above bordered ref="miDrawer">
      <q-list>
        <q-item-label header> Despachos </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-btn label="abre" @click="openModal"></q-btn>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import SidebarLayout from "./Sidebar";
export default SidebarLayout;
</script>
<style lang="scss" src="./Sidebar.scss"></style>
