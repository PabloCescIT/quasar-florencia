<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card>
          <q-card-section class="bg-red-10 text-white">
            <div class="text-h6">Línea pedido</div>
            <q-table
              title="Líneas de pedido"
              :rows="pedidosStore.lineasPedido"
              :columns="columns"
              row-key="id"
            >
  </q-table>
          </q-card-section>
          <q-card-section>
            </q-card-section>
        </q-card>
      </div>
      <div class="col-12">
        <q-card>
          <q-card-section class="bg-red-10 text-white">
            <div class="text-h6">Líneas de pedido recibidas</div>
          </q-card-section>
          <q-card-section>
            </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { usePedidosStore } from '../stores/pedidos'

export default defineComponent({
  setup() {
    const pedidosStore = usePedidosStore()

    return {
      pedidosStore
    }
  }
})

const columns = [
  { name: 'primero', label: 'Primero', field: 'primero' },
  { name: 'acciones', label: 'Acciones', field: 'acciones' },
]
</script>
