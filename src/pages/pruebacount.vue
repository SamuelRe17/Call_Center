<template>
  <div>
    <q-table :rows="tableRows" :columns="tableColumns" row-key="id">
      <template v-slot:body-cell-countdown="props">
        <div>
          {{ formatTime(props.row.countdown) }}
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue';
import { QTable } from 'quasar';

export default defineComponent({
  name: 'CountPage',
  components: {

    QTable,
  },
  setup() {
    const tableRows = ref([
      { id: 1, name: 'Item 1', countdown: -60 },
      { id: 2, name: 'Item 2', countdown: -120 },
      // Agrega más filas según sea necesario
    ]);

    const tableColumns = [
      { name: 'name', required: true, label: 'Name', align: 'left', field: 'name' },
      { name: 'countdown', required: true, label: 'Countdown', align: 'left', field: 'countdown' },
    ];

    const formatTime = (seconds) => {
      const absSeconds = Math.abs(seconds);
      const minutes = Math.floor(absSeconds / 60);
      const remainingSeconds = absSeconds % 60;
      return `${seconds < 0 ? '-' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const updateCountdown = () => {
      setInterval(() => {
        tableRows.value.forEach((row) => {
          row.countdown++;
        });
      }, 1000);
    };

    watchEffect(() => {
      updateCountdown();
    });

    return {
      tableRows,
      tableColumns,
      formatTime,
    };
  },
});
</script>
