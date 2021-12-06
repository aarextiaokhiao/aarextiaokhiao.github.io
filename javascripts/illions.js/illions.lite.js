/*
	illions.lite.js
		By Aarex Tiaokhiao, 2021
		GEN. VI-Mu: Lightning-Thornus [Tria-Respeccus III]
		Epsilon Stage
	A lighter program that generates -illion names and abbrevations up to icosillion.
	
	See about illions.js at: https://github.com/aarextiaokhiao/illions.js
	Feel free to use it at: https://github.com/aarextiaokhiao/illions.js/blob/main/illions.lite.js
	See the expanded version at: https://github.com/aarextiaokhiao/illions.js/blob/main/illions.js

	Sources:
		Tier 1 - 4: https://sites.google.com/site/largenumbers/home/2-4/8
		            https://sites.google.com/site/pointlesslargenumberstuff/home/1/bowersillions
		Tamara's Illions: https://tamaramacadam.me/maths/largenumbers/illions.html
*/

let ILLIONS = {
	0: {
		name: {
			data: {
				o: ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
				teen: ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
				t: ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
			},
			format(x) {
				//SETUP
				var d = this.data

				//HTO
				var hto = ILLIONS_FUNCTIONS.HTO(x)
				var h = hto.h
				var t = hto.t
				var o = hto.o

				//FORMAT
				let r = ""
				if (h > 0) r += d.o[h] + " hundred"
				if (t > 0 || o > 0) {
					if (r) r += " "
					if (t == 1) r += d.teen[t]
					else r += d.t[t] + (t > 0 && o > 0 ? "-" : "") + d.o[o]
				}
				return r
			}
		},
		abb: {
			format(x) {
				return x
			}
		}
	},
	1: {
		name: {
			data: {
				o_s: ['thousand', 'm', 'b', 'tr', "quadr", "quint", "sext", "sept", "oct", "non"],
				o_s_t2: ['', 'un', 'du'],
				o_eng_t2: ['', 'unt', 'duet'],
				o: ['', 'un', 'duo', 'tre', 'quattour', 'quin', 'sex', 'septen', 'octo', 'novem'],

				t: ['', 'dec', 'vigint', 'trigint', 'quadragint', 'quinquagint', 'sexagint', 'septuagint', 'octogint', 'nonagint'],
				h: ['', 'cent', 'ducent', 'tricent', 'quadragent', 'quinquagent', 'sexagent', 'septaugent', 'octogent', 'nonagent'],
				h_eng: ['', 'cent', 'ducent', 'trecent', 'quadringent', 'quingent', 'sescent', 'septingent', 'octingent', 'nongent']
			},
			format(x, ty = "") {
				//SETUP
				var d = this.data
				var dh = d[ILLIONS_OPTIONS.eng ? "h_eng" : "h"]

				//HTO
				var hto = ILLIONS_FUNCTIONS.HTO(x)
				var h = hto.h
				var t = hto.t
				var o = hto.o

				var end = ty == "mul" ? "i" : ""
				if (x == 0 && ty == "") return d.o_s[0]
				if (x <= 2 && ty != "") return d[ILLIONS_OPTIONS.eng ? "o_eng_t2" : "o_s_t2"][x] + (ty == "mul" ? "" : end)
				if (x < 10) return d.o_s[x] + end
				if (ILLIONS_OPTIONS.eng && h > 0 && o == 3) return dh[h] + "itret" + (ty == "mul" ? "i" : end)
				return d.o[o] + d.t[t] + (t > 0 && h > 0 ? "i" : "") + dh[h] + end
			}
		},
		abb: {
			data: {
				o_s: ['k', 'M', 'B'],
				o: ['', 'U', 'D', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'O', 'N'],
				t: ['', 'Dc', 'Vg', 'Tg', 'Qd', 'Qi', 'Se', 'St', 'Og', 'Nn'],
				h: ['', 'Ce', 'Dn', 'Tc', 'Qe', 'Qu', 'Sc', 'Si', 'Oe', 'Ne']
			},
			format(x, ty) {
				//SETUP
				var d = this.data

				//HTO
				var hto = ILLIONS_FUNCTIONS.HTO(x)
				var h = hto.h
				var t = hto.t
				var o = hto.o

				if (x < 3 && ty == "") return d.o_s[x]
				return d.o[o] + d.t[t] + d.h[h]
			}
		}
	},
	2: {
		//END OF ILLIONS.LITE.JS: Icosillion
		name: {
			data: [
				"", "mill", "micr", "nan", "pic", "femt", "att", "zept", "yoct", "xenn",
				"vec", "mec", "duec", "trec", "tetrec", "pentec", "hexec", "heptec", "octec", "ennec",
				"icos"
			],
			format(x, ty = "") {
				//SETUP
				var d = this.data

				//MAIN
				var r = d[x]
				if (ty == "end") {
					if (x == 1) r += "i"
					if (x >= 2) r += "o"
					if (x >= 1) r += "-"
				} else if (ILLIONS_OPTIONS.eng && x == 1) r += "in"
				return r
			}
		},
		abb: {
			data: [
				"", "Mi", "Mc", "Na", "Pi", "Fem", "At", "Zep", "Yo", "Xe",
				"Vc", "Mec", "Duc", "Trc", "Tec", "Pec", "Hec", "Hpc", "Otc", "Enc",
				"Ic",
			],
			format(x, ty = "") {
				//SETUP
				var d = this.data

				//MAIN
				var r = d[x]
				if (x >= 1 && ty == "end") r += "-"
				return r
			}
		}
	}
}

