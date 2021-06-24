<template>
	<div class="dashboard-editor-container">
		<div>
			<ConfigsAdd :data="configsOpt" @addConfig='addConfig' @empty="empty">
			</ConfigsAdd>
		</div>
		<div class="board" style="width: 100%">
			<div class="home">
				<grid-layout :layout="layout" :col-num="12"  :row-height="layoutConfig.rowHeight" :is-draggable="layoutConfig.isDraggable" :is-resizable="layoutConfig.isDraggable" :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="true" @layout-updated="layoutUpdatedEvent">
					<grid-item v-for="(item,index) in layout" :min-w="4" :minW="4" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" @movedEvent='movedEvent'>
						<el-card class="box-card">
							<div slot="header" class="clearfix dis-f a-center">
								<span class="flex1">{{item.name+index}}</span>
								<i  @click="removeItem(item.i)" class="el-icon-close pointer" />
							</div>
							<component :is="item.cName" :chart-data="lineChartData" @emit='fns($event,item)'></component>
							<!--item.fn?fns[item.fn]:fn-->
						</el-card>
					</grid-item>
				</grid-layout>
			</div>
		</div>
	</div>

</template>

<script>
	import TodoList from './components/TodoList'
	import VueGridLayout from 'vue-grid-layout'
	import ConfigsAdd from '@/components/ConfigsAdd'
	import com from '@/mixins/com.vue'
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
		mixins: [com],
		components: {
			TodoList,
			GridLayout: VueGridLayout.GridLayout,
			GridItem: VueGridLayout.GridItem,
			ConfigsAdd,
		},
		data() {
			return {
				lineChartData: lineChartData.newVisitis,
				time: "2023-03-20 13:16:00",
				layout: [{
					"x": 0, //标识栅格元素位于第几列
					"y": 0, //标识栅格元素位于第几行
					"w": 4, //标识栅格元素的初始宽度，值为colWidth的倍数
					"h": 3, //标识栅格元素的初始高度，值为rowHeight的倍数
					"i": "0", //栅格中元素的ID。
					"cName": "PanelGroup",
					fn:'fn0',
					name:'组件PanelGroup',
				}],
				layoutConfig: {
					rowHeight: 100, // 默认高度
					isDraggable: true, // 是否可拖拽
					isResizable: true, // 是否可调整大小
					autoSize: true, // 标识容器是否自动调整大小
					preventCollision: false, // 防止碰撞属性，值设置为ture时，栅格只能拖动至空白处
					responsive: true, // 布局是否为响应式
					minW: 6,
					breakpoints: {
						lg: 1200,
						md: 996,
						sm: 768,
						xs: 480,
						xxs: 0
					}, //为响应式布局设置断点
				},
			}
		},
		computed: {
			now() {
				return Date.now();
			},
			configsOpt() {
				return{
					show: true,
					layout:this.layout,
					title:'组件工厂',
				}
			},
		},

		created() {
//			console.log(this.$Utils);
			this.init()
		},
		mounted() {
			// this.$gridlayout.load();
			this.index = this.layout.length;
		},
		methods: {
			fns($event,item){
				if(item.fn){
					this[item.fn]($event,item)
				}else{
					this.fn($event,item)
				}
			},
			fn($event,item){
				console.log('00',$event,item);
				
			},
			fn0($event,item){
				console.log('0',$event,item)
				this.handleSetLineChartData($event)
			},
			fn1($event,item){
				console.log('1',$event,item)
			},
			addConfig({
				name,
				cName
			}) {
				this.addItem({
				name,
				cName
			});
			},
			init() {
//				return
				const aa = localStorage.getItem('jc-vue-grid-layout')
				if(aa) {
					this.layout = JSON.parse(aa)
				} 
			},
			movedEvent(i, newX, newY) {

			},
			addItem({name,cName}) {
				// Add a new item. It must have a unique key!
				this.index++;
				this.layout.push({
					x: 0,
					y: 0, // puts it at the bottom
					w: 4,
					h: 3,
					i: this.index,
					"cName": cName,
					name:'组件'+name,
				});
				// Increment the counter to ensure key is always unique.
				
			},
			removeItem: function(val) {
				const index = this.layout.map(item => item.i).indexOf(val);
				this.layout.splice(index, 1);
			},
			empty(){
				this.layout=[];
			},
			layoutUpdatedEvent(newLayout) {
//				console.log(newLayout);
				localStorage.setItem('jc-vue-grid-layout', JSON.stringify(newLayout))
			},
			message() {
				//console.log(this.$message)
				//console.log(this.$message_jc)
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
		/*padding: 32px;*/
		background-color: rgb(240, 242, 245);
		position: relative;
		.chart-wrapper {
			background: #fff;
			padding: 16px 16px 0;
			margin-bottom: 32px;
		}
	}
	
	.vue-grid-item {
		/*background: aquamarine;*/
		background: #fff;
		overflow: hidden;
	}
	
	@media (max-width:1024px) {
		.chart-wrapper {
			padding: 8px;
		}
	}
</style>