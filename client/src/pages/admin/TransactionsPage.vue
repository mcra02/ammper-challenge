<template>
  <q-page class="row items-center justify-evenly">
    <div class="row full-width">
      <div class="col-12 q-pa-sm">
        <apexchart
          v-if="!loading"
          height="300"
          width="90%"
          type="area"
          :options="options"
          :series="series"
        />
        <q-inner-loading
          v-else
          :showing="loading"
          label="Cargando..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />
      </div>
    </div>
    <div class="row ">
      <div class="col-sm-6 col-12 q-pa-sm">
        <TransactionsTable
          :loading="loading"
          :data="data"
          :pagination="pagination"
          @paginate="findAllTransactions"
          @detail="onDetail"
        />
      </div>
      <div class="col-sm-6 col-12 q-pa-sm">
        <TransactionDetail :data="detail" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import TransactionsTable from 'components/Transactions/TransactionsTable.vue'
// import TransactionsCharts from 'components/Transactions/TransactionCharts.vue'
import TransactionDetail from 'components/Transactions/TransactionDetail.vue'
import { api } from 'boot/axios'
import moment from 'moment'

export default defineComponent({
  name: 'IndexPage',
  components: {
    TransactionsTable,
    // TransactionsCharts,
    TransactionDetail
  },
  setup () {
    const loading = ref<boolean>(false)
    const data = ref([])
    const detail = ref<any>(null)

    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 500
    })

    const series = ref([{
      name: 'Monto de transaccion',
      type: 'column',
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
    }, {
      name: 'Balance',
      type: 'line',
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
    }])
    const options = ref<any>({
      chart: {
        height: 350,
        type: 'line'
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: 'Traffic Sources'
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [],
      xaxis: {
        type: 'date'
      },
      yaxis: [{
        title: {
          text: 'Monto de transaccion'
        }

      }, {
        opposite: true,
        title: {
          text: 'Balance'
        }
      }]
    })

    const findAllTransactions = async (params?:any) => {
      loading.value = true
      const auth = JSON.parse(localStorage.getItem('auth') ?? '{}')
      const res = await api.get('/belvo/transactions', {
        headers: {
          Authorization: `Bearer ${auth.token}`
        },
        params: params ?? {
          page: 1,
          page_size: 10
        }
      })
      data.value = res.data.results
      pagination.value.rowsNumber = res.data.count
      if (params) {
        pagination.value.page = params.page
        pagination.value.rowsPerPage = params.page_size
      }
      // loading.value = false

      const reduce = (array: any[], key:any) => array.reduce((acc, d) => {
        const foundIndex = acc.findIndex((a: any) => {
          return a.label === d[key]
        })
        if (foundIndex > -1) {
          acc[foundIndex].amount = acc[foundIndex].amount + d.amount
          acc[foundIndex].balance = d.balance
        } else {
          acc.push({ label: d[key], amount: d.amount, balance: d.balance })
        }
        return acc
      }, [])

      const mapArray = (arr: any[]) => {
        const labels: string[] = []
        const amountDaily: number[] = []
        const balanceLast: number[] = []
        arr.forEach((item: any) => {
          labels.push(moment(item.label).format('DD MMM YYYY'))
          amountDaily.push(item.amount)
          balanceLast.push(item.balance)
        })
        return { labels, amountDaily, balanceLast }
      }

      const charts = reduce(data.value, 'value_date')
      const currentPropsArray = mapArray(charts)
      options.value.labels = currentPropsArray.labels
      series.value[0].data = currentPropsArray.amountDaily
      series.value[1].data = currentPropsArray.balanceLast
      console.warn(options.value.labels)
      loading.value = false
    }

    const onDetail = (data:any) => {
      detail.value = data
    }

    onMounted(() => {
      findAllTransactions()
    })

    return {
      data,
      loading,
      pagination,
      findAllTransactions,
      onDetail,
      detail,
      options,
      series
    }
  }
})
</script>
