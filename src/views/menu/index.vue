<template>
  <el-container class="h100 bg-c pad16 menu-jc">
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

    <el-container class="">
      <el-aside class="mar0 pad0">
        <el-tree ref="tree" class="permission-tree h100" show-checkbox draggable :render-content="renderContent" :check-strictly="checkStrictly" :data="routesData" :props="defaultProps" node-key="path" @node-drop="handleDrop" />
      </el-aside>
      <el-main class="bg-w marl16">
        菜单中文名称 路由地址 菜单图标 菜单英文别名
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getRoutes } from '@/api/role'
import i18n from '@/lang'
import { asyncRoutes } from '@/role/asyncRoutes.js'
const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      routes0: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      changeArrs: []
    }
  },
  computed: {
    routesData() {
      console.log(this.routes)
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
  },
  mounted() {
    this.handleEdit()
  },
  methods: {
    back() {
      const changeArrs = this.changeArrs
      if (changeArrs.length > 1) {
        this.changeArrs.pop()
        this.routes = this.changeArrs[this.changeArrs.length - 1]
      }
    },
    reset() {
      this.routes = deepClone(this.routes0)
      this.changeArrs = [deepClone(this.routes0)]
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType, ev)
      this.changeArrsFn()
    },
    changeArrsFn() {
				 this.changeArrs.push(deepClone(this.routes))
    },
    append(data) {
      const newChild = {
        id: id++,
        label: 'testtest',
        children: []
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    renderContent(h, {
      node,
      data,
      store
    }) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            <el-button size='mini' type='text' on-click={ () => this.append(data) }>Append</el-button>
            <el-button size='mini' type='text' on-click={ () => this.remove(node, data) }>Delete</el-button>
          </span>
        </span>)
    },
    async getRoutes() {
      const res = await getRoutes()
      console.log(res)
      this.serviceRoutes = res.data
      const routes = this.generateRoutes(res.data)
      console.log(routes)
      this.routes = this.i18n(routes)
      this.routes0 = deepClone(this.routes)
      this.changeArrs = [deepClone(this.routes0)]
    },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },
    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    },
    // 重塑路由结构，使其看起来与侧边栏相同
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) {
          continue
        }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title

        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit() {
      this.checkStrictly = true
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // 设置节点的检查状态不会影响其父节点和子节点
        this.checkStrictly = false
      })
    },
    handleDelete({
      $index,
      row
    }) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async save() {
      const isEdit = this.dialogType === 'edit'

      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)
      console.log(this.role.routes)
      //				if(isEdit) {
      //					await updateRole(this.role.key, this.role)
      //					for(let index = 0; index < this.rolesList.length; index++) {
      //						if(this.rolesList[index].key === this.role.key) {
      //							this.rolesList.splice(index, 1, Object.assign({}, this.role))
      //							break
      //						}
      //					}
      //				} else {
      //					const {
      //						data
      //					} = await addRole(this.role)
      //					this.role.key = data.key
      //					this.rolesList.push(this.role)
      //				}
      //
      //				const {
      //					description,
      //					key,
      //					name
      //				} = this.role
      //				this.dialogVisible = false
      //				this.$notify({
      //					title: 'Success',
      //					dangerouslyUseHTMLString: true,
      //					message: `
      //          <div>Role Key: ${key}</div>
      //          <div>Role Name: ${name}</div>
      //          <div>Description: ${description}</div>
      //        `,
      //					type: 'success'
      //				})
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
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
