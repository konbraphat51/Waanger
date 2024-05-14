<template></template>

<script>
export default Vue.defineComponent({
	name: "App",
	components: {
		// LanguageSelection: Vue.defineAsyncComponent(() =>
		// 	loadModule("src/components/LanguageSelection.vue", options),
		// ),
	},
	setup() {
		//set up i18n
		const {t} = VueI18n.useI18n()
		return {t}
	},
})
</script>
