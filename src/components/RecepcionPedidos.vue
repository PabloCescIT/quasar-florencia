<template>
  <q-page padding>
    <div class="row q-col-gutter-none">
      <div class="col-6">
        <q-card>
          <q-card-section class="bg-primary text-white ">
            <div class="text-h6">Línea pedido</div>
          </q-card-section>
          <q-card-section>

          </q-card-section>
        </q-card>
      </div>
      <div class="col-6">
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Fechas rebaja</div>
          </q-card-section>
          <q-card-section>
            </q-card-section>
        </q-card>
      </div>
      <div class="col-6">
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Líneas de pedido recibidas</div>
          </q-card-section>
          <q-card-section>
            </q-card-section>
        </q-card>
      </div>
      <div class="col-6">
        <q-card>
          <q-card-section class="bg-primary text-white ">
            <div class="text-h6">Detalles artículo</div>
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

    const columns = [
      { name: 'primero', label: 'Primero', field: 'primero' },
      { name: 'acciones', label: 'Acciones', field: 'acciones' },
      // ... otras columnas
    ]

    return {
      pedidosStore,
      columns
    }
  }
})
</script>
