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
	methods: {
		LoadTags(tagList) {
			this.tagsRaw = tagList.join(" ")
		},
	},
	watch: {
		tagsRaw: function (newVal, oldVal) {
			this.$emit("OnTagsUpdated", newVal.split(" "))
		},
	},
})
</script>
