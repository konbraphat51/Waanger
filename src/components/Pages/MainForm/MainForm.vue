<template>
	<div id="MainForm">
		<ArticleFetcher
			ref="ArticleFetcher"
			@OnMetadataFetched="OnMetadataFetched"
			@OnMarkdownFetched="OnMarkdownFetched"
		/>
		<Metadata ref="Metadata" @EditHasPage="(value) => (hasPage = value)" />
		<ArticleWriter ref="ArticleWriter" v-if="hasPage" />
		<button @click="Submit">{{ t("MainForm.Submit") }}</button> <br />
		<label>token</label> <input type="password" v-model="token" />
	</div>
</template>

<script>
export default Vue.defineComponent({
	name: "MainForm",
	components: {
		ArticleFetcher: Vue.defineAsyncComponent(() =>
			loadModule("src/components/Pages/MainForm/ArticleFetcher.vue", options),
		),
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
			token: "",
			uploading: false,
		}
	},
	setup() {
		//set up i18n
		const {t} = VueI18n.useI18n()
		return {t}
	},
	mounted() {
		//initialize token
		this.token = GetCookieValue(COOKIE_GITHUB_TOKEN)
		if (this.token == undefined) {
			this.token = ""
		}

		//get the query
		const afterQuestion = location.href.split("?")[1]
		const searchParams = new URLSearchParams(afterQuestion)
		const id = searchParams.get("id")
		if (id != null) {
			setTimeout(() => {
				this.$refs.ArticleFetcher.Fetch(id)
			}, 300)
		}
	},
	methods: {
		Submit() {
			if (this.uploading) {
				return
			}

			if (this.token == "") {
				return
			} else {
				//save to cookie
				SetCookie(COOKIE_GITHUB_TOKEN, this.token)
			}

			const metadata = this.$refs.Metadata.Submit()
			if (metadata === null) {
				return
			}

			let content = ""
			//if ArticleWriter is rendered...
			if (this.$refs.ArticleWriter != undefined) {
				//...get content from ArticleWriter
				content = this.$refs.ArticleWriter.Submit()

				if (content === null) {
					content = ""
				}
			}

			//set token
			let real_token = "github_pat_"
			real_token += passReverser.Reverse(this.token)
			markdownUploader.SetToken(real_token)

			//send to server
			this.uploading = true
			markdownUploader.Upload(metadata, content).then((status) => {
				if (status === 200 || status === 201) {
					alert("success")
					this.uploading = false

					//reset
					location.reload()
				} else {
					alert("failed: " + status)
					this.uploading = false
				}
			})
		},
		OnMetadataFetched(metadata) {
			this.$refs.Metadata.LoadMetadata(metadata)
		},
		OnMarkdownFetched(markdown) {
			this.$refs.ArticleWriter.LoadMarkdown(markdown)
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
