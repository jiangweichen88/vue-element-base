<template>
	<div class="h100" @click="itemClick">
		<div style="height: 100%;" class="h100 w100" ref='bar'></div>
	</div>
</template>

<script>
	export default {
		props: {
			option: {
				series: [],
			},
			_this: {}
		},
		data() {
			return {
				myChart: null
			}
		},
		computed: {},
		watch: {
			option: {
				handler(newName, oldName) {
//					console.log(22, newName)
					this.setOpt();
				},
				deep: true,
				//								immediate: true,
			}
		},
		created() {

		},
		mounted() {

		},
		beforeDestroy() { // 在组件生命周期结束的时候销毁。
			window.removeEventListener('resize', () => this.myChart.resize())
		},
		methods: {
			itemClick() {
				this.$emit('chartsFatherClick')
			},
			setOpt() {
				let that = this;
				let dom = this.$refs.bar;
				let myChart = this.$echarts.getInstanceByDom(dom);
				if(!myChart) { // 如果不存在，就进行初始化。
					myChart = this.$echarts.init(dom);
				}
				myChart.setOption(this.option, true);
				this.myChart = myChart;
				this.$nextTick(function() {
					window.addEventListener('resize', () => {
						setTimeout(() => {
							if(this.myChart) {
								this.myChart.resize()
							}
						}, 1000)

					});

				})
				myChart.on('click', function(params) {
					that.$emit('chartsClick', params)
				})
			},
		}
	}
</script>

<style>

</style>