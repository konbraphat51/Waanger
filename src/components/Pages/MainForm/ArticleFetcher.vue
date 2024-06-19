<template>
	<div id="ArticleFetcher">
		<label>{{ t("ArticleFetcher.Label") }}</label>
		<input type="text" v-model="id" />

		<button @click="FetchArticle">{{ t("ArticleFetcher.Fetch") }}</button>
	</div>
</template>

<script>
export default Vue.defineComponent({
	name: "ArticleFetcher",
	data() {
		return {
			id: "",
		}
	},
	setup() {
		//set up i18n
		const {t} = VueI18n.useI18n()
		return {t}
	},
	methods: {
		async FetchArticle() {
			let content = await fetch(
				`https://api.github.com/repos/${GITHUB_ACCOUNT}/${GITHUB_REPOSITORY}/contents/${ARTICLE_DIRECTORY}${this.id}.md`,
			)
				.then((response) => {
					if (response.ok) {
						return response.json()
					} else {
						throw new Error("Failed to fetch article")
					}
				})
				.then((data) => {
					return this.DecodeBase64(data.content)
				})
				.catch((error) => {
					console.error(error)
				})

			let metadata = this.GetMetadata(content)
			metadata["filename"] = this.id
			this.$emit("OnMetadataFetched", metadata)

			if (metadata["hasPage"] === true) {
				setTimeout(() => {
					let markdown = this.GetMarkdown(content)

					//emit metadata and markdown
					this.$emit("OnMarkdownFetched", markdown)
				}, 300)
			}
		},

		async DecodeBase64(content) {
			return fetch(`data:text/plain;charset=utf-8;base64,${content}`)
				.then((response) => {
					if (response.ok) {
						return response.text()
					} else {
						throw new Error("Failed to decode base64")
					}
				})
				.catch((error) => {
					console.error(error)
				})
		},

		GetMetadata(content) {
			//between METADATA_START and METADATA_END
			let start = content.indexOf(METADATA_START) + METADATA_START.length
			let end = content.indexOf(METADATA_END)
			let metadata_raw = content.substring(start, end)

			return JSON.parse(metadata_raw)
		},

		GetMarkdown(content) {
			//after METADATA_END
			let start = content.indexOf(METADATA_END) + METADATA_END.length
			let withWhiteline = content.substring(start)

			//delete whiteline in the head
			return withWhiteline.replace(/^\s+/, "")
		},

		Fetch(id) {
			this.id = id
			this.FetchArticle()
		},
	},
})
</script>

<i18n>
{
    "en": {
        "ArticleFetcher.Label": "ID to fetch: ",
        "ArticleFetcher.Fetch": "Fetch"
    },
    "ja": {
        "ArticleFetcher.Label": "ID to fetch: ",
        "ArticleFetcher.Fetch": "Fetch"
    }
}   
</i18n>
