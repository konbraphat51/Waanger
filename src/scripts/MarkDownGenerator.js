class MarkDownGenerator {
	constructor() {
		this.markDown = ""
	}

	GenerateMarkDown(metadata, content) {
		this.markDown = ""
	}

	/**
	 * Write metadata
	 * @param {Object} metadata
	 * @returns {string}
	 */
	#WriteMetadata(metadata) {
		let metadataString = "<!-- META\n"

		//unix time
		metadata["CreatedAt"] = new Date().getTime() / 1000.0

		//to JSON
		metadataJson = JSON.stringify(metadata)

		//write in
		metadataString += metadataJson

		//ending
		metadataString += "\nMETA -->\n"

		return metadataString
	}
}
