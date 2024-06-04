<template>
	<div id="app">
		<!-- view page shown here -->
		<router-view />

		<a
			href="https://konbraphat51.github.io/ChanwaangReviews"
			target="_blank"
			class="ChanwaangLink"
		>
			Konbraphat51 ชั้นวางReviews
		</a>

		<br />

		<a
			href="https://github.com/konbraphat51/ChanwaangReviews"
			target="_blank"
			class="GithubLink"
		>
			ชั้นวางReviews GitHub Repository
		</a>
	</div>
</template>

<script>
export default Vue.defineComponent({
	name: "App",
	components: {},
})
</script>
