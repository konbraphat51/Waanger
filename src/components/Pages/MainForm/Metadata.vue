<template>
	<div>
		<h2>
			{{ t("MainForm.MetaTitle") }}
		</h2>

		<div class="FormUnit" id="title" ref="title">
			<label>
				{{ t("MainForm.Title") }}
			</label>
			<br />
			<input
				type="text"
				name="title"
				id="titleValue"
				v-model="metadata.title"
			/>
		</div>

		<div class="FormUnit" id="link" ref="link">
			<label>
				{{ t("MainForm.Link") }}
			</label>
			<br />
			<input type="text" name="link" id="linkValue" v-model="metadata.link" />
		</div>

		<div class="FormUnit" id="media" ref="media">
			<label>
				{{ t("MainForm.Media") }}
			</label>
			<br />
			<select name="media" id="mediaValue" v-model="metadata.media">
				<option value="netpage">{{ t("MainForm.MediaValue.NetPage") }}</option>
				<option value="book">{{ t("MainForm.MediaValue.Book") }}</option>
				<option value="academic">
					{{ t("MainForm.MediaValue.Academic") }}
				</option>
				<option value="repository">
					{{ t("MainForm.MediaValue.Repository") }}
				</option>
			</select>
		</div>

		<div class="FormUnit" id="tags" ref="tags">
			<label>
				{{ t("MainForm.Tags") }}
			</label>
			<br />
			<TagBox @OnTagsUpdated="(tags) => (metadata.tags = tags)" />
		</div>

		<div class="FormUnit" id="short" ref="short">
			<div class="short" v-for="locale in locales_writing">
				<label> {{ t("MainForm.Short") }} - {{ locale }} </label> <br />
				<input type="text" v-model="metadata.short[locale]" />
			</div>
		</div>

		<div class="FormUnit" id="importance" ref="importance">
			<label>
				{{ t("MainForm.Importance") }}
			</label>
			<br />
			<input
				type="number"
				name="importance"
				id="importanceValue"
				min="1"
				max="5"
				step="1"
				v-model="metadata.importance"
			/>
		</div>

		<div class="FormUnit" id="hasPage" ref="hasPage">
			<label>
				{{ t("MainForm.HasPage") }}
			</label>
			<br />
			<input
				class="checkbox"
				type="checkbox"
				name="hasPage"
				id="hasPageValue"
				v-model="metadata.hasPage"
				@click="EditHasPage"
			/>
		</div>
	</div>
</template>

<script>
import TagBox from "./TagBox.vue"

export default Vue.defineComponent({
	name: "Metadata",
	components: {
		TagBox: Vue.defineAsyncComponent(() =>
			loadModule("src/components/Pages/MainForm/TagBox.vue", options),
		),
	},
	data() {
		return {
			locales_writing: locales_writing,
			metadata: {
				title: "",
				link: "",
				media: "",
				tags: "",
				short: {},
				importance: 3,
				hasPage: false,
			},
		}
	},
	setup() {
		//set up i18n
		const {t} = VueI18n.useI18n()
		return {t}
	},
	methods: {
		EditHasPage(event) {
			this.$emit("EditHasPage", event.target.checked)
		},
		Submit() {
			if (this.ValidateAll()) {
				return this.metadata
			} else {
				return null
			}
		},
		ValidateAll() {
			//title
			if (this.metadata.title === "") {
				this.$refs.title.classList.add("Error")

				return false
			} else {
				this.$refs.title.classList.remove("Error")
			}

			//link
			if (this.metadata.link === "") {
				this.$refs.link.classList.add("Error")

				return false
			} else {
				this.$refs.link.classList.remove("Error")
			}

			//media
			if (this.metadata.media === "") {
				this.$refs.media.classList.add("Error")

				return false
			} else {
				this.$refs.media.classList.remove("Error")
			}

			//tags
			if (this.metadata.tags === "") {
				this.$refs.tags.classList.add("Error")

				return false
			} else {
				this.$refs.tags.classList.remove("Error")
			}

			//short
			for (let locale of this.locales_writing) {
				if (this.metadata.short[locale] === "") {
					this.$refs.short.classList.add("Error")

					return false
				} else {
					this.$refs.short.classList.remove("Error")
				}
			}

			//importance
			if (this.metadata.importance === "") {
				this.$refs.importance.classList.add("Error")

				return false
			} else {
				this.$refs.importance.classList.remove("Error")
			}

			return true
		},
		LoadMetadata(metadata) {
			this.metadata = metadata
		},
	},
})
</script>

<i18n>
    {
        "en": {
            "MainForm": {
                "MetaTitle": "Meta Data",
                "Media": "Media",
                "MediaValue": {
                    "NetPage": "Page on Web",
                    "Book": "Book",
                    "Academic": "Academic Resource",
					"Repository": "Repository"
                },
                "Tags": "Tags",
                "Title": "Title",
                "Short": "Short Description",
                "Importance": "Importance",
                "Link": "Link",
				"HasPage": "Has MarkDown Page"
            }
        },
		"ja": {
			"MainForm": {
			"MetaTitle": "メタデータ",
			"Media": "メディア",
			"MediaValue": {
				"NetPage": "ウェブページ",
				"Book": "書籍",
				"Academic": "学術リソース",
				"Repository": "リポジトリ"
			},
			"Tags": "タグ",
			"Title": "タイトル",
			"Short": "短い説明",
			"Importance": "重要度",
			"Link": "URL",
			"HasPage": "マークダウンページをつける"
			}
		}
    }
</i18n>

<style>
.FormUnit {
	margin: 10px;
	background-color: #a3fdbb;
	border-radius: 5%;
	padding: 10px;
}

.FormUnit input {
	width: 95%;
}

.FormUnit .checkbox {
	width: 20px;
	height: 20px;
}

.FormUnit.Error {
	background-color: #f7b7b7;
}
</style>
