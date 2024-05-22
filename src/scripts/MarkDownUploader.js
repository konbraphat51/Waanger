class MarkDownUpLoader extends GitHubUploader {
	constructor(
		repositoryOwner,
		repositoryName,
		fileDirectory,
		branch = null,
		committerName = null,
		committerEmail = null,
		authorName = null,
	) {
		this.repositoryOwner = repositoryOwner
		this.repositoryName = repositoryName
		this.fileDirectory = fileDirectory
		this.branch = branch
		this.committerName = committerName
		this.committerEmail = committerEmail
		this.authorName = authorName
	}

	Upload(markdown) {
		const filename = this.#ComputeDefaultFileName()
		super.Upload(
			this.repositoryOwner,
			this.repositoryName,
			this.fileDirectory + filename,
			this.#ComputeCommitMessage(this.fileDirectory),
			markdown,
			this.branch,
			this.committerName,
			this.committerEmail,
			this.authorName,
		)
	}

	#ComputeDefaultFileName() {
		//now
		let now = new Date()
		//to Unix time
		now = now.getTime() / 1000.0
		//to string
		now = now.toString()

		filepath += now + ".md"

		return filepath
	}

	#ComputeCommitMessage(title) {
		return "Create " + title
	}
}
