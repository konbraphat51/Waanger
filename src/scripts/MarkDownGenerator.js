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

		console.log(this.markDown)
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
		metadata["UpdatedAt"] = metadata["CreatedAt"]

		//to JSON
		metadataJson = JSON.stringify(metadata)

		//write in
		metadataString += metadataJson

		//ending
		metadataString += "\nMETA -->\n\n"

		return metadataString
	}
}

const markDownGenerator = new MarkDownGenerator()
