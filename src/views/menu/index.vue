<template>
	<el-container class="h100 bg-c pad16 menu-jc ">
		<el-header class="pad0">
			<el-button type="primary" @click="save">
				保存
			</el-button>
			<el-button :disabled="changeArrs.length==1" @click="back">
				撤销
			</el-button>
			<el-button :disabled="changeArrs.length==1" @click="reset">
				还原
			</el-button>
		</el-header>

		<el-container class="h0">
			<el-aside class="mar0 pad0">
				<!--:render-content="renderContent"-->
				<el-tree class="permission-tree h100" @check="treeCheck" :render-content="renderContent" ref="tree" :render-after-expand="false" :default-checked-keys="defaultCheckedKeys" show-checkbox draggable :check-strictly="checkStrictly" :data="routesData" :props="defaultProps" node-key="pathFull" @node-click="nodeClick" @node-drop="handleDrop" @node-expand="nodeExpand" />
				<!--<span class="custom-tree-node dis-f" :slot-scope="{ node, data }">
        <span class="ellipsis padr10 flex1 w0">
        	{{ node.label }}
        </span>
				<span class='span  txr'>
          <el-button
            type="text"
            size="mini"
            @click="() => append(node,data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
				</span>-->
				</el-tree>
			</el-aside>
			<el-main class="bg-w marl16">
				<el-form v-if="Object.keys(form).length" ref="form" :model="form" label-width="102px">
					<el-form-item label="菜单中文名称">
						<el-input v-model="form.meta.title" />
					</el-form-item>
					<el-form-item label="菜单英文别名">
						<el-input v-model="form.name" />
					</el-form-item>
					<el-form-item label="路由地址">
						<el-input v-model="form.component" />
					</el-form-item>
					<el-form-item label="菜单图标">
						<el-input v-model="form.meta.icon" @focus="setIcon" />

						<el-dialog class="dialog-jc" title="选择图标" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
							<icons :icons-opt="iconsOpt" @iconClick="iconClick" />
						</el-dialog>
					</el-form-item>
				</el-form>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import path from 'path'
	import { deepClone } from '@/utils'
	import { getRoutes } from '@/api/role'
	import i18n from '@/lang'
	import icons from '@/views/icons/index'
	import store from '@/store'
	import router from '@/router'
	import { resetRouter } from '@/router'
	import { routesSetUrl } from '@/store/modules/permission.js'
	import { closest, queryElement, addClass, readNodes } from '@/utils/common.js'
	export default {
		components: {
			icons
		},
		data() {
			return {
				serviceRoutes: [],
				routes0: [],
				checkStrictly: false,
				defaultCheckedKeys: [],
				defaultProps: {
					children: 'children',
					label: function(data, node) {
						if(data.meta && data.meta.title) {
							return data.meta.title
						} else {
							return data.children[0].meta.title
						}
					}
				},
				form: {

				},
				dialogVisible: false,
				iconsOpt: {
					tooltip: false
				},
				changeArrs: [],
			}
		},
		computed: {
			routesData() {
				this.defaultCheckedKeys = this.getCheckedKeys_(this.serviceRoutes);
				this.$nextTick(() => {
					// DOM 更新了
					//					let parent = closest(queryElement('.isOneChildren')[0], '.el-tree-node');
					//					addClass(parent, 'isOneChildren-node')
				});
				return this.serviceRoutes

			}
		},
		watch: {
			serviceRoutes: {
				handler(newName, oldName) {},
				deep: true,
				immediate: true,
			}
		},
		created() {
			this.getRoutes()
		},
		mounted() {},
		methods: {
			iconClick(item) {
				this.dialogVisible = false
				this.form.meta.icon = item
			},
			setIcon() {
				this.dialogVisible = true
			},
			handleClose(done) {
				done()
			},
			back() {
				const changeArrs = this.changeArrs
				if(changeArrs.length > 1) {
					this.changeArrs.pop()
					this.serviceRoutes = deepClone(this.changeArrs[this.changeArrs.length - 1])
				}
			},
			reset() {
				this.serviceRoutes = deepClone(this.routes0)
				this.changeArrs = [deepClone(this.routes0)]
			},
			nodeClick(item) {
				//console.log(item);
				if(item.meta.isOneChildren) {
					this.form = item.children[0]
				} else {

					this.form = item
				}
			},
			getCheckedKeys_(routes) {
				const a = [].concat(...routes.filter(item => item.selected).map(item => {
					if(item.children && item.children.length) {
						return this.getCheckedKeys_(item.children)
					} else {
						return item.pathFull
					}
				}))
				return a
			},
			nodeExpand() {

			},
			treeCheck() { //tree复选框
//				console.log(arguments,this.serviceRoutes);
				fn(this.serviceRoutes);
				arguments[1].checkedNodes.concat(arguments[1].halfCheckedNodes).forEach(item => item.selected = true);
				function fn(data) {
					if(!data||!data.length){
						return 
					}
                    data.forEach(item=>{
                   	item.selected=false;
                   	  if(item.children && item.children.length){
                   	  	   fn(item.children);
                   	  }
                   });
                   return data
				}
				//				setS(arguments[0], arguments[0].selected)
				//				function setS(data, flag) {
				//					data.selected = !flag;
				//					if(data.children && data.children.length) {
				//						data.children.map(item => setS(item, flag))
				//					}
				//				}
			},
			handleDrop(draggingNode, dropNode, dropType, ev) {
				console.log(draggingNode, dropNode, dropType, ev)
				this.changeArrsFn();
			},
			changeArrsFn() {
				setTimeout(()=>this.serviceRoutes = this.readNodes1(this.serviceRoutes))
				console.log(this.serviceRoutes)
				this.changeArrs.push(deepClone(this.serviceRoutes))
			},
			append(node, data) {
				const newChild = {
					path: 'add',
					component: "views/notCode/index",
					//		path: data.path+"/notCode/index",
					name: 'add',
					selected: true,
					meta: {
						title: 'add',
						icon: 'lock',
						title: '新增待编辑',
					},
					//      children: []
				};

				if(!data.children) {
					data.component = "layout/index";
					data.redirect = "/dashboard/index"
					//					data.children.push()
					this.$set(data, 'children', [newChild]);
				} else {
					data.children.push(newChild);
				}
				this.changeArrsFn()
			},

			remove(node, data) {
				//				console.log(node, data)
				const parent = node.parent
				const children = parent.data.children || parent.data
				const index = children.findIndex(d => d.path === data.pathFull)
				children.splice(index, 1)
				this.changeArrsFn()
			},

			renderContent(h, {
				node,
				data,
				store
			}) {
				const cs = data.meta.isOneChildren ? 'isOneChildren' : '';
				return(
					<span  class={"custom-tree-node dis-f "+cs} >
          <span class="ellipsis padr10 flex1 w0">{node.label}</span>
          <span class='span  txr'>
            <el-button size='mini' type='text' on-click={ () => this.append(node,data) }>Append</el-button>
            <el-button size='mini' type='text' on-click={ () => this.remove(node, data) }>Delete</el-button>
          </span>
        </span>
				)
			},
			readNodes0(nodes, basePath = '/', arr = [], num = 0) { // 过滤得到树形结构hidden不为true的项
				const _this = this;
				for(let item of nodes) {
					if(item.hidden) continue
					let obj = { ...item,
						pathFull: path.resolve(basePath, item.path),
						num: num + 1
					}
					arr.push(obj)
					if(item.children && item.children.length) {
						obj.children = [];
						if(!item.alwaysShow && item.children.length == 1) {
							if(!item.meta) {
								item.meta = {};
							}
							item.meta.breadcrumb = false;
							item.meta.isOneChildren = true;
						}
						_this.readNodes0(item.children, item.path, obj.children, num + 1)
					}
				}
				return arr
			},
			readNodes1(nodes, num = 0) {
				nodes.map((item,index )=> {
					item.num=num + 1
					if(item.num > 1 && item.component == "layout/index") { //儿子有首层
						item.component ='views/com/index';
					}else if(item.num == 1 && item.component== "layout/index"&&(!item.children||!item.children.length)){//首层剩空盒子 删除
						nodes.splice(index,1)
					}
					else if(item.num == 1 && item.component != "layout/index") {//首层有节点 转换
						if(!item.children || !item.children.length){//单节点
							console.log('单节点',item)
							item.children=deepClone(item);
						}
						item.component = "layout/index";
					}
					if(item.children && item.children.length) {
						if(!item.alwaysShow && item.children.length == 1) {
							if(!item.meta) {
								item.meta = {};
							}
							item.meta.breadcrumb = false;
							item.meta.isOneChildren = true;
						}else {
							item.meta.isOneChildren = false;
							this.readNodes1(item.children, num + 1)
						}
					}
				})
				return nodes
			},
			async getRoutes() {
				const res = await getRoutes()
				this.serviceRoutes = res.data;
				this.serviceRoutes = this.i18n(this.readNodes0(res.data))
				this.routes0 = deepClone(this.serviceRoutes)
				this.changeArrs = [deepClone(this.serviceRoutes)];
			},
			i18n(routes) {
				const app = routes.map(route => {
					if(route.meta) {
						route.meta.title = i18n.t(`route.${route.meta.title}`)
					} else {
						route.meta = {};
						if(route.children && route.children.length) {
							route.meta.title = this.$t(`route.${route.children[0].meta.title}`)
						}
					}
					if(route.children) {
						route.children = this.i18n(route.children)
					}
					return route
				})
				return app
			},
			// 重塑路由结构，使其看起来与侧边栏相同
			generateRoutes(routes, basePath = '/') {
				const res = []
				for(let route of routes) {
					// skip some route
					if(route.hidden) {
						continue
					}
					const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

					if(route.children && onlyOneShowingChild && !route.alwaysShow) {
						route = onlyOneShowingChild
					}

					const data = {
						...route,
						...{
							path: path.resolve(basePath, route.path),
						}
					}

					// recursive child routes
					if(route.children) {
						data.children = this.generateRoutes(route.children, data.path)
					}
					res.push(data)
				}
				return res
			},
			async save() {
				console.log(this.serviceRoutes)
								resetRouter(); //重置路由
				await store.dispatch('permission/generateRoutes', {
					Routes: this.serviceRoutes
				});
				const checkedKeys = this.$refs.tree.getCheckedKeys(),
					visitedViews = this.$store.state.tagsView.visitedViews;
				this.$store.state.tagsView.visitedViews = visitedViews.filter(item => checkedKeys.indexOf(item.path) > -1);
			},
			// reference: src/view/layout/components/Sidebar/SidebarItem.vue
			onlyOneShowingChild(children = [], parent) {
				let onlyOneChild = null
				const showingChildren = children.filter(item => !item.hidden)

				// 当只有一个子路由时，缺省显示该子路由
				if(showingChildren.length === 1) {
					onlyOneChild = showingChildren[0]
					onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
					return onlyOneChild
				}

				// 如果没有子路由要显示，则显示父路由
				if(showingChildren.length === 0) {
					onlyOneChild = { ...parent,
						path: '',
						noShowingChildren: true
					}
					return onlyOneChild
				}

				return false
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./menu.scss";
</style>