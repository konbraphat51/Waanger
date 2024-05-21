<template>
	<div>
		<h2>
			{{ t("MainForm.MetaTitle") }}
		</h2>

		<div class="FormUnit" id="title">
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

		<div class="FormUnit" id="link">
			<label>
				{{ t("MainForm.Link") }}
			</label>
			<br />
			<input type="text" name="link" id="linkValue" v-model="metadata.link" />
		</div>

		<div class="FormUnit" id="media">
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

		<div class="FormUnit" id="tags">
			<label>
				{{ t("MainForm.Tags") }}
			</label>
			<br />
			<input
				type="text"
				name="tags"
				id="tagsValue"
				class="TagInput"
				v-model="metadata.tags"
			/>
		</div>

		<div class="FormUnit" id="short">
			<div class="short" v-for="locale in locales_writing">
				<label> {{ t("MainForm.Short") }} - {{ locale }} </label> <br />
				<input
					type="text"
					name="short"
					id="shortValue"
					v-model="metadata.short[locale]"
				/>
			</div>
		</div>

		<div class="FormUnit" id="importance">
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

		<div class="FormUnit" id="hasPage">
			<label>
				{{ t("MainForm.HasPage") }}
			</label>
			<br />
			<input
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
export default Vue.defineComponent({
	name: "Metadata",
	components: {},
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
