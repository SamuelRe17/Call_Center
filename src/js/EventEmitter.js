// eventBus.js
import { ref } from "vue";

const eventBus = ref({
  userAuthenticated: null,
});

export default eventBus;
