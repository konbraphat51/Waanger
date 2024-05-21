<template>
	<div id="ArticleWriter">
		<h2>MarkDown</h2>
		<textarea id="MarkDownBox" rows="30" v-model="markdown"></textarea>

		<Viewer :markdown="markdown" />
	</div>
</template>

<script>
export default Vue.defineComponent({
	name: "ArticleWriter",
	data() {
		return {
			markdown: "",
		}
	},
	components: {
		Viewer: Vue.defineAsyncComponent(() =>
			loadModule("src/components/viewer/Viewer.vue", options),
		),
	},
})
</script>

<style>
#MarkDownBox {
	width: 100%;
	height: 200%;
}
</style>
