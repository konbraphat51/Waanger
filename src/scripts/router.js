const router = VueRouter.createRouter({
	mode: "hash",
	history: VueRouter.createWebHashHistory(),
	routes: [
		{
			path: "/",
			name: "MainForm",
			component: Vue.defineAsyncComponent(() =>
				loadModule("src/components/Pages/MainForm/MainForm.vue", options),
			), //default page
		},
	],
})
