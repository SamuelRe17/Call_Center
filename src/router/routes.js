// import Sidebar from "pages/bank.vue";
// import bankPage from "pages/sidebar.vue";
const routes = [
  {
    path: "/index",
    component: () => import("src/layouts/sidebar/Sidebar.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("pages/dashboard/DashboardView.vue"),
      },
      {
        path:"/client",
        component: ()=> import("pages/client/clientview.vue"),
      },
    ],




  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/",
    component: () => import("pages/auth/views/signin/SigninView.vue"),
  },
  // {
  //   path: "/bank/",
  //   name: "bank",
  //   component: () => import("src/pages/respaldo/bank.vue"),
  // },
  {
    path: "/p",
    component: () => import("pages/prueba.vue"),
  },
  {
    path: "/lc1",
    component: () => import("pages/listaclientes.vue"),
  },
  {
    path: "/mp",
    component: () => import("pages/pruebaMao.vue"),
  },
  {
    path: "/cr",
    component: () => import("pages/pruebacount.vue"),
  },
  // {
  //   path: "/bl",
  //   component: () => import("pages/sidebar.vue"),
  // },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  // { path: "/", components: { default: bankPage, sidebar: Sidebar } },
];

export default routes;
