<template>
	<RightPanel :buttonTop='300' :width="300" iconName="el-icon-s-data" tooltipPosition='right' tooltipName='组件工厂' :leftBgShow='false'>
		<div class="drawer-container">
			<h3 class="drawer-title">组件工厂  <el-button @click="$emit('empty')" class="fr">清空</el-button></h3>
			<el-row :gutter="10" class="padtm10">
				<el-col v-for="item of iconArr" :span="8">
					<div class="item drawer-item" :class="{'active':item.active}">
						<div class="flex-d-c txc" @click="addConfig(item)">
							<i class="icon " :class="item.icon" />
							<h4>{{item.name}}</h4>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>

	</RightPanel>
</template>

<script>
	import RightPanel from '@/components/RightPanel'
	export default {
		name: '',
		mixins: [],
		components: {
			RightPanel,
		},
		props: {
			data: {
				title: '组件工厂',
				show: false,
				layout: []
			}
		},
		data() {
			return {
				iconArr: [{
						icon: 'el-icon-s-data',
						cName: 'BarChart',
						name: 'BarChart',
					},
					{
						icon: 'el-icon-s-data',
						cName: 'BoxCard',
						name: 'BoxCard',
					},

					{
						icon: 'el-icon-s-data',
						cName: 'LineChart',
						name: 'LineChart',
					}, {
						icon: 'el-icon-s-data',
						cName: 'PanelGroup',
						name: 'PanelGroup',
					},
					{
						icon: 'el-icon-s-data',
						cName: 'PieChart',
						name: 'PieChart',
					},

					{
						icon: 'el-icon-s-data',
						cName: 'RaddarChart',
						name: 'RaddarChart',
					},

					{
						icon: 'el-icon-s-data',
						cName: 'TransactionTable',
						name: 'TransactionTable',
					},
				],
			}
		},
		computed: {},
		watch: {
			data: {
				handler(newName, oldName) {
//					console.log(newName, newName.layout);
					this.iconArr = this.iconArr.map(item => {
//						console.log(newName.layout.some(item2 => item2.cName == item.cName))
						return {
							...item,
							active: newName.layout.some(item2 => item2.cName == item.cName),
						}
					})
				},
				deep: true,
				immediate: true,
			}
		},
		created() {},
		mounted() {},
		destroyed() {},
		methods: {
			addConfig(b) {
				const {
					name
				} = b;
				console.log(b);
				this.$emit('addConfig', b)
			},
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.drawer-container {
		padding: 24px;
		font-size: 14px;
		line-height: 1.5;
		word-wrap: break-word;
	}
	
	.drawer-title {
		margin-bottom: 12px;
		color: rgba(0, 0, 0, 0.85);
		font-size: 14px;
		line-height: 22px;
	}
	
	.drawer-item {
		color: rgba(0, 0, 0, 0.65);
		font-size: 14px;
		padding: 12px 0;
	}
	
	.item {
		cursor: pointer;
		margin-bottom: 10px;
		.icon {
			font-size: 26px;
		}
	}
	
	.item.active {
		color: #1890ff;
	}
</style>