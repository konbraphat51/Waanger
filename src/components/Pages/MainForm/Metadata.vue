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
			<input type="text" name="title" id="titleValue" />
		</div>

		<div class="FormUnit" id="media">
			<label>
				{{ t("MainForm.Media") }}
			</label>
			<br />
			<select name="media" id="mediaValue">
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
			<input type="text" name="tags" id="tagsValue" class="TagInput" />
		</div>

		<div class="FormUnit" id="short">
			<div class="short" v-for="locale in locales_writing">
				<label> {{ t("MainForm.Short") }} - {{ locale }} </label> <br />
				<input type="text" name="short" id="shortValue" />
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
				value="3"
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
		}
	},
	setup() {
		//set up i18n
		const {t} = VueI18n.useI18n()
		return {t}
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
                "Importance": "Importance"
            }
        },
        "ja": {
            "MainForm": {
                "MetaTitle": "メタデータ"
            }
        }
    }
</i18n>
