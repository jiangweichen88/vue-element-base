<template>
	<div class="dashboard-editor-container">
		<div class="board" style="width: 100%">
			<button @click="addItem">Add an item dynamically</button>
			<div class="home">
				<grid-layout :layout="layout" :col-num="12" :row-height="layoutConfig.rowHeight" :is-draggable="layoutConfig.isDraggable" :is-resizable="layoutConfig.isDraggable" :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="true" @layout-updated="layoutUpdatedEvent">
					<grid-item v-for="(item,index) in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" @movedEvent='movedEvent'>

						{{index}}
						<span class="remove" @click="removeItem(item.i)">x</span>
					</grid-item>
				</grid-layout>
			</div>
		</div>
		<div class="demo">
			<h4>v-time 指令</h4>
			<span v-time="now" format="Y/M月-D h:s"></span>
			<h4>v-clock 指令</h4>
			<span v-clock></span>
			<h4>v-down 指令</h4>
			<span v-down="time" style="color: red;"></span>
		</div>
		<ul>
			<li @click="message">message</li>
		</ul>

		<panel-group @handleSetLineChartData="handleSetLineChartData" />

		<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
			<line-chart :chart-data="lineChartData" />
		</el-row>

		<el-row :gutter="32">
			<el-col :xs="24" :sm="24" :lg="8">
				<div class="chart-wrapper">
					<raddar-chart />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="8">
				<div class="chart-wrapper">
					<pie-chart />
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="8">
				<div class="chart-wrapper">
					<bar-chart />
				</div>
			</el-col>
		</el-row>

		<el-row :gutter="8">
			<el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
				<transaction-table />
			</el-col>
			<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
				<todo-list />
			</el-col>
			<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
				<box-card />
			</el-col>
		</el-row>
	</div>
</template>

<script>
	// import  from '@/components/GithubCorner'
	import PanelGroup from './components/PanelGroup'
	import LineChart from './components/LineChart'
	import RaddarChart from './components/RaddarChart'
	import PieChart from './components/PieChart'
	import BarChart from './components/BarChart'
	import TransactionTable from './components/TransactionTable'
	import TodoList from './components/TodoList'
	import BoxCard from './components/BoxCard'
	import layout from './layoutData.json'
	import VueGridLayout from 'vue-grid-layout'
	const lineChartData = {
		newVisitis: {
			expectedData: [100, 120, 161, 134, 105, 160, 165],
			actualData: [120, 82, 91, 154, 162, 140, 145]
		},
		messages: {
			expectedData: [200, 192, 120, 144, 160, 130, 140],
			actualData: [180, 160, 151, 106, 145, 150, 130]
		},
		purchases: {
			expectedData: [80, 100, 121, 104, 105, 90, 100],
			actualData: [120, 90, 100, 138, 142, 130, 130]
		},
		shoppings: {
			expectedData: [130, 140, 141, 142, 145, 150, 160],
			actualData: [120, 82, 91, 154, 162, 140, 130]
		}
	}

	export default {
		name: 'DashboardAdmin',
		components: {
			PanelGroup,
			LineChart,
			RaddarChart,
			PieChart,
			BarChart,
			TransactionTable,
			TodoList,
			BoxCard,
			GridLayout: VueGridLayout.GridLayout,
			GridItem: VueGridLayout.GridItem
		},
		data() {
			return {
				lineChartData: lineChartData.newVisitis,
				time: "2023-03-20 13:16:00",
				layout: [],
				layoutConfig: {
					rowHeight: 100, // 默认高度
					isDraggable: true, // 是否可拖拽
					isResizable: true, // 是否可调整大小
					autoSize: true, // 标识容器是否自动调整大小
					preventCollision: false, // 防止碰撞属性，值设置为ture时，栅格只能拖动至空白处
					responsive: false, // 布局是否为响应式
					breakpoints: {
						lg: 1200,
						md: 996,
						sm: 768,
						xs: 480,
						xxs: 0
					}, //为响应式布局设置断点
				}
			}
		},
		computed: {
			now() {
				return Date.now();
			}
		},

		created() {
			console.log(this.$Utils);
			this.init()
		},
	 mounted() {
        // this.$gridlayout.load();
        this.index = this.layout.length;
    },
		methods: {
			init() {
				const aa = localStorage.getItem('jc-vue-grid-layout')
				if(aa) {
//					this.layout = layout.mainData
					this.layout = JSON.parse(aa)
				} else {

					this.layout = layout.mainData
				}
			},
			movedEvent(i, newX, newY) {

			},
			addItem: function() {
				// Add a new item. It must have a unique key!
				this.layout.push({
					x: (this.layout.length * 2) % (this.colNum || 12),
					y: this.layout.length + (this.colNum || 12), // puts it at the bottom
					w: 2,
					h: 2,
					i: this.index,
				});
				// Increment the counter to ensure key is always unique.
				this.index++;
			},
			removeItem: function(val) {
				const index = this.layout.map(item => item.i).indexOf(val);
				this.layout.splice(index, 1);
			},
			layoutUpdatedEvent(newLayout) {
				console.log(newLayout);
				localStorage.setItem('jc-vue-grid-layout', JSON.stringify(newLayout))
			},
			message() {
				//					console.log(this.$message)
				//									console.log(this.$message_jc)
				this.$message_jc({
					duration: 2000,
					type: 'success',
					message: 'hello vill-message'
				});
				//				this.$message_jc.success("hello vill-message");
			},
			handleSetLineChartData(type) {
				this.lineChartData = lineChartData[type]
			}
		}
	}
</script>
<style lang="scss" scoped>
	.dashboard-editor-container {
		padding: 32px;
		background-color: rgb(240, 242, 245);
		position: relative;
		.chart-wrapper {
			background: #fff;
			padding: 16px 16px 0;
			margin-bottom: 32px;
		}
	}
	
	.vue-grid-item {
		background: aquamarine;
	}
	.remove {
    position: absolute;
    right: 2px;
    top: 0;
    cursor: pointer;
}
	@media (max-width:1024px) {
		.chart-wrapper {
			padding: 8px;
		}
	}
</style>