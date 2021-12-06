/*
	illions.js
		By Aarex Tiaokhiao, 2021
		GEN. VI-Mu: Lightning-Thornus [Tria-Respeccus III]
		Epsilon Stage
	A program that generates -illion names and abbrevations up to currently icosillion.
	
	See about illions.js at: https://github.com/aarextiaokhiao/illions.js
	Feel free to use it at: https://github.com/aarextiaokhiao/illions.js/blob/main/illions.js

	Sources:
		Tier 1 - 4: https://sites.google.com/site/largenumbers/home/2-4/8
		            https://sites.google.com/site/pointlesslargenumberstuff/home/1/bowersillions
		Tier 4 - 6: https://integralview.wordpress.com/2020/10/01/extended-tier-4-to-6-illions/
		Fonster's 2M Prefixes [Tier 5]: https://sites.google.com/site/pointlesslargenumberstuff/home/l/pgln2/2msiprefixes
		Connections: https://docs.google.com/document/d/1dhCjmN9_qOyydKY6a_rzbCfNg8yIGslEPVfA9iz60Ig/edit?usp=sharing
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
				if (ILLIONS_OPTIONS.tam && h >= 1) {
					var r = ""
					if (h > 1 || x == 100) {
						r += dh[h]
						if (x % 100 > 0) r += "i"
					}
					if (x % 100 > 0) r += d.t[t] + (t > 0 ? "i" : "") + d.o[o] + dh[1] + end
					return r
				}
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
				if (ILLIONS_OPTIONS.tam && h >= 1) {
					var r = ""
					if (h > 1 || x == 100) r += d.h[h]
					if (x % 100 > 0) r += d.t[t] + d.o[o] + d.h[1]
					return r
				}
				return d.o[o] + d.t[t] + d.h[h]
			}
		}
	},
	2: {
		//END OF ILLIONS.LITE.JS: Icosillion
		name: {
			data: {
				eng: [
					"", "mill", "micr", "nan", "pic", "femt", "att", "zept", "yoct", "xenn",
					"vec", "mec", "duec", "trec", "tetrec", "pentec", "hexec", "heptec", "octec", "ennec",
					"icos"
				],
				tam: [
					"", "mo", "do", "tro", "tetro", "pento", "hexo", "hepto", "octo", "enno",
				]
			},
			format(x, ty = "") {
				//SETUP
				var d = this.data[ILLIONS_OPTIONS.tam ? "tam" : "eng"]

				//MAIN
				var r = ""
				if (ILLIONS_OPTIONS.tam) {
					//HTO
					var hto = ILLIONS_FUNCTIONS.HTO(x)
					var h = hto.h
					var t = hto.t
					var o = hto.o

					if (h > 0) {
						if (h >= 2) r = d[h]
						r += "conto"
					}
					if (t > 0) {
						if (t >= 2) r += d[t]
						r += "deco"
					}
					r += d[o] + "n"
					if (ty == "end") r += "o"
				} else {
					r = d[x]
					if (ty == "end") {
						if (x == 1) r += "i"
						if (x >= 2) r += "o"
						if (x >= 1) r += "-"
					} else if (ILLIONS_OPTIONS.eng && x == 1) r += "in"
				}
				return r
			}
		},
		abb: {
			data: {
				eng: [
					"", "Mi", "Mc", "Na", "Pi", "Fem", "At", "Zep", "Yo", "Xe",
					"Vc", "Mec", "Duc", "Trc", "Tec", "Pec", "Hec", "Hpc", "Otc", "Enc",
					"Ic",
				],
				tam: ["", "M", "D", "Tr", "Te", "Pe", "He", "Hp", "Oc", "En"],
			},
			format(x, ty = "") {
				//SETUP
				var d = this.data[ILLIONS_OPTIONS.tam ? "tam" : "eng"]

				//MAIN
				var r = ""
				if (ILLIONS_OPTIONS.tam) {
					//HTO
					var hto = ILLIONS_FUNCTIONS.HTO(x)
					var h = hto.h
					var t = hto.t
					var o = hto.o

					if (h > 0) {
						if (h >= 2) r = d[h] + "c"
						else r = "Co"
					}
					if (t > 0) {
						if (t >= 2) r += d[t] + "d"
						else r += "De"
					}
					r += d[o] + "n"
				} else r = d[x]
				if (x >= 1 && ty == "end") r += "-"
				return r
			}
		}
	}
}

let ILLIONS_OPTIONS = {
	eng: true, //Uses english names for tier-1 illions + millillion.
	tam: true //Uses Tamara's illions.
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
	illions.js
		By Aarex Tiaokhiao, 2021
		GEN. VI-Mu: Lightning-Thornus [Tria-Respeccus III]
		Epsilon Stage
	A program that generates -illion names and abbrevations up to currently icosillion.
	
	See about illions.js at: https://github.com/aarextiaokhiao/illions.js
	Feel free to use it at: https://github.com/aarextiaokhiao/illions.js/blob/main/illions.js
	`
)

/*
let ILLIONS = {
	T2: {
		data: {
			ones_start: ["", "mill", "micr", "nan", "pic", "fem", "att", "zept", "yoct", "xenn"],
			ones_add: ["", "me", "due", "trio", "tetre", "pente", "hexe", "hepte", "octe", "enne"],
			teens: ["vec", "mec", "duec", "trec", "tetrec", "pentec", "hexec", "heptec", "octec", "ennec"],
			digits: ["", "", "do", "tria", "tetra", "penta", "hexa", "hepta", "octa", "ennea"],

			abbs_starts: ['', 'MI', 'MC', 'NA', 'PC', 'FM', 'AT', 'ZP', 'YC', 'XN'],
			abbs_ones: ['', 'ME', 'DU', 'TR', 'TE', 'P', 'HX', 'HP', 'OT', 'E'],
			abbs_tens: ['', 'C', 'IC', 'TCN', 'TRC', 'PCN', 'HCN', 'HPC', 'OCN', 'ECN'],
			abbs_hundreds: ['', 'HC', 'DH', 'TH', 'TRH', 'PH', 'HH', 'HPH', 'OH', 'EH'],
		},
		format(x) {
			return x
		},
		formatAbb(x, type) {
			let h = Math.floor(x / 100) % 10
			let t = Math.floor(x / 10) % 10
			let o = x % 10
			let d = ILLIONS.T2.data
			let p100 = x % 100

			let x = ''
			if (x < 10) return d.abbs_starts[0][o]
			if (p100 == 10) x = 'V'
			else x = d.abbs_hundreds[h]
			if (x <= 10 || x >= 20) x += d.abbs_tens[t]
			x += d.abbs_ones[o]

			return x
		},
		formatRoot(x, type) {
			let h = Math.floor(x / 100) % 10
			let t = Math.floor(x / 10) % 10
			let o = x % 10
			let d = ILLIONS.T2.data

			let r = ""

			if (t == 1) r += d.teens[o]
			else if (o > 0) {
				if (type == "pre_t3" || t > 0 || h > 0) r = d.ones_add[o]
				else r = d.ones_start[o]
			}

			if (t >= 2) {
				if (t == 2) r += "icos"
				else r += d.digits[t] + "cont"
			}

			if (h > 0) {
				if (t > 0) r += "e"
				r += d.digits[h] + "hect"
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
*/