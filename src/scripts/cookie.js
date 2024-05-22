/**
 * get cookie from browser and make a object
 *
 * @returns {object} object of cookie: key(str) -> value(str)
 */
function GetCookie() {
	const raw = document.cookie

	// Split the cookie string into an array of key/value pairs
	const list = raw.split(";")
	const cookie = {}
	for (let cnt = 0; cnt < list.length; cnt++) {
		const pair = list[cnt].split("=")
		cookie[pair[0].trim()] = pair[1]
	}

	return cookie
}

/**
 * get cookie value by key
 *
 * @param {string} key key of cookie
 * @returns {string} value of the key
 */
function GetCookieValue(key) {
	const cookie = GetCookie()
	return cookie[key]
}

/**
 * set 1 cookie param
 *
 * @param {string} key key of cookie
 * @param {string} value value of the key
 * @returns {void}
 */
function SetCookie(key, value) {
	document.cookie = `${key}=${value}`
}
