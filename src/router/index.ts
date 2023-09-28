import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/LoginPage.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/login",
    component: () => import("@/views/LoginFormPage.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/join",
    component: () => import("@/views/JoinPage.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1Page.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2Page.vue"),
      },
    ],
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/select-room",
    component: () => import("@/views/SelectRoom.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/meeting-form",
    component: () => import("@/views/MeetingFormPage.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/schedule-meet",
    component: () => import("@/views/ScheduleMeetingPage.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/detail-meet",
    component: () => import("@/views/DetailMeetingPage.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/meetings",
    component: () => import("@/views/MeetingPage.vue"),
    meta: {
      requireAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("accessToken")) {
    store.commit("auth/SET", ["isAuth", true]);
  }

  if (localStorage.getItem("account") && localStorage.getItem("email")) {
    const account = localStorage.getItem("account");
    const email = localStorage.getItem("email");

    store.commit("auth/SET", ["account", account]);
    store.commit("auth/SET", ["email", email]);
  }

  const auth = store.getters["auth/get"]('isAuth');
  if ((to.path === "/login" || to.path === "/") && auth) {
    next({ path: "/tabs/" });
  } else if (to.matched.some((record) => record.meta.requireAuth)) {
    if (!auth) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
