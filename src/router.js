const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/preview',
        component: (resolve) => require(['./views/preview.vue'], resolve)
    }
];
export default routers;