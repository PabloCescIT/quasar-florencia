<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          FLORENCIA - Recepción de pedidos
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered width="60">
      <q-list>
        <q-item v-for="(item, index) in menuItems" :key="index" clickable @click="goToRoute(item.route)">
          <q-item-section avatar>
            <q-icon :name="item.icon" size="25px" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-none">
        <div class="row">
          <linea-pedido />
          <fechas-rebaja />
          <lineas-pedido-recibidas />
          <detalles-articulo />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import LineaPedido from 'components/LineaPedido.vue'
import FechasRebaja from 'components/FechasRebaja.vue'
import LineasPedidoRecibidas from 'components/LineasPedidoRecibidas.vue'
import DetallesArticulo from 'components/DetallesArticulo.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


export default {
  components: {
    LineaPedido,
    FechasRebaja,
    LineasPedidoRecibidas,
    DetallesArticulo
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const menuItems = ref([
    { icon: 'admin_panel_settings', route: '/'},
    { icon: 'settings', route: '/'},
    { icon: 'add_shopping_cart', route: '/'},
    { icon: 'storefront', route: '/'},
    { icon: 'leaderboard', route: '/'},
    { icon: 'description', route: '/'},
    { icon: 'point_of_sale', route: '/'},
    { icon: 'euro_symbol', route: '/'},
    { icon: 'sync_alt', route: '/'},
    { icon: 'local_shipping', route: '/'},
    { icon: 'inventory_2', route: '/'},
    { icon: 'login', route: '/'},
    { icon: 'inventory', route: '/'},
    { icon: 'production_quantity_limits', route: '/'},
    { icon: 'change_circle', route: '/'},
    { icon: 'restore', route: '/'},
    { icon: 'storage', route: '/'},
    { icon: 'request_quote', route: '/'},
    { icon: 'construction', route: '/'},

    ])

    const router = useRouter()
    const goToRoute = (route) => {
      if (route) router.push(route)
    }
    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    return {
      leftDrawerOpen,
      menuItems,
      toggleLeftDrawer,
      goToRoute
    }
  }
}
</script>
