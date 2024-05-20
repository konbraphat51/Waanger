<template>
	<div>
		<h2>
			{{ t("MainForm.MetaTitle") }}
		</h2>

		<div class="FormUnit" id="media">
			<label>
				{{ t("MainForm.Media") }}
			</label>
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
			<input type="text" name="tags" id="tagsValue" class="TagInput" />
		</div>

		<div class="FormUnit" id="title">
			<label>
				{{ t("MainForm.Title") }}
			</label>
			<input type="text" name="title" id="titleValue" />
		</div>

		<div class="FormUnit" id="short">
			<label>
				{{ t("MainForm.Short") }}
			</label>
			<input type="text" name="short" id="shortValue" />
		</div>
	</div>
</template>

<script>
export default Vue.defineComponent({
	name: "Metadata",
	components: {},
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
                "Short": "Short Description"
            }
        },
        "ja": {
            "MainForm": {
                "MetaTitle": "メタデータ"
            }
        }
    }
</i18n>
