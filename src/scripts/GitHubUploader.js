class GitHubUploader {
	constructor(domainUrl = "https://api.github.com/") {
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
	 */
	Upload(
		repositoryOwner,
		repositoryName,
		filePath,
		commitMessage,
		fileContent,
		branch = null,
		committerName = null,
		committerEmail = null,
		authorName = null,
	) {}

	/**
	 * API URL of file upload
	 *
	 * Dependent to https://docs.github.com/ja/rest/repos/contents?apiVersion=2022-11-28#create-or-update-file-contents
	 */
	#BuildUploadUrl(repositoryOwner, repositoryName, filePath) {
		return `${this.domainUrl}repos/${repositoryOwner}/${repositoryName}/contents/${filePath}`
	}
}
