
<template>
  <div>
    <h1>Lista de Tareas</h1>
    <ul>
      <li v-for="cliente in clientes" :key="cliente.id">{{ cliente.corporativo.data[0] }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'lisaClientes',
  data() {
    return {
      clientes: [],
      prueba: []

    };
  },
  created() {
    this.$axios.get('http://localhost:3000/lc').then((response) => {

      this.clientes = response.data;
      console.log(response.data)
      this.clientes.forEach(cliente => {
        let temporal = {
          id: cliente.id_client,
          person: cliente.name,
          phone: cliente.phone,
          num_casa: cliente.num_house,
          address: cliente.direction,
          barrio: cliente.sector,
          correo: cliente.correo_electronico,
          referencia: cliente.reference,
          corporativo: cliente.corporativo.data[0] == 0 ? false : true
        }

        this.prueba.push(temporal)
      });

      console.log(this.prueba, "hola")

    }).catch((error) => {
      console.error('Error al obtener tareas:', error);
    });
  },
};
</script>

<style>
/* Estilos aquí */
</style>
