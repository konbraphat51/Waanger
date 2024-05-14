<template></template>

<script>
export default Vue.defineComponent({
	name: "App",
	components: {},
	setup() {
		//set up i18n
		const {t} = VueI18n.useI18n()
		return {t}
	},
})
</script>
