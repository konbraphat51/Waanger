class GitHubUploader {
	constructor(token = null, domainUrl = "https://api.github.com/") {
		if (token !== null) {
			this.SetToken(token)
		}

		this.domainUrl = domainUrl
	}

	/**
	 * Upload file to GitHub repository
	 *
	 * https://docs.github.com/ja/rest/repos/contents?apiVersion=2022-11-28#create-or-update-file-contents
	 *
	 * @param {string} repositoryOwner - Repository owner
	 * @param {string} repositoryName - Repository name
	 * @param {string} filePath - File path in the repository
	 * @param {string} commitMessage - Commit message
	 * @param {string} fileContent - File content
	 * @param {string} [branch=null] - Branch name. Null for default branch
	 * @param {string} [committerName=null] - Committer name. Null for default
	 * @param {string} [committerEmail=null] - Committer email. Null for default
	 * @param {string} [authorName=null] - Author name. Null for default
	 * @returns {number} HTTP status code
	 */
	async Upload(
		repositoryOwner,
		repositoryName,
		filePath,
		commitMessage,
		fileContent,
		branch = null,
		committerName = null,
		committerEmail = null,
		authorName = null,
	) {
		const url = this.BuildUploadUrl(repositoryOwner, repositoryName, filePath)

		//base 64 encoding
		const content = btoa(fileContent)

		const header = {
			Authorization: `Bearer ${this.accessToken}`,
			Accept: "application/vnd.github+json",
			"X-GitHub-Api-Version": "2022-11-28",
		}

		//get SHA
		const sha = await this.#GetSHA(
			repositoryOwner,
			repositoryName,
			filePath,
			branch,
		)

		//build body
		const body = {
			message: commitMessage,
			content: content,
		}
		if (sha !== null) {
			body.sha = sha
		}
		if (branch !== null) {
			body.branch = branch
		}
		if (committerName !== null) {
			body.committer = {
				name: committerName,
				email: committerEmail,
			}
		}
		if (authorName !== null) {
			body.author = {
				name: authorName,
			}
		}

		//PUT
		const response = await fetch(url, {
			method: "PUT",
			headers: header,
			body: JSON.stringify(body),
		})

		//return status
		return response.status
	}

	SetToken(token) {
		this.accessToken = token
	}

	/**
	 * Get SHA of file
	 *
	 * https://docs.github.com/ja/rest/repos/contents?apiVersion=2022-11-28#get-repository-content
	 *
	 * @param {string} repositoryOwner - Repository owner
	 * @param {string} repositoryName - Repository name
	 * @param {string} filePath - File path in the repository
	 * @param {string} [ref=null] - The name of the commit/branch/tag. Null for default branch
	 * @returns {string} SHA of the file. Null if file not exists
	 */
	async #GetSHA(repositoryOwner, repositoryName, filePath, ref = null) {
		const url = this.#BuildGetUrl(repositoryOwner, repositoryName, filePath)

		const header = {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${this.accessToken}`,
			"X-GitHub-Api-Version": "2022-11-28",
		}

		if (ref !== null) {
			//add query
			url += `?ref=${ref}`
		}

		//fetch
		const response = await fetch(url, {
			method: "GET",
			headers: header,
		})

		if (response.status === 404) {
			return null
		} else if (response.status === 200) {
			const data = await response.json()
			return data.sha
		}
	}

	#BuildGetUrl(repositoryOwner, repositoryName, filePath) {
		return `${this.domainUrl}repos/${repositoryOwner}/${repositoryName}/contents/${filePath}`
	}

	/**
	 * API URL of file upload
	 *
	 * Dependent to https://docs.github.com/ja/rest/repos/contents?apiVersion=2022-11-28#create-or-update-file-contents
	 */
	#BuildUploadUrl(repositoryOwner, repositoryName, filePath) {
		return `${this.domainUrl}repos/${repositoryOwner}/${repositoryName}/contents/${filePath}`
	}
}
