<template>
  <div class="col-12 col-sm-4">
    <div
      class="bg-primary text-white text-h6 q-pa-sm row justify items-center"
    >
      <q-icon
        name="sell"
        class="q-mr-sm" />
      <div>
        Fechas rebaja
      </div>
        <q-checkbox
          name="check_fechas_rebaja"
          v-model="checkFechasRebaja"
        />
    </div>

    <q-toolbar class="q-py-sm">
      <q-select
        class="q-mx-none"
        dense
        label="Buscar articulo"
        style="width: 100%"
        v-model="buscar_articulo"
        :options="options_buscar_articulo"
      >
        <template v-slot:append>
          <div class="row no-wrap">
            <q-btn
              flat
              round
              dense
              icon="edit"
              @click="editArticulo"
            />
            <q-btn
              flat
              round
              dense
              icon="close"
              @click="deleteArticulo"
            />
          </div>
        </template>
      </q-select>
    </q-toolbar>
  </div>
</template>

<script>
import { ref } from 'vue'

const buscar_articulo = ref(null);
const options_buscar_articulo = ref([
  'SHORT FLUID',
  'SHORT FLUID 2',
  'SHORT FLUID 3',
  'SHORT FLUID 4'
]);

export default {
  setup() {
    const editArticulo = () => {
      // Falta añadir la lógica
    }

    const deleteArticulo = () => {
      // Falta añadir la lógica
    }

    return {
      checkFechasRebaja: ref(false),
      buscar_articulo,
      options_buscar_articulo,
      editArticulo,
      deleteArticulo
    }
  }
}
</script>



