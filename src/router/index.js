import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/components/Main.vue";
import Notice from '@/views/Notice.vue';
import CreateNotice from '@/components/Notice/CreateNotice.vue';
import SearchNotice from '@/components/Notice/SearchNotice.vue';
import UpdateNotice from '@/components/Notice/UpdateNotice.vue';
import RemoveNotice from '@/components/Notice/RemoveNotice.vue';

import Apt from '@/views/Apt.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
    // 공지사항 리스트 조회
    {
      path: '/notice',
      name: 'Notice',
      component: Notice,
    },
    // 공지사항 글 등록
    {
      path: '/createNotice',
      name: 'CreateNotice',
      component: CreateNotice,
    },
    // 공지사항 상세보기
    {
      path: '/detailNotice',
      name: 'SearchNotice',
      component: SearchNotice,
      props: true,
    },
    // 공지사항 수정
    {
      path: '/updateNotice',
      name: 'UpdateNotice',
      component: UpdateNotice,
      props: true,
    },
      // 공지사항 삭제
      {
        path: '/removeNotice',
        name: 'RemoveNotice',
        component: RemoveNotice,
    },
      // 공지사항 삭제
      {
        path: '/apt',
        name: 'Apt',
        component: Apt,
      },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
