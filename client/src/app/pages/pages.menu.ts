export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'tables',
        data: {
          menu: {
            title: 'Tablas',
            icon: 'ion-grid',
            selected: false,
            expanded: false,
            order: 500,
          }
        },
        children: [
          {
            path: 'usertables',
            data: {
              menu: {
                title: 'Usuarios',
              }
            }
          },
          {
            path: 'smarttables',
            data: {
              menu: {
                title: 'Inventario',
              }
            }
          },
          {
            path: 'contratables',
            data: {
              menu: {
                title: 'Contratos',
              }
            }
          },
          {
            path: 'ventastables',
            data: {
              menu: {
                title: 'Ventas',
              }
            }
          },
          {
            path: 'servicestables',
            data: {
              menu: {
                title: 'Servicios',
              }
            }
          },
        ]
      },
      {
        path: 'editors',
        data: {
          menu: {
            title: 'general.menu.editors',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'ckeditor',
            data: {
              menu: {
                title: 'general.menu.ck_editor',
              }
            }
          }
        ]
      },
      {
        path: 'charts',
        data: {
          menu: {
            title: 'general.menu.charts',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        },
        children: [
          {
            path: 'chartist-js',
            data: {
              menu: {
                title: 'general.menu.chartist_js',
              }
            }
          }
        ]
      }
    ]
  }
];
