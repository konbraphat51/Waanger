<template>
	<div id="MainForm">
		<Metadata ref="Metadata" @EditHasPage="(value) => (hasPage = value)" />
		<ArticleWriter ref="ArticleWriter" v-if="hasPage" />
		<button @click="Submit">{{ t("MainForm.Submit") }}</button>
	</div>
</template>

<script>
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
	methods: {
		Submit() {
			const metadata = this.$refs.Metadata.Submit()
			if (metadata === null) {
				return
			}

			const content = this.$refs.ArticleWriter.Submit()
			if (content === null) {
				return
			}

			const markdown = markDownGenerator.Generate(metadata, content)
		},
	},
})
</script>

<i18n>
{
	"en": {
		"MainForm.Submit": "Submit"
	},
	"ja": {
		"MainForm.Submit": "送信"
	}
}
</i18n>
