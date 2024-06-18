/**
 * Include MarkDownGenerator.js and GitHubUploader.js
 * Create Markdown and upload it to GitHub
 */
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
		super()

		this.repositoryOwner = repositoryOwner
		this.repositoryName = repositoryName
		this.fileDirectory = fileDirectory
		this.branch = branch
		this.committerName = committerName
		this.committerEmail = committerEmail
		this.authorName = authorName

		this.markdownGenerator = new MarkDownGenerator()
	}

	async Upload(metadata, content) {
		//gerate markdown
		const markdown = this.markdownGenerator.Generate(metadata, content)

		let filename = ""
		let updating = false
		if (metadata.filename == undefined) {
			filename = this.#ComputeDefaultFileName()
			updating = false
		} else {
			filename = metadata.filename + ".md"
			updating = true
		}

		return await super.Upload(
			this.repositoryOwner,
			this.repositoryName,
			this.fileDirectory + filename,
			this.#ComputeCommitMessage(metadata.title, updating),
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
		//to int
		now = parseInt(now)
		//to string
		now = now.toString()

		return now + ".md"
	}

	#ComputeCommitMessage(title, updating) {
		if (updating) {
			return "Update " + title
		} else {
			return "Create " + title
		}
	}
}
