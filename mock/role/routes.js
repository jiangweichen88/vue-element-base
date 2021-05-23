// Just a mock data

const constantRoutes = [

	{
		path: '/',
		component: 'layout/index',
		redirect: 'dashboard',
		selected: true,
		disabled: true,
		meta: {
			title: 'dashboard',
		},
		children: [{
			path: 'dashboard',
			selected: true,
			disabled: true,
			component: 'views/dashboard/index',
			name: 'Dashboard',
			meta: {
				title: 'dashboard',
				icon: 'dashboard',
				affix: true
			}
		}]
	},
]

const asyncRoutes = [{
		path: '/menu',
		component: 'layout/index',
		redirect: 'noRedirect',
		name: 'menu',
		selected: true,
		disabled: true,
		meta: {
			title: 'menu',
		},
		children: [{
			path: 'index',
			component: 'views/menu/index',
			name: 'menu',
			selected: true,
			disabled: true,
			meta: {
				title: 'menu',
				roles: ['admin'],
				icon: 'nested'
			},
		}]
	}, {
		path: '/permission',
		component: 'layout/index',
		redirect: 'noRedirect',
		name: 'Permission',
		selected: true,
		meta: {
			title: 'permission',
		},
		children: [{
				path: 'page',
				component: 'views/permission/page',
				name: 'PagePermission',
				selected: true,
				meta: {
					title: 'pagePermission',
					roles: ['admin'] // or you can only set roles in sub nav
				}
			},
			{
				path: 'directive',
				component: 'views/permission/directive',
				name: 'DirectivePermission',
				selected: true,
				meta: {
					title: 'directivePermission'
					// if do not set roles, means: this page does not require permission
				}
			},
			{
				path: 'role',
				component: 'views/permission/role',
				name: 'RolePermission',
				selected: true,
				meta: {
					title: 'rolePermission',
					roles: ['admin']
				}
			}
		]
	},
	{
		path: '/demo',
		component: 'layout/index',
		redirect: 'noRedirect',
		name: 'demo',
		selected: true,
		meta: {
				title: 'demo',
		},
		children: [{
				path: '/guide', // 引导页
				component: 'views/demo/index',
				redirect: 'noRedirect',
				selected: true,
				meta: {
					title: 'guide',
				},
				children: [{
					path: 'index',
					component: 'views/guide/index',
					name: 'Guide',
					selected: true,
					meta: {
						title: 'guide',
						icon: 'guide',
					}
				}]
			},
			{
				path: '/icon',
				component: 'views/demo/index',
				selected: true,
				children: [{
					path: 'index',
					component: 'views/demo/icons/index',
					name: 'Icons',
					selected: true,
					meta: {
						title: 'icons',
						icon: 'icon',
					}
				}]
			},
			{
				path: '/components',
				component: 'views/demo/index',
				redirect: 'noRedirect',
				name: 'ComponentDemo',
				selected: true,
				meta: {
					title: 'components',
					icon: 'component'
				},
				children: [{
						path: 'markdown',
						component: 'views/demo/components-demo/markdown',
						name: 'MarkdownDemo',
						selected: true,
						meta: {
							title: 'markdown'
						}
					},
					{
						path: 'json-editor',
						component: 'views/demo/components-demo/json-editor',
						name: 'JsonEditorDemo',
						selected: true,
						meta: {
							title: 'jsonEditor'
						}
					},
					{
						path: 'avatar-upload',
						component: 'views/demo/components-demo/avatar-upload',
						name: 'AvatarUploadDemo',
						selected: true,
						meta: {
							title: 'avatarUpload'
						}
					},
					{
						path: 'dropzone',
						component: 'views/demo/components-demo/dropzone',
						name: 'DropzoneDemo',
						selected: true,
						meta: {
							title: 'dropzone'
						}
					},
					{
						path: 'sticky',
						component: 'views/demo/components-demo/sticky',
						name: 'StickyDemo',
						selected: true,
						meta: {
							title: 'sticky'
						}
					},
					{
						path: 'count-to',
						component: 'views/demo/components-demo/count-to',
						name: 'CountToDemo',
						selected: true,
						meta: {
							title: 'countTo'
						}
					},
					{
						path: 'mixin',
						component: 'views/demo/components-demo/mixin',
						name: 'ComponentMixinDemo',
						selected: true,
						meta: {
							title: 'componentMixin'
						}
					},
					{
						path: 'back-to-top',
						component: 'views/demo/components-demo/back-to-top',
						name: 'BackToTopDemo',
						selected: true,
						meta: {
							title: 'backToTop'
						}
					},
					{
						path: 'drag-dialog',
						component: 'views/demo/components-demo/drag-dialog',
						name: 'DragDialogDemo',
						selected: true,
						meta: {
							title: 'dragDialog'
						}
					},
					{
						path: 'drag-select',
						component: 'views/demo/components-demo/drag-select',
						name: 'DragSelectDemo',
						selected: true,
						meta: {
							title: 'dragSelect'
						}
					},
					{
						path: 'dnd-list',
						component: 'views/demo/components-demo/dnd-list',
						name: 'DndListDemo',
						selected: true,
						meta: {
							title: 'dndList'
						}
					},
					{
						path: 'drag-kanban',
						component: 'views/demo/components-demo/drag-kanban',
						name: 'DragKanbanDemo',
						selected: true,
						meta: {
							title: 'dragKanban'
						}
					}
				]
			},
			{
				path: '/table',
				component: 'views/demo/index',
				redirect: 'noRedirect',
				name: 'Table',
				selected: true,
				meta: {
					title: 'Table',
					icon: 'table'
				},
				children: [{
						path: 'dynamic-table',
						component: 'views/demo/table/dynamic-table/index',
						name: 'DynamicTable',
						selected: true,
						meta: {
							title: 'dynamicTable'
						}
					},
					{
						path: 'drag-table',
						component: 'views/demo/table/drag-table',
						name: 'DragTable',
						selected: true,
						meta: {
							title: 'dragTable'
						}
					},
					{
						path: 'inline-edit-table',
						component: 'views/demo/table/inline-edit-table',
						name: 'InlineEditTable',
						selected: true,
						meta: {
							title: 'inlineEditTable'
						}
					},
					{
						path: 'complex-table',
						component: 'views/demo/table/complex-table',
						name: 'ComplexTable',
						selected: true,
						meta: {
							title: 'complexTable'
						}
					}
				]
			},
			{
				path: '/demo/example',
				component: 'views/demo/index',
				redirect: 'noRedirect',
				name: 'Example',
				selected: true,
				meta: {
					title: 'example',
					icon: 'el-icon-s-help'
				},
				children: [{
						path: 'create',
						component: 'views/demo/example/create',
						name: 'CreateArticle',
						selected: true,
						meta: {
							title: 'createArticle',
							icon: 'edit'
						}
					},
					{
						path: 'edit/:id(\\d+)',
						component: 'views/demo/example/edit',
						name: 'EditArticle',
						selected: true,
						meta: {
							title: 'editArticle',
							noCache: true,
							activeMenu: '/demo/example/list'
						},
						hidden: true
					},
					{
						path: 'list',
						component: 'views/demo/example/list',
						name: 'ArticleList',
						selected: true,
						meta: {
							title: 'articleList',
							icon: 'list'
						}
					}
				]
			},

			{
				path: '/error',
				component: 'views/demo/index',
				redirect: 'noRedirect',
				name: 'ErrorPages',
				selected: true,
				meta: {
					title: 'errorPages',
					icon: '404'
				},
				children: [{
						path: '401',
						component: 'views/error-page/401',
						name: 'Page401',
						selected: true,
						meta: {
							title: 'page401',
							noCache: true
						}
					},
					{
						path: '404',
						component: 'views/error-page/404',
						name: 'Page404',
						selected: true,
						meta: {
							title: 'page404',
							noCache: true
						}
					}
				]
			},
			{
				path: '/export',
				component: 'views/demo/index',
				redirect: 'noRedirect',
				name: 'export',
				selected: true,
				meta: {
					title: 'export',
					icon: 'el-icon-s-promotion'
				},
				children: [{
						path: '/excel',
						component: 'views/demo/export/index',
						redirect: 'noRedirect',
						name: 'Excel',
						selected: true,
						meta: {
							title: 'excel',
							icon: 'excel'
						},
						children: [{
								path: 'export-excel',
								component: 'views/demo/export/excel/export-excel',
								name: 'ExportExcel',
								selected: true,
								meta: {
									title: 'exportExcel'
								}
							},
							{
								path: 'export-selected-excel',
								component: 'views/demo/export/excel/select-excel',
								name: 'SelectExcel',
								selected: true,
								meta: {
									title: 'selectExcel'
								}
							},
							{
								path: 'export-merge-header',
								component: 'views/demo/export/excel/merge-header',
								name: 'MergeHeader',
								selected: true,
								meta: {
									title: 'mergeHeader'
								}
							},
							{
								path: 'upload-excel',
								component: 'views/demo/export/excel/upload-excel',
								name: 'UploadExcel',
								selected: true,
								meta: {
									title: 'uploadExcel'
								}
							}
						]
					},
					{
						path: '/zip',
						component: 'views/demo/export/index',
						redirect: 'noRedirect',
						name: 'Zip',
						selected: true,
						meta: {
							title: 'zip',
							icon: 'zip'
						},
						children: [{
							path: 'download',
							component: 'views/demo/export/zip/index',
							name: 'ExportZip',
							selected: true,
							meta: {
								title: 'exportZip'
							}
						}]
					}
				]
			},

			{
				path: 'external-link',
				component: 'views/demo/index',
				selected: true,
				children: [{
					path: 'https://github.com/jiangweichen88/vue-element-base',
					selected: true,
					meta: {
						title: 'externalLink',
						icon: 'link'
					}
				}]
			},

			// 404页必须放在最后 !!!
			{
				path: '*',
				redirect: '/404',
				hidden: true,
				selected: true,
			}
		]
	}
]

module.exports = {
	constantRoutes,
	asyncRoutes
}