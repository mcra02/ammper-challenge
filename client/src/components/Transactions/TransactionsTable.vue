<template>
  <q-table
    :grid="$q.screen.xs"
    flat
    bordered
    title="Transacciones"
    :rows="data"
    :columns="columns"
    row-key="description"
    separator="cell"
    :loading="loading"
    :pagination="pagination"
    @row-click="onDetailRow"
  >
    <template #top>
      <q-space />
      <q-input
        v-model="formFilter.startDate"
        outlined
        mask="date"
        :rules="['date']"
        class="q-mx-sm"
        @update:model-value="handleFilter"
      >
        <template #append>
          <q-icon
            name="event"
            class="cursor-pointer"
          >
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="formFilter.startDate"
                @update:model-value="handleFilter"
              >
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    label="Close"
                    color="primary"
                    flat
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        v-model="formFilter.endDate"
        outlined
        mask="date"
        :rules="['date']"
        class="q-mx-sm"
        @update:model-value="handleFilter"
      >
        <template #append>
          <q-icon
            name="event"
            class="cursor-pointer"
          >
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="formFilter.endDate"
                @update:model-value="handleFilter"
              >
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    label="Close"
                    color="primary"
                    flat
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </template>
    <template #pagination="scope">
      <q-btn
        v-if="scope.pagesNumber > 2"
        icon="first_page"
        color="grey-8"
        round
        dense
        flat
        :disable="pagination.page === 1"
        @click="handlePagination(pagination, 'first')"
      />

      <q-btn
        icon="chevron_left"
        color="grey-8"
        round
        dense
        flat
        :disable="pagination.page === 1"
        @click="handlePagination(pagination, 'prev')"
      />

      <q-btn
        icon="chevron_right"
        color="grey-8"
        round
        dense
        flat
        :disable="pagination.page === Math.trunc(pagination.rowsNumber / pagination.rowsPerPage)"
        @click="handlePagination(pagination, 'next')"
      />

      <q-btn
        v-if="scope.pagesNumber > 2"
        icon="last_page"
        color="grey-8"
        round
        dense
        flat
        :disable="pagination.page === Math.trunc(pagination.rowsNumber / pagination.rowsPerPage)"
        @click="handlePagination(pagination, 'last')"
      />
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import moment from 'moment'

const transactionStatus: any = {
  PENDING: 'Pendiente',
  PROCESSED: 'Procesado',
  UNCATEGORIZED: 'Sin Categoria'
}

const columns: any[] = [
  {
    name: 'description',
    label: 'Descripcion',
    align: 'left',
    field: (row: any) => row.description,
    sortable: true
  },
  {
    name: 'merchant',
    label: 'Comercio',
    align: 'left',
    field: (row: any) => row.merchant.name,
    sortable: true
  },
  {
    name: 'category',
    label: 'Categoria',
    align: 'left',
    field: (row: any) => row.category,
    sortable: true
  },
  {
    name: 'amount',
    label: 'Cantidad',
    align: 'left',
    field: (row: any) => `${row.amount} ${row.currency}`,
    sortable: true
  },
  {
    name: 'status',
    label: 'Estado',
    align: 'left',
    field: (row: any) => transactionStatus[row.status],
    sortable: true
  },
  {
    name: 'balance',
    label: 'Balance',
    align: 'left',
    field: (row: any) => `${row.balance} ${row.currency}`
  },
  {
    name: 'date',
    label: 'Fecha de la transaccion',
    align: 'left',
    field: (row: any) => moment(row.value_date).format('YYYY-MM-DD')
  },
  {
    name: 'agency',
    label: 'Agencia',
    align: 'left',
    field: (row: any) => row.account.agency
  }

]

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => ([])
    },
    pagination: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['paginate', 'detail'],
  setup (_, ctx) {
    const formFilter = ref<any>({
      startDate: null,
      endDate: null
    })

    const handlePagination = (data: any, type: string) => {
      const paginate: any = {
        page: 1,
        page_size: 10,
        value_date__gte: null,
        value_date__lte: null
      }
      const limitPage = Math.trunc(data.rowsNumber / paginate.page_size)
      if (type === 'next') {
        paginate.page = data.page === limitPage ? limitPage : data.page + 1
      } else if (type === 'prev') {
        paginate.page = data.page === 1 ? 1 : data.page - 1
      } else if (type === 'first') {
        paginate.page = 1
      } else {
        paginate.page = limitPage
      }
      if (formFilter.value.startDate && formFilter.value.endDate) {
        const dateOne = moment(formFilter.value.startDate)
        const dateTwo = moment(formFilter.value.endDate)
        if (dateTwo.diff(dateOne, 'days') >= 5) {
          paginate.value_date__gte = dateOne.format('YYYY-MM-DD')
          paginate.value_date__lte = dateTwo.format('YYYY-MM-DD')
        }
      }
      if (!paginate.value_date__gte || !paginate.value_date__lte) {
        delete paginate.value_date__gte
        delete paginate.value_date__lte
      }
      ctx.emit('paginate', paginate)
    }

    const handleFilter = () => {
      const paginate: any = {
        page: 1,
        page_size: 10,
        value_date__gte: null,
        value_date__lte: null
      }
      if (formFilter.value.startDate && formFilter.value.endDate) {
        const dateOne = moment(formFilter.value.startDate)
        const dateTwo = moment(formFilter.value.endDate)
        if (dateTwo.diff(dateOne, 'days') >= 5) {
          paginate.value_date__gte = dateOne.format('YYYY-MM-DD')
          paginate.value_date__lte = dateTwo.format('YYYY-MM-DD')
        }
        if (!paginate.value_date__gte || !paginate.value_date__lte) {
          delete paginate.value_date__gte
          delete paginate.value_date__lte
        }
        ctx.emit('paginate', paginate)
      }
    }

    const onDetailRow = (evt: any, data: any) => {
      ctx.emit('detail', data)
    }

    return {
      columns,
      handlePagination,
      formFilter,
      handleFilter,
      onDetailRow
    }
  }
})
</script>

<style scoped>

</style>
