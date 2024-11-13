class PassReverser {
	/**
	 * @param {object} diffused diffusion dictionary
	 */
	constructor(diffused) {
		const json_raw = atob(diffused)
		const dictionary = JSON.parse(json_raw)

		this.diffused = dictionary
	}

	Reverse(input) {
		let reversed = ""

		let counters = {}
		const keys = Object.keys(this.diffused)
		for (let cnt = 0; cnt < keys.length; cnt++) {
			counters[keys[cnt]] = 0
		}

		for (let cnt = 0; cnt < input.length; cnt++) {
			let char = input[cnt]

			//avoid error
			if (counters[char] >= this.diffused[char].length) {
				counters[char] = 0
			}

			let adding = this.diffused[char][counters[char]]
			counters[char] += 1

			reversed += adding
		}

		return reversed
	}
}

const passReverser = new PassReverser(
	//hard code open key
	"eyIwIjpbIlB6ZldJR1UiLCJxWER1Tk1lIiwiQmJqWDBSYiIsIkRBa1lJVGQiLCI5dWNadW1NIl0sIjEiOlsiVkJDelhnSSIsIjlYblFrMUkiLCIwRkZMSndEIiwiVkQ3dnZ6TiIsInd1VzNxUngiXSwiMiI6WyJMMDZ1QjFxemMiLCJ4WURXVlg3IiwiMXVNc3VESSIsIjZpVkVFTlAiLCJiYWd3Q2hDIl0sIjMiOlsieGFFZFBVbCIsInppMEEyNjgiLCJYOEpLbHV2IiwiS0lIblNQMiIsIlY5YlI5UUgiXSwiNCI6WyJZWTU1QVhCIiwiNlpoM0JMdyIsInRrYnVEMmYiLCJlZEMwTVpBIiwiU25MZTNNViJdLCI1IjpbIkRtVTNsbzUiLCJEelpYS1M0IiwiUEJHa1o1VCIsIlAxaVZyckwiLCJFWW8zR1l4Il0sIjYiOlsib2k3dExPayIsImhkM1FFMDYiLCJ6ZjFHbGFNIiwiS1ZoVzhPMiIsInF5RVRRVzYiXSwiNyI6WyJPZW52cjloIiwiS1ZBYk1uSSIsIjNFVlFmSE4iLCJsZzZDM2JwIiwiYTZ6U1YzYyJdLCI4IjpbIk5qYWVWR2giLCJaaml4TXRkIiwiU01jejBNdyIsImp1RENYSjgiLCI5cFdqcVBmIl0sIjkiOlsibXozeFJESCIsInIzV3ZDdmgiLCJBREpMV1pWIiwiWEw0dEk0dyIsInF3ZzhyWmYiXSwiYSI6WyJZSTRISkEwIiwiSGRSbzVfVSIsInMwQTdQWDkiLCJpUUVmUzJZcU8iLCJGdzNpZFREUnUiXSwiYiI6WyJPZmp1b2dkIiwiQXBwV0dPciIsIjdTbFN4N2ciLCI0MlZUYXVZIiwiTnJENHZtRCJdLCJjIjpbIkVIQVF6cHAiLCJYdktPcHBSIiwiYlF4YkR3QSIsIkg1SWFqQ0ciLCJKY0ZxWmU2Il0sImQiOlsicGF0XzExQSIsImVRM2lyTFdXbCIsImR0ZUxzOFIiLCJINTdtamprIiwiZ1JFa2l6RCJdLCJlIjpbIlU2NjBZVFIiLCJ5VVRQekpNIiwiZVRUY1FJWCIsInNjQ3l2c2oiLCJTUUQzbURIIl0sImYiOlsiNjFpUlUzYiIsIlhhS2JBQ2siLCJ3cE5NSWdDIiwiTUwzSXFIOCIsIkt0U3NaWDMiXSwiZyI6WyJvdGtsbkx0IiwiQm8xdGRmVSIsIlVraDFha2EiLCJiTTFOZFpFIiwiSkFOWHVNTiJdLCJoIjpbIkdIZ0dPdU4iLCJoaFUxS2FXIiwiY0g5RnBrViIsIkVlYjlJaHkiLCJKVURzOXVHIl0sImkiOlsidVVKd2FDeiIsImMwZVY4VEciLCJMUld3VGVDIiwiWXNlWHRsYSIsIlF5UnMzSVgiXSwiaiI6WyJWdnB5V3k2IiwieGdMeUJlMiIsIlIyYk9WejMiLCJjNVVVeDgyIiwiR2NkU2lsUSJdLCJrIjpbIllGY0hIR1AiLCJjYzloVHkwIiwiUTFRTWk3TSIsIkN2bXZnREEiLCI5UUtvTGdMIl0sImwiOlsiSGRrMThxdiIsIlVmcFBJRTQiLCJHdFJzRVk0IiwiN0NTNTlIZCIsIlhQQUt3akMiXSwibSI6WyJmTGlSTlRlIiwiZ0FsMFF4dVVYIiwiYmxabmRuQiIsIk1uTTN1V28iLCJKVFNOT3FnIl0sIm4iOlsiRG53U0N2VyIsInBiNklZdUUiLCJmU0NBc1RyIiwiUnZoZ0JPNSIsImV4N1JYYzciXSwibyI6WyJ5Y3NSWDZtIiwiNzdFYzVhVCIsIjRESzFNSWMiLCJaNWtXSGYwIiwidkdwRzJ1QiJdLCJwIjpbIk1xMEljaHgiLCJrd3AxVmdqIiwiN01iZ3oyTSIsIk03bnY2TkciLCJrRjRJa1dOIl0sInEiOlsiTnZoWURubyIsImpVMU43TFAiLCJhTzYxV1pQIiwiMEZZWnlMYSIsIkhFNHo0bTMiXSwiciI6WyJQU2tCZ0ZWIiwiQ0dQekJPcyIsInowTW5ZVWsiLCJ5cld5SENPIiwiVk5pTExNbyJdLCJzIjpbIjV4bXNmaWYiLCJmY0x5ekF2IiwiQlVzY01BRiIsIkFvWXdLZ0oiLCJOMHlzdlp5Il0sInQiOlsiWTRaT0dLayIsIk0xSmpxb3giLCJycDB3VDBLIiwidjBrQUppdSIsIjFxNEVSZXQiXSwidSI6WyJhMUxOY1dZIiwiWGlpenA4QiIsIkpJWDh0NnciLCJoem81ZDBBIiwiTkQ5ME5UTSJdLCJ2IjpbIllJUndWUVciLCJiZ215OHBHIiwiUGkxRjRreSIsIlBnclgxaEwiLCJsTjVpVXFMIl0sInciOlsiSkh2R2NJWiIsIjZzM3Y1VWwiLCJNaHhiNnNFIiwiTWhsN3d0OCIsInY0NndqUmkiXSwieCI6WyJ6ZkRBN3BPIiwiYmlVU0hJQiIsInF4VmY4R28iLCIxZjhFUUlEIiwiY2VSOUUybiJdLCJ5IjpbImxlTGN6dDQiLCJRaHNna20yIiwiTUNaRzBteiIsImE4UmFCWHUiLCI3SkJ4WmYwIl0sInoiOlsiR1c2dVN6QSIsInFNQUV2VVgiLCJvMmFhdktpIiwiTUdwRHVZdSIsIjJYUDFkRnUiXSwiQSI6WyJZQm5zVjBGIiwibGM1aDA2QSIsImw5WDRUcnQiLCJ0eFZjMmdJIiwiaEF2dmdoWSJdLCJCIjpbIklmOWQ2engiLCJzTTFrUkJsIiwid2FyOWNZUCIsIjROUElXcUoiLCJEbWI4WlNrIl0sIkMiOlsiRlZVR3JMMyIsInljTFp0NmMiLCIwSTU4djN6IiwiRjhGWTBQViIsImE1SUtWYVMiXSwiRCI6WyI4ZTZIN0E4IiwiazRFZWNNdCIsIlo2U0lYSnMiLCJERmdTc3NZIiwiQUdxQ041ZyJdLCJFIjpbIld2aEtocHEiLCJaVldzSGlNIiwiZU9Qb2hUcyIsIkNGUGRFZ00iLCJCWFViNldiIl0sIkYiOlsicEFnYXM0ZSIsIlVDZWUyZmgiLCJkOFJtNnZZIiwiamdnSXpsUSIsIjAxMDF5N1YiXSwiRyI6WyJ3T0d3T2hTIiwiWHBCT3FyNCIsImVyTld4N08iLCJwWjhWTmV2IiwiaXpDUlVQQiJdLCJIIjpbImM4QjhyYVMiLCIyZDVmOE9PIiwieDg5TlBuMCIsIlR0QUg3VnciLCJDRWV5b1Q3Il0sIkkiOlsiWEllY09WMiIsImNzMUN1bkciLCI2ZUR2ZWV6IiwiZUZDM3dMWSIsIjVISVg1S2MiXSwiSiI6WyJyMWU2TXFBIiwiNGpQMkxybCIsIms4TDBYSzIiLCJyOHZ6YklXIiwiVWx4UGYwViJdLCJLIjpbIlprUTFEckEiLCJ0a3l6dkc1IiwiSGtyWGh2USIsInRKd3owVGwiLCJjRnUySGlJIl0sIkwiOlsiV2hKbDk4UCIsIkxpc3k4VHoiLCJCSWY3a05kIiwiNmJyeHkycyIsIjA1Q0lleVAiXSwiTSI6WyJyWVc4WFJYIiwiUUdNOWZtTyIsIlhjeHBFeW4iLCJhREI0ak9MIiwibEY3QWFTTyJdLCJOIjpbIkxNSmtHd0oiLCJBVUlvTE1CIiwiY2FsWlJobyIsInVUYjBCak8iLCJQdmZ0SGtjIl0sIk8iOlsiYmhuQUFWQiIsIklRdnlvdzUiLCJNNkhWazBWIiwiNmdyRUxZcyIsIlRHcTFzR0MiXSwiUCI6WyJ6RURUVTZ1IiwiZzNzRDNyQiIsImp1OE9kZXciLCI2cWFaZTMwIiwiNXJHOG91TCJdLCJRIjpbIlRqV25sMm4iLCJ6MGNJYzRWIiwiRGpQaHFtQiIsIkJTZ1B1V24iLCJ5QUs3bEJrIl0sIlIiOlsiYlZUb0R1OSIsIjhvT245N3AiLCJSOXhSMUsxIiwibEVuVTlmWSIsIjFwVDljdmMiXSwiUyI6WyJ5OERCQ3dEIiwiRHpESFNoQiIsIjdhaW9NdzIiLCJib0RqOW5FIiwiZW1ETExVZCJdLCJUIjpbIno1Wm8zM0kiLCJJSmI3MERsIiwibUYxcUJ3TiIsInI3d0E2Tm8iLCJUbmVoOHpTIl0sIlUiOlsiZ2l0aHViXyIsIkp0RmhpMlBhMCIsIlBqdG1vU08iLCJHOURHeEtxIiwiVWNBdkRLTSJdLCJWIjpbIjlvOEI2WEMiLCJZcEhERUl0IiwiSW5nZHd3dSIsIkxyRkZ0Z0oiLCJGM25jc3NwIl0sIlciOlsiVGtsVEkxMCIsIklZY3BpNU0iLCJsb001WXU4IiwidmFoTTlIeiIsIk84NW90OFEiXSwiWCI6WyJjZERSMHdDIiwiWDhvQ2VwZSIsIlRQUGlibmUiLCJkc3pxN0JzIiwiRXN6SEFtSSJdLCJZIjpbIjV4ZXpPV3giLCJvM2VNcnNsIiwiSEpaSU10NyIsIndSdjBPbngiLCJEbDA2Q0pzIl0sIloiOlsiaEI2UXE4dCIsIk12MXY0MmkiLCJvN2RaajlkIiwibFVwSlJyVyIsInowaUpaVjgiXX0=",
)
