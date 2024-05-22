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

		this.markdownGenerator = new MarkDownGenerator()
	}

	Upload(metadata, content) {
		//gerate markdown
		const markdown = this.markdownGenerator.Generate(metadata, content)

		const filename = this.#ComputeDefaultFileName()
		super.Upload(
			this.repositoryOwner,
			this.repositoryName,
			this.fileDirectory + filename,
			this.#ComputeCommitMessage(metadata.title),
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