let ILLIONS_OPTIONS = {
	prec: 6, //Default: 6 significant digits [3 - 9]
	eng: true //Uses english names for tier-1 illions + millillion.
}

let ILLIONS_FUNCTIONS = {
	HTO(x) {
		return {
			h: Math.floor(x / 100),
			t: Math.floor(x / 10) % 10,
			o: x % 10
		}
	},

	safeAbb(x, t, ty, k) {
		if (x == 0) return
		if (t <= 2) return ILLIONS[t][k].format(x, ty)
		else console.error("Tier 3+ abbreviations aren't supported.")
	},
	abb(x, t = 1, k = "abb") {
		x = new Decimal(x)

		var e = x.e
		var ee = Math.floor(Math.max(Math.log10(x.e), 0))
		var mul = Math.pow(10, Math.max(ILLIONS_OPTIONS.prec - 1 - ee, 0))
		var m = Math.floor((x.m + Math.pow(10, ee - 12)) * mul) / mul
		if (m >= 10) {
			m /= 10
			e++
		}
		if (ee >= ILLIONS_OPTIONS.prec) {
			if (t == 1 && k == "name") return this.abb(Math.floor(e / 3), t + 1, k) + "illion"
			return this.abb(Math.floor(e / 3), t + 1, k)
		}

		var r = ""
		var e3 = Math.floor(e / 3)
		var end = 0
		m = Math.round(m * Math.pow(10, 6)) * Math.pow(10, e - e3 * 3)
		for (var p = 0; p < 3; p++) {
			var i = Math.floor(m / Math.pow(10, 6 - 3 * p)) % 1e3
			if (e3 - p < 0) continue
			if (e3 == 0 || i > 0) {
				end = e3 - p
				if (end == 0 || i > 1) r += ILLIONS[t][k].format(i, end > 0 ? "mul" : e3 > 0 ? "add" : "")
				if (end > 0) r += this.safeAbb(end, t + 1, p == 2 || m % Math.pow(10, 6 - 3 * p) == 0 ? "" : "end", k)
			}
		}
		if (t == 1 && k == "name") r += "illion"
		return r
	},

	format(x, k) {
		x = new Decimal(x)
		if (x.lt(1)) return x.toFixed(2)

		var e = x.e
		var e3 = Math.floor(e / 3)
		if (e >= Math.pow(10, ILLIONS_OPTIONS.prec)) return this.abb(e3 - 1, 1, k)

		return (x.m * Math.pow(10, e - e3 * 3)).toFixed(2) + (e3 > 0 ? " " + this.abb(e3 - 1, 1, k) : "")
	},
}

console.log(
	`
	illions.lite.js
		By Aarex Tiaokhiao, 2021
		GEN. VI-Mu: Lightning-Thornus [Tria-Respeccus III]
		Epsilon Stage
	A lighter program that generates -illion names and abbrevations up to icosillion.
	
	See about illions.js at: https://github.com/aarextiaokhiao/illions.js
	Feel free to use it at: https://github.com/aarextiaokhiao/illions.js/blob/main/illions.lite.js
	See the expanded version at: https://github.com/aarextiaokhiao/illions.js/blob/main/illions.js
	`
)