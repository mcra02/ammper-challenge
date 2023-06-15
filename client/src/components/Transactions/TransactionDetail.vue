<template>
  <div>
    <q-separator
      v-if="$q.screen.xs"
      class="q-my-md"
    />
    <q-card
      flat
      bordered
      class="my-card"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
    >
      <q-card-section>
        <div
          v-if="data"
          class="row q-gutter-md"
        >
          <div class="col-12 text-h5 row justify-center">
            Detalle
          </div>
          <div class="col-12">
            Descripcion:
            {{ data.description }}
          </div>
          <div class="col-12">
            Comercio:
            {{ data.merchant.name }}
          </div>
          <div class="col-12">
            Ctaegoria:
            {{ data.category }}
          </div>
          <div class="col-12">
            Monto de transaccion:
            {{ `${data.amount} ${data.currency}` }}
          </div>
          <div class="col-12">
            Estado de transaccion:
            <q-badge :color="transactionStatus[data.status] === 'Procesado' ?'green' :transactionStatus[data.status] === 'Pendiente' ? 'red' : 'blue'">
              {{ transactionStatus[data.status] }}
            </q-badge>
          </div>
          <div class="col-12">
            Balance:
            {{ `${data.balance} ${data.currency}` }}
          </div>
          <div class="col-12">
            Fecha de trasaccion:
            {{ moment(data.value_date).format('LL') }}
          </div>
          <div class="col-12">
            Agencia:
            {{ data.account.agency }}
          </div>
        </div>
        <div
          v-else
          class="row justify-center"
        >
          Seleccione una trasaccion en la tabla
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'

const transactionStatus: any = {
  PENDING: 'Pendiente',
  PROCESSED: 'Procesado',
  UNCATEGORIZED: 'Sin Categoria'
}

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup () {
    return {
      transactionStatus,
      moment
    }
  }
})
</script>

<style scoped>

</style>
