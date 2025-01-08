import { defineStore } from 'pinia'

export const usePedidosStore = defineStore('pedidos', {
  state: () => ({
    lineasPedido: [], // Array para almacenar las líneas de pedido
    detalleArticulo: null, // Objeto para almacenar el detalle del artículo seleccionado
  }),
  getters: {
    // Incluir getters para acceder a los datos
  },
  actions: {
    // Incluir acciones para modificar el estado (agregar, eliminar, actualizar)
  }
})
