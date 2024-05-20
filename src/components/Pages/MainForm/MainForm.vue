<template>
	<div id="MainForm">
		<Metadata />
	</div>
</template>

<script>
import Metadata from "./Metadata.vue"

export default Vue.defineComponent({
	name: "MainForm",
	components: {
		Metadata: Vue.defineAsyncComponent(() =>
			loadModule("src/components/Pages/MainForm/Metadata.vue", options),
		),
	},
	setup() {
		//set up i18n
		const {t} = VueI18n.useI18n()
		return {t}
	},
})
</script>
