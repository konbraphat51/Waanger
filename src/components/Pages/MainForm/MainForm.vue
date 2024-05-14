<template>
	<div id="MainForm"></div>
</template>

<script>
export default Vue.defineComponent({
	name: "MainForm",
	components: {},
	setup() {
		//set up i18n
		const {t} = VueI18n.useI18n()
		return {t}
	},
})
</script>
