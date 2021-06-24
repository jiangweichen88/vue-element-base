<template>
</template>

<script>
export default {
  name: '',
  mixins: [],
  components: {
  	'BarChart': () => import('@/views/dashboard/admin/components/BarChart.vue'),
  	'BoxCard': () => import('@/views/dashboard/admin/components/BoxCard.vue'),
  	'LineChart': () => import('@/views/dashboard/admin/components/LineChart.vue'),
  	'PanelGroup': () => import('@/views/dashboard/admin/components/PanelGroup.vue'),
  	'PieChart': () => import('@/views/dashboard/admin/components/PieChart.vue'),
  	'RaddarChart': () => import('@/views/dashboard/admin/components/RaddarChart.vue'),
  	'TransactionTable': () => import('@/views/dashboard/admin/components/TransactionTable.vue'),
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {}
} 
</script>

<style>
</style>