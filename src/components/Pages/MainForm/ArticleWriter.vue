<template>
	<div id="ArticleWriter">
		<h2>MarkDown</h2>
		<textarea id="MarkDownBox" rows="30"></textarea>
	</div>
</template>

<script>
export default Vue.defineComponent({
	name: "ArticleWriter",
	components: {},
})
</script>

<style>
#MarkDownBox {
	width: 100%;
	height: 200%;
}
</style>
