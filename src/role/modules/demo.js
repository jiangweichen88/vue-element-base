import Layout from '@/layout'
const demo = {
  path: '/demo',
  component: Layout,
  redirect: '/demo/index',
  name: 'demo',
  meta: {
    icon: 'el-icon-setting',
    title: 'demo',
    roles: ['admin']
  },
  children: [{
    path: '/icon',
    component: () =>
      import('@/views/demo/index'),
    children: [{
      path: 'index',
      component: () =>
        import('@/views/demo/icons/index'),
      name: 'Icons',
      meta: {
        title: 'icons',
        icon: 'icon',
        noCache: true
      }
    }]
  },
  {
    path: '/components',
    component: () =>
      import('@/views/demo/index'),
    redirect: 'noRedirect',
    name: 'ComponentDemo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [{
      path: 'markdown',
      component: () =>
        import('@/views/demo/components-demo/markdown'),
      name: 'MarkdownDemo',
      meta: {
        title: 'markdown'
      }
    },
    {
      path: 'json-editor',
      component: () =>
        import('@/views/demo/components-demo/json-editor'),
      name: 'JsonEditorDemo',
      meta: {
        title: 'jsonEditor'
      }
    },
    {
      path: 'avatar-upload',
      component: () =>
        import('@/views/demo/components-demo/avatar-upload'),
      name: 'AvatarUploadDemo',
      meta: {
        title: 'avatarUpload'
      }
    },
    {
      path: 'dropzone',
      component: () =>
        import('@/views/demo/components-demo/dropzone'),
      name: 'DropzoneDemo',
      meta: {
        title: 'dropzone'
      }
    },
    {
      path: 'sticky',
      component: () =>
        import('@/views/demo/components-demo/sticky'),
      name: 'StickyDemo',
      meta: {
        title: 'sticky'
      }
    },
    {
      path: 'count-to',
      component: () =>
        import('@/views/demo/components-demo/count-to'),
      name: 'CountToDemo',
      meta: {
        title: 'countTo'
      }
    },
    {
      path: 'mixin',
      component: () =>
        import('@/views/demo/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      meta: {
        title: 'componentMixin'
      }
    },
    {
      path: 'back-to-top',
      component: () =>
        import('@/views/demo/components-demo/back-to-top'),
      name: 'BackToTopDemo',
      meta: {
        title: 'backToTop'
      }
    },
    {
      path: 'drag-dialog',
      component: () =>
        import('@/views/demo/components-demo/drag-dialog'),
      name: 'DragDialogDemo',
      meta: {
        title: 'dragDialog'
      }
    },
    {
      path: 'drag-select',
      component: () =>
        import('@/views/demo/components-demo/drag-select'),
      name: 'DragSelectDemo',
      meta: {
        title: 'dragSelect'
      }
    },
    {
      path: 'dnd-list',
      component: () =>
        import('@/views/demo/components-demo/dnd-list'),
      name: 'DndListDemo',
      meta: {
        title: 'dndList'
      }
    },
    {
      path: 'drag-kanban',
      component: () =>
        import('@/views/demo/components-demo/drag-kanban'),
      name: 'DragKanbanDemo',
      meta: {
        title: 'dragKanban'
      }
    }
    ]
  },
  {
    path: '/table',
    component: () =>
      import('@/views/demo/index'),
    redirect: '/table/complex-table',
    name: 'Table',
    meta: {
      title: 'Table',
      icon: 'table'
    },
    children: [{
      path: 'dynamic-table',
      component: () =>
        import('@/views/demo/table/dynamic-table/index'),
      name: 'DynamicTable',
      meta: {
        title: 'dynamicTable'
      }
    },
    {
      path: 'drag-table',
      component: () =>
        import('@/views/demo/table/drag-table'),
      name: 'DragTable',
      meta: {
        title: 'dragTable'
      }
    },
    {
      path: 'inline-edit-table',
      component: () =>
        import('@/views/demo/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: {
        title: 'inlineEditTable'
      }
    },
    {
      path: 'complex-table',
      component: () =>
        import('@/views/demo/table/complex-table'),
      name: 'ComplexTable',
      meta: {
        title: 'complexTable'
      }
    }
    ]
  },
  {
    path: '/demo/example',
    component: () =>
      import('@/views/demo/index'),
    redirect: '/demo/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'el-icon-s-help'
    },
    children: [{
      path: 'create',
      component: () =>
        import('@/views/demo/example/create'),
      name: 'CreateArticle',
      meta: {
        title: 'createArticle',
        icon: 'edit'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () =>
        import('@/views/demo/example/edit'),
      name: 'EditArticle',
      meta: {
        title: 'editArticle',
        noCache: true,
        activeMenu: '/demo/example/list'
      },
      hidden: true
    },
    {
      path: 'list',
      component: () =>
        import('@/views/demo/example/list'),
      name: 'ArticleList',
      meta: {
        title: 'articleList',
        icon: 'list'
      }
    }
    ]
  },

  {
    path: '/error',
    component: () =>
      import('@/views/demo/index'),
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [{
      path: '401',
      component: () =>
        import('@/views/error-page/401'),
      name: 'Page401',
      meta: {
        title: 'page401',
        noCache: true
      }
    },
    {
      path: '404',
      component: () =>
        import('@/views/error-page/404'),
      name: 'Page404',
      meta: {
        title: 'page404',
        noCache: true
      }
    }
    ]
  },
  {
    path: '/export',
    component: () =>
      import('@/views/demo/index'),
    redirect: '/export/index',
    name: 'export',
    meta: {
      title: 'export',
      icon: 'el-icon-s-promotion'
    },
    children: [{
      path: '/excel',
      component: () =>
        import('@/views/demo/export/index'),
      redirect: '/export/excel',
      name: 'Excel',
      meta: {
        title: 'excel',
        icon: 'excel'
      },
      children: [{
        path: 'export-excel',
        component: () =>
          import('@/views/demo/export/excel/export-excel'),
        name: 'ExportExcel',
        meta: {
          title: 'exportExcel'
        }
      },
      {
        path: 'export-selected-excel',
        component: () =>
          import('@/views/demo/export/excel/select-excel'),
        name: 'SelectExcel',
        meta: {
          title: 'selectExcel'
        }
      },
      {
        path: 'export-merge-header',
        component: () =>
          import('@/views/demo/export/excel/merge-header'),
        name: 'MergeHeader',
        meta: {
          title: 'mergeHeader'
        }
      },
      {
        path: 'upload-excel',
        component: () =>
          import('@/views/demo/export/excel/upload-excel'),
        name: 'UploadExcel',
        meta: {
          title: 'uploadExcel'
        }
      }
      ]
    },
    {
      path: '/zip',
      component: () =>
        import('@/views/demo/export/index'),
      redirect: '/export/zip',
      alwaysShow: true,
      name: 'Zip',
      meta: {
        title: 'zip',
        icon: 'zip'
      },
      children: [{
        path: 'download',
        component: () =>
          import('@/views/demo/export/zip/index'),
        name: 'ExportZip',
        meta: {
          title: 'exportZip'
        }
      }]
    }
    ]
  },

  {
    path: 'external-link',
    component: () =>
      import('@/views/demo/index'),
    children: [{
      path: 'https://github.com/jiangweichen88/vue-element-base',
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
    hidden: true
  }
  ]
}
export default demo
