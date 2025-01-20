<template>
  <div class="col-12 col-sm-8">
    <div class="bg-primary text-white text-h6 q-pa-sm">
      Líneas de pedido recibidas
    </div>
    <q-toolbar class="q-py-sm">
      <q-select
        class="q-mr-md"
        dense
        label="Albaranes pedido"
        type="number"
        style="width: 185px"
        v-model="albaranes_pedido"
        :options="options_albaranes_pedido"
      />
      <q-select
        class="q-mr-md"
        dense
        label="Fecha albarán pedido"
        type="date"
        style="width: 185px"
        v-model="fecha_albaran_pedido"
        :options="options_fecha_albaran_pedido"
      />
      <q-select
        class="q-mr-md"
        dense
        label="Centro"
        style="width: 185px"
        v-model="centro"
        :options="options_centro"
      />
      <q-select
        class="q-mr-md"
        dense
        label="Empresa"
        style="width: 185px"
        v-model="empresa"
        :options="options_empresa"
      />
      <q-select
        class="q-mr-md"
        dense
        label="Proveedor"
        style="width: 185px"
        v-model="proveedor_lineas"
        :options="options_proveedor"
      />
    </q-toolbar>
    <q-toolbar>
      <q-input
        class="q-mr-md"
        style="width: 185px"
        dense
        v-model="codigoAlbaran"
        label="Código albarán"
      />
      <q-btn
        class="q-mr-md q-pa-sm"
        unelevated
        color="primary"
        icon="add"
        style="width: 180px"
        label="NUEVO ALBARÁN"
      />
      <q-btn
        class="q-mr-md q-pa-sm"
        unelevated
        color="negative"
        icon="delete"
        style="width: 200px"
        label="ELIMINAR ALBARÁN"
      />
      <q-btn
        class="q-mr-md q-pa-sm"
        unelevated
        color="primary"
        icon="print"
        style="width: 50px"
      />
      <q-btn
        class="q-mr-md q-pa-sm"
        unelevated
        color="primary"
        icon="upload_file"
        style="width: 50px"
      />
    </q-toolbar>

    <q-table
      flat
      bordered
      dense
      :rows="rowsLineas"
      :columns="columnsLineas"
      row-key="name"
      hide-bottom
      class="q-pa-sm"
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
              @click="showImagePopup_lineas(props.row)"
            />
            <q-btn
              flat
              round
              dense
              size="sm"
              color="primary"
              icon="print"
              @click="showImagePopup_print(props.row)"
            />
            <q-btn
              flat
              round
              dense
              size="sm"
              color="negative"
              icon="delete"
              @click="showConfirm_lineas(props.rowIndex)"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-l="props">
        <div class="q-pa-md">
          <q-checkbox
            v-model="val"
            size="xs"
          />
        </div>
      </template>

      <template v-slot:body-cell-precio_u="props">
        <q-td :props="props">
          {{ props.value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
        </q-td>
      </template>

      <template v-slot:body-cell-total="props">
        <q-td :props="props">
          {{ props.value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
        </q-td>
      </template>

    </q-table>
    <div
      class="q-py-sm"
      align="right"
    >
      <q-btn
        class="q-pa-sm"
        unelevated
        color="primary"
        style="width: 180px"
        label="CONFIRMAR RECEPCIÓN"
      />
    </div>
  </div>

  <q-dialog v-model="showImageDialog_lineas">
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
        <img :src="imageUrlLineas" alt="Imagen" style="max-width: 100%;">
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
  <q-dialog v-model="showImageDialog_print">
    <q-card>
      <q-card-section class="q-py-sm q-pr-sm">
        <div
        class="text-h6"
        >
        ¿Deseas imprimirlo?
      </div>
      </q-card-section>
      <q-separator />
      <q-card-section
        class="q-pa-md"
      >
        <img :src="imageUrlPrint" alt="Imagen" style="max-width: 100%;">
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
</template>

<script>

import { ref } from 'vue'
import { useQuasar } from 'quasar'

const columnsLineas = [
    { name: 'acciones', align: 'left', label: 'Acciones', field: 'acciones' },
    { name: 'proveedor', align: 'left', label: 'Proveedor', field: 'proveedor' },
    { name: 'cod_art', align: 'left', label: 'Cod.Art.', field: 'cod_art' },
    { name: 'etiquetas', align: 'left', label: 'Etiquetas', field: 'etiquetas' },
    { name: 'nombre', align: 'left', label: 'Nombre', field: 'nombre' },
    { name: 'color', align: 'left', label: 'Color', field: 'color' },
    { name: 'talla', align: 'left', label: 'Talla', field: 'talla' },
    { name: 'u_pe', align: 'left', label: 'U Pe', field: 'u_pe' },
    { name: 'u_r', align: 'left', label: 'U. R', field: 'u_r' },
    { name: 'precio_u', align: 'left', label: 'Precio U', field: 'precio_u' },
    { name: 'total', align: 'left', label: 'Total', field: 'total' },
    { name: 'incidencia', align: 'left', label: 'Incidencia', field: 'incidencia' },
    { name: 'l', align: 'left', label: 'L', field: 'l' }
    ]
  const rowsLineas = ref([
    {
      acciones: '',
      proveedor: 'PROVE1828',
      cod_art: 10,
      etiquetas: 'PRIMAVERA23',
      nombre: 'SHORT FLUID',
      color: 'BLANC',
      talla: 'TU',
      u_pe: 0,
      u_r: 1,
      precio_u: 3.7,
      total: 3.7,
      incidencia: null,
      l: ''
    },
    {
      acciones: '',
      proveedor: 'PROVE1828',
      cod_art: 10,
      etiquetas: 'PRIMAVERA23',
      nombre: 'SHORT FLUID',
      color: 'BLAU',
      talla: 'TU',
      u_pe: 0,
      u_r: 2,
      precio_u: 3.7,
      total: 7.4,
      incidencia: null,
      l: ''
    },
    {
      acciones: '',
      proveedor: 'PROVE1828',
      cod_art: 10,
      etiquetas: 'PRIMAVERA23',
      nombre: 'SHORT FLUID',
      color: 'BLAU MARI',
      talla: 'TU',
      u_pe: 0,
      u_r: 4,
      precio_u: 3.7,
      total: 14.8,
      incidencia: null,
      l: ''
    },
    {
      acciones: '',
      proveedor: 'PROVE1828',
      cod_art: 10,
      etiquetas: 'PRIMAVERA23',
      nombre: 'SHORT FLUID',
      color: 'BLAU CEL',
      talla: 'TU',
      u_pe: 0,
      u_r: 6,
      precio_u: 3.7,
      total: 22.20,
      incidencia: null,
      l: ''
    },
    {
      acciones: '',
      proveedor: 'PROVE1828',
      cod_art: 10,
      etiquetas: 'PRIMAVERA23',
      nombre: 'SHORT FLUID',
      color: 'BLAU ELECTRIC',
      talla: 'TU',
      u_pe: 0,
      u_r: 7,
      precio_u: 3.7,
      total: 25.9,
      incidencia: null,
      l: ''
    },
    {
      acciones: '',
      proveedor: 'PROVE1828',
      cod_art: 10,
      etiquetas: 'PRIMAVERA23',
      nombre: 'SHORT FLUID',
      color: 'CAMEL',
      talla: 'TU',
      u_pe: 0,
      u_r: 4,
      precio_u: 3.7,
      total: 14.8,
      incidencia: null,
      l: ''
    },
    {
      acciones: '',
      proveedor: 'PROVE1828',
      cod_art: 10,
      etiquetas: 'PRIMAVERA23',
      nombre: 'SHORT FLUID',
      color: 'FUCSIA',
      talla: 'TU',
      u_pe: 0,
      u_r: 2,
      precio_u: 3.7,
      total: 7.3,
      incidencia: null,
      l: ''
    },
    {
      acciones: '',
      proveedor: 'PROVE1828',
      cod_art: 10,
      etiquetas: 'PRIMAVERA23',
      nombre: 'SHORT FLUID',
      color: 'BEIX',
      talla: 'TU',
      u_pe: 0,
      u_r: 1,
      precio_u: 3.7,
      total: 3.7,
      incidencia: null,
      l: ''
    },
    ]);


const albaranes_pedido = ref(null);
const options_albaranes_pedido = ref([
      '1234',
      '5678',
      '9012',
      '3456'
    ]);

const fecha_albaran_pedido = ref(null);
const options_fecha_albaran_pedido = ref([
      '01/01/2025 00:00:00',
      '02/01/2025 00:00:00',
      '03/01/2025 00:00:00',
      '04/01/2025 00:00:00'
    ]);

const centro = ref(null);
const options_centro = ref([
      'Sede Sony España',
      'Sede NVIDIA España',
      'Sede Meta España',
      'Sede OpenAI España'
    ]);

const empresa = ref(null);
const options_empresa = ref([
      'Sony',
      'NVIDIA',
      'Meta',
      'OpenAI'
    ]);

const proveedor_lineas = ref(null);
const options_proveedor= ref([
      'Sony Barcelona',
      'NVIDIA Barcelona',
      'Meta Talavera de la Reina',
      'OpenAI El Mebrillo'
    ]);



export default {

  setup() {
    const $q = useQuasar()
    const showImageDialog_lineas = ref(false);
    const imageUrlLineas = ref('');
    const showImageDialog_print = ref(false);
    const imageUrlPrint = ref('');

    function showImagePopup_lineas(row) {
      imageUrlLineas.value = 'https://bit.ly/orslok_quasar';
      showImageDialog_lineas.value = true;
    }

    function showImagePopup_print(row) {
      imageUrlPrint.value = 'https://bit.ly/impresora_quasar';
      showImageDialog_print.value = true;
    }

    function showConfirm_lineas(rowIndex) {
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
        rowsLineas.value.splice(rowIndex, 1);
      }).onCancel(() => {
        console.log('Cancelado');
      });
    }

    return {
      columnsLineas,
      rowsLineas,
      albaranes_pedido,
      options_albaranes_pedido,
      fecha_albaran_pedido,
      options_fecha_albaran_pedido,
      centro,
      options_centro,
      empresa,
      options_empresa,
      proveedor_lineas,
      options_proveedor,
      showImageDialog_lineas,
      imageUrlLineas,
      showImageDialog_print,
      imageUrlPrint,
      showImagePopup_lineas,
      showImagePopup_print,
      showConfirm_lineas,
      val: ref(false)
    }
  }
}
</script>
