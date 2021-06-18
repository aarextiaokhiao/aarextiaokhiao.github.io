//Elements
function getEl(id) {
	return document.getElementById(id)
}

function on_page_load() {
	getEl("container").style.display = ""
	getEl("block").style.animation = "loaded 2s"
	setTimeout(() => getEl("block").style.display = "none", 1000)
}

//Main
let PLAYER = {
	tier: 0,
	time: 0,
	logTop: 0
}

let ILLIONS = {
	T0: {
		data: {
			ones: ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
			teens: ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
			tens: ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
		},
		format(x) {
			return x
		},
		formatRoot(x) {
			let h = Math.floor(x / 100) % 10
			let t = Math.floor(x / 10) % 10
			let o = x % 10

			let r = ""
			let r2 = ""

			if (h > 0) r2 += ILLIONS.T0.data.ones[h] + " hundred"
			r = r2
			r2 = ""

			if (t >= 2) {
				r2 += ILLIONS.T0.data.tens[t]
				if (o > 0) r2 += "-" + ILLIONS.T0.data.ones[o]
			} else if (t == 1) r2 += ILLIONS.T0.data.teens[o]
			else r2 += ILLIONS.T0.data.ones[o]
			r = r + (r != "" && r2 != "" ? " " : "") + r2
			r2 = ""

			return r
		}
	},
	T1: {
		data: {
			ones_start: ["", "m", "b", "tr", "quadr", "quin", "sex", "sept", "oct", "non"],
			ones_start_post_t2: ["", "un", "du", "tr", "quadr", "quin", "sex", "sept", "oct", "non"],
			ones_add: ["", "un", "duo", "tre", "quattour", "quin", "sex", "septen", "octo", "novem"],
			ones_mult: ["", "", "duo", "tr", "quadr", "quint", "sext", "sept", "oct", "non"],

			tens: ["", "dec", "vigint", "trigint", "quadragint", "quinquagint", "sexagint", "septuagint", "octogint", "nonagint"],
			hundreds: ["", "cent", "ducent", "tricent", "quadragent", "quinquagent", "sexagent", "septuagent", "octogent", "nonagent"] 
		},
		format(x) {
			return x
		},
		formatRoot(x, type) {
			let h = Math.floor(x / 100) % 10
			let t = Math.floor(x / 10) % 10
			let o = x % 10

			let r = ""

			if (t > 0) {
				r += ILLIONS.T1.data.tens[t]
				r += h > 0 ? "i" : ""
			}
			if (h > 0) r += ILLIONS.T1.data.hundreds[h]
			if (o > 0) {
				if (t > 0 || h > 0) r = ILLIONS.T1.data.ones_add[o] + r
				else if (type == "pre_t2") r += ILLIONS.T1.data.ones_mult[o]
				else if (type == "post_t2") r += ILLIONS.T1.data.ones_start_post_t2[o]
				else r += ILLIONS.T1.data.ones_start[o]
			}

			if (type == "pre_t2") r += x <= 2 ? "" : "i"

			return r
		}
	},
	T2: {
		data: {
			ones_start: ["", "mill", "micr", "nan", "pic", "fem", "att", "zept", "yoct", "xenn"],
			ones_add: ["", "me", "due", "trio", "tetre", "pente", "hexe", "hepte", "octe", "enne"],
			teens: ["vec", "mec", "duec", "trec", "tetrec", "pentec", "hexec", "heptec", "octec", "ennec"],
			digits: ["", "", "do", "tria", "tetra", "penta", "hexa", "hepta", "octa", "ennea"],
		},
		format(x) {
			return x
		},
		formatRoot(x, type) {
			let h = Math.floor(x / 100) % 10
			let t = Math.floor(x / 10) % 10
			let o = x % 10

			let r = ""

			if (t == 1) r += ILLIONS.T2.data.teens[o]
			else if (o > 0) {
				if (type == "pre_t3" || t > 0 || h > 0) r = ILLIONS.T2.data.ones_add[o]
				else r = ILLIONS.T2.data.ones_start[o]
			}

			if (t >= 2) {
				if (t == 2) r += "icos"
				else r += ILLIONS.T2.data.digits[t] + "cont"
			}

			if (h > 0) {
				if (t > 0) r += "e"
				r += ILLIONS.T2.data.digits[h] + "hect"
			}

			if (type == "pre_t3") {
				if (x >= 10) r += "e"
				if (x < 2) r = ""
			}
			if (type == "pre_t1") r += x == 1 ? "i" : "o"

			return r
		}
	},
}