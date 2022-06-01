/* FORMAT */
var smallAbbs = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc', 'TDc', 'QaDc', 'QtDc', 'SxDc', 'SpDc', 'ODc', 'NDc', 'Vg', 'UVg', 'DVg', 'TVg', 'QaVg', 'QtVg', 'SxVg', 'SpVg', 'OVg', 'NVg', 'Tg', 'UTg', 'DTg', 'TTg', 'QaTg', 'QtTg', 'SxTg', 'SpTg', 'OTg', 'NTg', 'Qd', 'UQd', 'DQd', 'TQd', 'QaQd', 'QtQd', 'SxQd', 'SpQd', 'OQd', 'NQd', 'Qi', 'UQi', 'DQi', 'TQi', 'QaQi', 'QtQi', 'SxQi', 'SpQi', 'OQi', 'NQi', 'Se', 'USe', 'DSe', 'TSe', 'QaSe', 'QtSe', 'SxSe', 'SpSe', 'OSe', 'NSe', 'St', 'USt', 'DSt', 'TSt', 'QaSt', 'QtSt', 'SxSt', 'SpSt', 'OSt', 'NSt', 'Og', 'UOg', 'DOg', 'TOg', 'QaOg', 'QtOg', 'SxOg', 'SpOg', 'OOg', 'NOg', 'Nn', 'UNn', 'DNn', 'TNn', 'QaNn', 'QtNn', 'SxNn', 'SpNn', 'ONn', 'NNn', 'Ce', 'UCe'];

