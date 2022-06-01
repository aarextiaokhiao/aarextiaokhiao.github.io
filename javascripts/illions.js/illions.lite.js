/*
	illions.lite.js: v2.01
		By Aarex Tiaokhiao, 2021
		GEN. VI-Mu: Lightning-Thornus [Tria-Respeccus III]
		Epsilon Stage
	A lighter program that generates -illion names and abbrevations up to icosillion.

	[DECIMAL LIBRARY IS REQUIRED] https://github.com/aarextiaokhiao/magna_numerus.js/blob/master/logarithmica_numerus_lite.js
	
	See about illions.js at: https://github.com/aarextiaokhiao/illions.js
	Feel free to use it at: https://github.com/aarextiaokhiao/illions.js/blob/main/illions.lite.js
	See the expanded version at: https://github.com/aarextiaokhiao/illions.js/blob/main/illions.js

	Sources:
		Tier 1 - 4: https://sites.google.com/site/largenumbers/home/2-4/8
		            https://sites.google.com/site/pointlesslargenumberstuff/home/1/bowersillions
*/

//OPTIONS
const ILLIONS_OPTIONS = {
	prec: 4, //Significant digits [3 - 9]
	precPoint: 5, //10^10^x before simplification [6 - 9]
	eng: true, //Uses english names for tier-1 illions + millillion.
}

//GLOBAL FUNCTIONS
function abbreviate(x) { return ILLIONS_FUNCTIONS.format(x) }
function standard(x) { return ILLIONS_FUNCTIONS.abb(x, 1) }
function illion(x) { return ILLIONS_FUNCTIONS.abb(x, 1, "name") + (Decimal.eq(x, 0) ? "" : "illion") }
function name(x) { return ILLIONS_FUNCTIONS.name(x) }
function english(x) { return ILLIONS_FUNCTIONS.english(x) }




//MODULE
let ILLIONS = {
	1: {
		name: {
			data: {
				o_s: ['thousand', 'm', 'b', 'tr', "quadr", "quint", "sext", "sept", "oct", "non"],
				o_s_t2: ['', 'un', 'du'],
				o_eng_t2: ['', 'unt', 'duet'],
				o: ['', 'un', 'duo', 'tre', 'quattour', 'quin', 'sex', 'septen', 'octo', 'novem'],

				t: ['', 'dec', 'vigint', 'trigint', 'quadragint', 'quinquagint', 'sexagint', 'septuagint', 'octogint', 'nonagint'],
				h: ['', 'cent', 'ducent', 'tricent', 'quadragent', 'quinquagent', 'sexagent', 'septuagent', 'octogent', 'nonagent'],
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
				if (x <= 2 && ty != "") return d[ty == "add" && ILLIONS_OPTIONS.eng ? "o_eng_t2" : "o_s_t2"][x] + (ty == "mul" ? "" : end)
				if (x < 10) return d.o_s[x] + end
				if (ILLIONS_OPTIONS.eng && h > 0 && o == 3) return dh[h] + "ret" + end
				if (ty == "mul" && t > 0 && h == 0) end = this.combineTen(t, 1)
				return d.o[o] + d.t[t] + this.combineTen(t, h) + dh[h] + end
			},
			combineTen(t, h) {
				if (t == 0 || h == 0) return ""
				if (t >= 3 && ILLIONS_OPTIONS.eng) return "a"
				return "i"
			}
		},
		abb: {
			data: {
				o_s: ['k', 'M', 'B'],
				o: ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"],
				t: ["", "De", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"],
				h: ["", "Ce", "Dc", "Tc", "Qe", "Qu", "Se", "Si", "Oe", "Ne"]
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

let ILLIONS_FUNCTIONS = {
	HTO(x) {
		return {
			h: Math.floor(x / 100),
			t: Math.floor(x / 10) % 10,
			o: x % 10
		}
	},

	safeAbb(x, t, ty, k) {
		if (x == 1 && ty == "mul") return ""
		if (x == 0 && (t > 1 || ty != "")) return ""
		if ((x > 20 && t == 2) || t >= 3) {
			console.error("[illions.lite.js] To go beyond Icosillions, see: https://github.com/aarextiaokhiao/illions.js/blob/main/illions.js")
			return "?"
		}
		if (x >= 1e3) return this.abb(x, t, k)
		return ILLIONS[t][k].format(x, ty)
	},
	abb(x, t = 1, k = "abb") {
		x = new Decimal(x)

		var e = x.e
		if (e == 1/0) return this.abb(x.log10().div(3), t + 1, k)

		var ee = Math.floor(Math.max(Math.log10(x.e), 0))
		var mul = Math.pow(10, Math.max(Math.min(ILLIONS_OPTIONS.precPoint - ee, ILLIONS_OPTIONS.prec) - 1, 0))
		var m = Math.floor((x.m + Math.pow(10, ee - 12)) * mul) / mul
		if (m >= 10) {
			m /= 10
			e++
		}
		if (ee >= ILLIONS_OPTIONS.precPoint) {
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
				if (end == 0 || i > 1) r += this.safeAbb(i, t, end > 0 ? "mul" : e3 > 0 ? "add" : "", k)
				if (end > 0) r += this.safeAbb(end, t + 1, p == 2 || m % Math.pow(10, 6 - 3 * p) == 0 ? "" : "end", k)
			}
		}
		return r
	},

	format(x, k) {
		x = new Decimal(x)
		if (x.lt(1)) return x.toFixed(2)

		var e = x.e
		var ill = (e >= 6 && k == "name" ? "illion" : "")
		if (e == 1/0) return this.abb(x.log10().div(3), 1, k) + ill

		var e3 = Math.floor(e / 3)
		if (e >= Math.pow(10, ILLIONS_OPTIONS.precPoint)) return this.abb(e3 - 1, 1, k) + ill

		var m = (x.m * Math.pow(10, e - e3 * 3)).toFixed(2)
		if (m >= 1e3) {
			m = "1.00"
			e++
			e3++
		}
		return m +
			(e3 > 0 ? " " + this.abb(e3 - 1, 1, k) : "") +
			ill
	},
}

//END OF ILLIONS.LITE.JS
console.log(
	`
	illions.lite.js: v2.01
		By Aarex Tiaokhiao, 2021
		GEN. VI-Mu: Lightning-Thornus [Tria-Respeccus III]
		Epsilon Stage
	A lighter program that generates -illion names and abbrevations up to icosillion.

	[DECIMAL LIBRARY IS REQUIRED] https://github.com/aarextiaokhiao/magna_numerus.js/blob/master/logarithmica_numerus_lite.js
	
	See about illions.js at: https://github.com/aarextiaokhiao/illions.js
	Feel free to use it at: https://github.com/aarextiaokhiao/illions.js/blob/main/illions.lite.js
	See the expanded version at: https://github.com/aarextiaokhiao/illions.js/blob/main/illions.js

	Type 'illion(31415926535)' in your developer console to see an example!
	`
)