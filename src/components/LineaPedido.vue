<template>
  <div class="col-12 col-sm-8">
    <div class="bg-primary text-white text-h6 q-pa-sm row justify-between items-center">
      <div>Línea pedido</div>
      <q-icon name="visibility" />
    </div>

    <q-toolbar class="q-py-sm">
      <q-select
        label="Proveedor"
        style="width: 150px"
        v-model="proveedor"
        :options="options"
      />
      <q-input
        v-model="fechaInicio"
        style="width: 150px"
        dense
        outlined
        type="date"
        class="q-mx-md"
      />
      <q-input
        v-model="fechaFin"
        style="width: 150px"
        dense
        outlined
        type="date"
        class="q-mr-md"
      />
      <q-input
        v-model="codArtProv"
        label="Cod.Art.Prov."
        class="q-mr-md"
      />
    </q-toolbar>

    <q-table
      flat
      bordered
      dense
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-bottom
    >
      <template v-slot:body-cell-acciones="props">
        <q-td :props="props">
          <div class="row q-gutter-sm">
            <q-btn
              flat
              round
              dense
              size="sm"
              icon="image"
              @click="showImagePopup(props.row)"
            />
            <q-btn
              flat
              round
              dense
              size="sm"
              color="primary"
              icon="done"
              @click="showInputPopup(props.row)"
            />
            <q-btn
              flat
              round
              dense
              size="sm"
              color="negative"
              icon="close"
              @click="showConfirm(props.rowIndex)"
            />
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-precio_u="props">
        <q-td :props="props">
          {{ props.value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
        </q-td>
      </template>

      <template v-slot:body-cell-fecha_pedido="props">
        <q-td :props="props">
          {{ new Date(props.value).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}
        </q-td>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="showImageDialog">
    <q-card>
      <q-card-section class="q-py-sm q-pr-sm">
        <div
        class="text-h6"
        >
        Imagen del producto
      </div>
      </q-card-section>
      <q-separator />
      <q-card-section
        class="q-pa-md"
      >
        <img :src="imageUrl" alt="Imagen" style="max-width: 100%;">
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <q-btn
          flat
          label="Cerrar"
          color="negative"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showInputDialog">
    <q-card>
      <q-card-section class="q-pa-md">
        <div
          class="text-h6"
        >
        Introduce un número
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section
      class="q-pa-md">
    <q-input
      type="number"
      label="Introduce un número"
    />
    </q-card-section>
    <q-separator />
    <q-card-actions>
      <q-btn
        flat
        label="OK"
        color="positive"
        v-close-popup />
        <q-btn
          flat label="Cancelar"
          color="negative"
          v-close-popup
        />
    </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

  const columns = [
    { name: 'acciones', align: 'left', label: 'Acciones', field: 'acciones' },
    { name: 'fecha_pedido', align: 'left', label: 'Fecha pedido', field: 'fecha_pedido' },
    { name: 'proveedor', align: 'left', label: 'Proveedor', field: 'proveedor' },
    { name: 'cod_art_prov', align: 'left', label: 'Cod.Art.Prov.', field: 'cod_art_prov' },
    { name: 'etiquetas', align: 'left', label: 'Etiquetas', field: 'etiquetas' },
    { name: 'id_pedido', align: 'left', label: 'ID Pedido', field: 'id_pedido' },
    { name: 'nombre', align: 'left', label: 'Nombre', field: 'nombre' },
    { name: 'talla', align: 'left', label: 'Talla', field: 'talla' },
    { name: 'precio_u', align: 'left', label: 'Precio U', field: 'precio_u' },
    { name: 'u_recibidas', align: 'left', label: 'U. Recibidas', field: 'u_recibidas' }
    ]
  const rows = ref([
    {
      acciones: '',
      fecha_pedido: '07/11/2024 15:09:06',
      proveedor: 'PROVE1709',
      cod_art_prov: 10,
      etiquetas: 'OTOÑO 22',
      id_pedido: 273,
      nombre: 'CAMISETA LERUX',
      talla: 'TU',
      precio_u: 10.90,
      u_recibidas: 0
    },
    {
      acciones: '',
      fecha_pedido: '07/11/2024 15:09:06',
      proveedor: 'PROVE1709',
      cod_art_prov: 10,
      etiquetas: 'OTOÑO 22',
      id_pedido: 273,
      nombre: 'CAMISETA LERUX',
      talla: 'TU',
      precio_u: 10.90,
      u_recibidas: 0
    },
    {
      acciones: '',
      fecha_pedido: '07/11/2024 15:09:06',
      proveedor: 'PROVE1709',
      cod_art_prov: 10,
      etiquetas: 'OTOÑO 22',
      id_pedido: 273,
      nombre: 'CAMISETA LERUX',
      talla: 'TU',
      precio_u: 10.90,
      u_recibidas: 0
    },
    ]);

    const proveedor = ref(null);
    const options = ref([
      'Proveedor 1',
      'Proveedor 2',
      'Proveedor 3',
      'Proveedor 4'
    ]);

    const fechaInicio = ref(null);
    const fechaFin = ref(null);
    const codArtProv = ref(null);

export default {

  setup() {

    const $q = useQuasar()
    const showImageDialog = ref(false);
    const showInputDialog = ref(false);
    const imageUrl = ref('');

    function showImagePopup(row) {
      imageUrl.value = 'https://bit.ly/imagen-florencia';
      showImageDialog.value = true;
    }

    function showInputPopup(row) {
      showInputDialog.value = true;
    }

    function showConfirm(rowIndex) {
      $q.dialog({
        title: 'Eliminar',
        message: '¿Estás seguro que quieres eliminar esta fila?',
        cancel: true,
        persistent: true,
        ok: {
          label: 'Aceptar',
          color: 'positive',
        },
        cancel: {
          label: 'Cancelar',
          color: 'negative',
        },
      }).onOk(() => {
        rows.value.splice(rowIndex, 1);
      }).onCancel(() => {
        console.log('Cancelado');
      });
    }


    return {
      rows,
      columns,
      proveedor,
      options,
      fechaInicio,
      fechaFin,
      codArtProv,
      showImageDialog,
      showInputDialog,
      imageUrl,
      showImagePopup,
      showInputPopup,
      showConfirm
    }
  }
}
</script>