/* TIERS */
function toTier1Abb(t1, aas) {
	let prefixes = aas ? [
		["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"],
		["", "De", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"],
		["", "Ce", "Dc", "Tc", "Qe", "Qu", "Se", "Si", "Oe", "Ne"],
	] : [
		['', 'U', 'D', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'O', 'N'],
		['', 'Dc', 'Vg', 'Tg', 'Qd', 'Qi', 'Se', 'St', 'Og', 'Nn'],
		['', 'Ce', 'Dn', 'Tc', 'Qe', 'Qu', 'Sc', 'Si', 'Oe', 'Ne']
	]
	let o = t1 % 10
	let t = Math.floor(t1 / 10) % 10
	let h = Math.floor(t1 / 100) % 10

	let r = ""
	if (t1 > 1 || t2 == 0) r = prefixes[0][o] + prefixes[1][t] + prefixes[2][h]

	return r
}

function toTier2Abb(t2, aas) {
	if (!t2) return ""

	let prefixes2 = [
		["", "Mi", "Mc", "Na", aas ? "Pi" : "Pc", aas ? "Fem" : "Fm", "At", "Zep", "Yo", "Xe"],
		["", "Me", "Du", "Tr", "Te", "Pe", "He", "Hp", "Ot", "En"],
		["", "C", "Ic", "TCn", "TeC", "PCo", "HCt", "HpC", "OCn", "ECo"],
		["", "Hc", "DHe", "THt", "TeH", "PHc", "HHe", "HpH", "OHt", "EHc"]
	]
	let o = t2 % 10
	let t = Math.floor(t2 / 10) % 10
	let h = Math.floor(t2 / 100) % 10

	let r = ''
	if (t2 < 10 && t3 == 0) return prefixes2[0][t2]
	else if (t2 > 1 || t > 0) {
		if (t == 1 && o == 0) r += "Vc"
		else r += prefixes2[1][o] + prefixes2[2][t]
		r += prefixes2[3][h]
	}
	r = standardize(r, toTier3Abb(t3), aas)

	return r
}

function toTier3Abb(t3) {
	if (!t3) return ""
	var d = [
		[
			"", "Kl", "Mg", "Gi", "Ter", "Pt", "Ex", "Zt", "Yt", "Xe",
			"Dak", "Hn", "Dok", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD",
		],
		["K", "keN", "coD", "ctR", "ctE", "kpT", "keX", "czE", "kyO", "cxN"],
		["", "", "I", "Tr", "Te", "Pe", "Ex", "Za", "Yo", "N"]
	]

	if (t3 < 20) return d[0][t3]
	if (t3 == 30) return "TrA"
	if (t3 == 70) return "Za"
	if (t3 == 100) return "HoT"
	return d[2][Math.floor(t3 / 10)] + d[1][t3 % 10]
}

/* STANDARDIZE */
function abbreviate(x, aas, tier = 1) {
	x = new Decimal(x)

	//exponent
	var e = x.e
	var e3 = Math.floor(e / 3)
	var p = Math.max(Math.min(Math.floor(8 - Math.log10(e3)), 5), -1)

	//mantissa
	var m = Math.round(x.m * Math.pow(10, p))
	var d = p - (e - e3 * 3)
	if (d < 0) m *= Math.pow(10, -d)
	else m /= Math.pow(10, d)
	console.log(e, e3, m, p)

	/*var precise = Math.max(Math.min(Math.floor(8 - Math.log10(e3)), 5), 0)
	var mant = Math.floor((x.m + 1e-15) * Math.pow(10, precise)) * Math.pow(10, 5 - precise)

	if (precise == 0) return abbreviate(x.log(1e3).floor(), tier + 1)
	var r = ""

	for (var i = 0; i < 2; i++) {
		r += mant
	}
	console.log(r)*/
}

function standardize(x, y, aas) {
	if (!aas) x = x.toUpperCase()
	return x + (x != "" && y != "" ? "`" : "") + y
}

function clearValue() {
	document.getElementById("number").value = ""
	toStandard()
}

function toStandard() {
	if (!document.getElementById("number").value) {
		document.getElementById("result").style.display = "none"
		document.getElementById("converted").style.display = "none"
		document.getElementById("start").style.display = ""
		return
	} else {
		document.getElementById("result").style.display = ""
		document.getElementById("converted").style.display = ""
		document.getElementById("start").style.display = "none"
	}

	var value = new Decimal(document.getElementById("number").value)
	var neg = value.lt(0) ? "-" : ""
	var log = value.abs().log10()
	if (value.eq(0)) log = new Decimal(0)
	var recp = value.abs().lt(0.01)
	var recpText = recp ? "1 / " : ""

	//Converted
	var mag = value.mag
	var layer = value.layer
	var recp2 = false
	if (mag < 0 && layer > 0) {
		recp2 = true
		mag = -mag
	}
	if (mag >= 1e15) {
		mag = Math.log10(mag)
		layer++
	}
	document.getElementById("converted").textContent = neg + "e".repeat(Math.max(layer - 1, 0)) + (layer > 0 ? (mag < 1e3 ? Math.pow(10, mag % 1).toFixed(2) : "") + "e" : "") + (mag < 1e3 ? Math.floor(mag) : doStandard(new Decimal(mag))) + " = "

	//Standard
	var logAbs = log.abs()
	if (Decimal.pow(10, 3e300).lt(logAbs)) {
		document.getElementById('result').innerHTML = "> " + neg + recpText + doHighStandard(Decimal.pow(10, 3e300), true) + " (capped at " + neg + "1e" + (recp ? "-" : "") + "1e3e300)"
		document.getElementById('result').innerHTML += "<br><b style='color: red'>WARNING! BEYOND HOTILLION IS NOT IMPLEMENTED YET!</b>"
	} else if (logAbs.gte(3e60 + 3)) {
		document.getElementById('result').innerHTML = neg + recpText + doHighStandard(logAbs, true)
	} else if (logAbs.gte(3e9 + 3)) {
		document.getElementById('result').innerHTML = "<br>Shortened <b>Standard</b>: " + neg + recpText + doHighStandard(logAbs) +
			"<br><b>AAS</b>: " + neg + doHighStandard(logAbs, true)
	} else doStandard(value, true)
}

function doStandard(v, disp) {
	var prefix = ""
	if (v.lt(0)) {
		v = v.neg()
		prefix += "-"
	}
	if (v.gt(0) && v.lt(0.01)) {
		v = v.recip()
		prefix += "1 / "
	}

	var mantissa = v.m
	var exponent = v.e
	mantissa = mantissa * Math.pow(10, exponent % 3)
	exponent = exponent - exponent % 3
	if (Math.abs(mantissa) >= 999.995) {
		mantissa /= 1000
		exponent += 3
	}
	if (exponent < 3) {
		if (disp) document.getElementById('result').innerHTML = prefix + mantissa.toFixed(2)
		else return mantissa.toFixed(2)
	} else {
		if (disp) var aas = AAS(v)
		if (exponent < 309) var result = smallAbbs[exponent / 3]
		else {
			var result = ''
			exponent = Math.floor(exponent / 3) - 1;
			e2 = 0
			while (exponent > 0) {		
				var partE = exponent % 1000
				if (partE > 0) result = toTier1Abb(partE, e2) + (result ? '-' + result : '')
				exponent = Math.floor(exponent / 1000)
				e2++
			}
		}
		if (disp) document.getElementById('result').innerHTML = "<br><b>Standard</b>: "+prefix+mantissa.toFixed(2)+" "+result+"<br><b>AAS</b>: "+prefix+aas
		else return prefix+mantissa.toFixed(2)+" "+result
	}
}

function doHighStandard(e, aas) {
	var id = e.div(3)
	var mant = id.m
	var log = id.e
	var precise = Math.max(Math.floor(8 - Math.log10(log)), 0)
	var offset = log - precise
	var step = Math.floor(offset / 3)
	id = Math.round(mant * Math.pow(10, precise)) * Math.pow(10, offset - step * 3)

	if (log >= 1e9) return toTier2AbbFull(step, true) + "s"

	var result = ''
	while (id > 0) {		
		var partE = id % 1000
		if (partE > 0) {
			var prefix = ""
			if (partE > 1 || step == 0) prefix = toTier1Abb(partE, "root", aas)
			if (partE > 0) result = prefix + toTier2AbbFull(step, aas) + (result ? '-' + result : '')
		}
		id = Math.floor(id / 1000)
		step++
	}
	return result + "s"
}

function AAS(value) {
	var exponent = value.e
	var mantissa = (value.m * Math.pow(10, exponent % 3)).toFixed(Math.max(2 - exponent % 3, 0))
	if (parseFloat(mantissa) == 1e3) {
		mantissa = (1).toFixed(2)
		exponent += 3
	}
	return (exponent < 3e9 + 3 ? mantissa + " " : "") + getAASAbbreviation(Math.floor(exponent / 3) - 1)
}

function getAASAbbreviation(x) {
	if (x < 3) return ["k", "M", "B"][x]

	var result = ''
	e2 = 0
	while (x > 0) {		
		var partE = x % 1000
		if (partE > 0) result = toTier1Abb(partE, e2, true) + (result ? '-' + result : '')
		x = Math.floor(x / 1000)
		e2++
	}
	return result
}