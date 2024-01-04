<template>
  <q-list class="menu-component">
    <q-item :active="link === 'home'" active-class="menu-component-item-active" clickable @click="link = 'home'">
      <q-item-section avatar>
        <q-icon class="menu-component-icon" name="home" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="menu-component-label">Despachos</q-item-label>
      </q-item-section>
    </q-item>
    <!-- <q-expansion-item expand-separator class="menu-component-icon menu-component-label" icon="grid_view"
          label="Gestión" clickable>
          <q-item :active="link === 'country'" active-class="menu-component-item-active" to="/country" clickable v-ripple
              @click="link = 'country'">
              <q-item-section class="menu-component-section">
                  <q-item-label class="menu-component-label">País</q-item-label>
              </q-item-section>
          </q-item>

          <q-item :active="link === 'city'" active-class="menu-component-item-active"  to="/city" clickable v-ripple
              @click="link = 'city'">
              <q-item-section class="menu-component-section">
                  <q-item-label class="menu-component-label">Ciudad</q-item-label>
              </q-item-section>
          </q-item>

      </q-expansion-item> -->
    <q-expansion-item expand-separator class="menu-component-icon menu-component-label" icon="grid_view"
      label="Administracion" clickable>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Personal</q-item-label>
        </q-item-section>
      </q-item>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Vehiculos</q-item-label>
        </q-item-section>
      </q-item>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Clientes</q-item-label>
        </q-item-section>
      </q-item>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Multas</q-item-label>
        </q-item-section>
      </q-item>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Lugares</q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>

    <!-- Opciones -->
    <q-expansion-item expand-separator class="menu-component-icon menu-component-label" icon="grid_view" label="Opciones"
      clickable>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Añadir pendientes</q-item-label>
        </q-item-section>
      </q-item>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Buscar Clientes</q-item-label>
        </q-item-section>
      </q-item>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Añadir clientes</q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>

    <!-- Reportes -->
    <q-expansion-item expand-separator class="menu-component-icon menu-component-label" icon="grid_view" label="Reportes"
      clickable>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Reportes</q-item-label>
        </q-item-section>
      </q-item>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Reporte unidad</q-item-label>
        </q-item-section>
      </q-item>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Reporte General</q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>
    <!-- Administrador -->
    <q-expansion-item expand-separator class="menu-component-icon menu-component-label" icon="grid_view"
      label="Administrador" clickable>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Usuarios</q-item-label>
        </q-item-section>
      </q-item>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Horarios</q-item-label>
        </q-item-section>
      </q-item>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Estados</q-item-label>
        </q-item-section>
      </q-item>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Configuracion</q-item-label>
        </q-item-section>
      </q-item>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Configuracion Central T.</q-item-label>
        </q-item-section>
      </q-item>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Sincronizacion</q-item-label>
        </q-item-section>
      </q-item>
      <q-item :active="link === 'report'" active-class="menu-component-item-active" to="/report" clickable v-ripple
        @click="link = 'report'">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">Eliminar audios</q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>
    <!-- Personalizacion -->
    <q-expansion-item expand-separator class="menu-component-icon menu-component-label" icon="grid_view"
      label="Personalizacion" clickable>
      <q-item>
        <div class="">
          <q-checkbox v-model="val1" />Silenciar notificaciones
        </div>
      </q-item>
      <q-item>
        <div class="">
          <q-checkbox v-model="val2" />No traer al frente
        </div>
      </q-item>
      <q-item>
        <div class="">
          <q-checkbox v-model="val3" />Aceptar Automatico
        </div>
      </q-item>
    </q-expansion-item>
    <!-- <q-item :active="link === 'home'" active-class="menu-component-item-deactive " clickable @click="link = 'home'">
          <q-item-section avatar>
              <q-icon class="menu-component-icon-warning " name="warning" />

          </q-item-section>
          <q-item-section>
              <q-item-label class="menu-component-label">Ayuda</q-item-label>
          </q-item-section>
      </q-item> -->
  </q-list>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { ref } from 'vue'
export default defineComponent({
  name: 'SidebarDef',
  setup() {

    const data = reactive({
      link: 'home',
    });


    return {
      ...toRefs(data),
      val1: ref(true),
      val2: ref(true),
      val3: ref(true),
    }
  }
});
</script>

<style lang="scss">
.menu-component {
  &-icon {
    color: var(--q-bold);
  }

  &-label {
    color: var(--q-bold);
    font-size: 16px;
    font-family: 'Meta Pro Regular';
    font-weight: 700;
  }

  &-section {
    margin-left: 2rem;
  }

  &-item-active {
    background-color: var(--q-primary);

    .menu-component-label {
      color: #0a0a0a;
    }
  }

  &-item-deactive {
    background-color: var(--q-negative);

    .menu-component-label {
      color: #0a0a0a;
    }
  }

  &-icon-warning {
    color: var(--q-warning);
  }
}
</style>
