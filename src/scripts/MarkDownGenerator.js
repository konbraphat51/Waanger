class MarkDownGenerator {
	constructor() {
		this.markDown = ""
	}

	Generate(metadata, content) {
		this.markDown = ""

		//write metadata
		this.markDown += this.#WriteMetadata(metadata)

		//write content
		this.markDown += content

		return this.markDown
	}

	/**
	 * Write metadata
	 * @param {Object} metadata
	 * @returns {string}
	 */
	#WriteMetadata(metadata) {
		let metadataString = `${METADATA_START}\n`

		//unix time
		const timeCurrent = new Date().getTime() / 1000.0
		if (metadata["createdAt"] == undefined) {
			metadata["createdAt"] = timeCurrent
		}
		metadata["updatedAt"] = timeCurrent

		//lowercase tags
		if (metadata["tags"]) {
			metadata["tags"] = metadata["tags"].map((tag) => tag.toLowerCase())
		}

		//to JSON
		let metadataJson = JSON.stringify(metadata)

		//write in
		metadataString += metadataJson

		//ending
		metadataString += `\n${METADATA_END}\n\n`

		return metadataString
	}
}
