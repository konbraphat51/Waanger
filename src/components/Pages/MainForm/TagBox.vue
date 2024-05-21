<template>
	<input type="text" class="TagBox" v-model="tagsRaw" />
</template>

<script>
export default Vue.defineComponent({
	name: "TagBox",
	data() {
		return {
			tagsRaw: "",
		}
	},
	watch: {
		tagsRaw: function (newVal, oldVal) {
			this.$emit("OnTagsUpdated", newVal.split(" "))
		},
	},
})
</script>
