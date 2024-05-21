<template>
	<div id="MainForm">
		<Metadata ref="Metadata" @EditHasPage="(value) => (hasPage = value)" />
		<ArticleWriter v-if="hasPage" />
	</div>
</template>

<script>
import ArticleWriter from "./ArticleWriter.vue"

export default Vue.defineComponent({
	name: "MainForm",
	components: {
		Metadata: Vue.defineAsyncComponent(() =>
			loadModule("src/components/Pages/MainForm/Metadata.vue", options),
		),
		ArticleWriter: Vue.defineAsyncComponent(() =>
			loadModule("src/components/Pages/MainForm/ArticleWriter.vue", options),
		),
	},
	data() {
		return {
			hasPage: false,
		}
	},
	setup() {
		//set up i18n
		const {t} = VueI18n.useI18n()
		return {t}
	},
})
</script>
