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
            ).then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Failed to fetch article")
                }
            }).then((data) => {
                return atob(data.content)
            }).catch((error) => {
                console.error(error)
            })
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
