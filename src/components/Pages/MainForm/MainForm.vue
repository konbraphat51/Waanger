<template>
	<div id="MainForm">
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
			</select>
		</div>
	</div>
</template>

<script>
export default Vue.defineComponent({
	name: "MainForm",
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
                    "Academic": "Academic Resource"
                }
            }
        },
        "ja": {
            "MainForm": {
                "MetaTitle": "メタデータ"
            }
        }
    }
</i18n>
