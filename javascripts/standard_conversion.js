var smallAbbs = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc', 'TDc', 'QaDc', 'QtDc', 'SxDc', 'SpDc', 'ODc', 'NDc', 'Vg', 'UVg', 'DVg', 'TVg', 'QaVg', 'QtVg', 'SxVg', 'SpVg', 'OVg', 'NVg', 'Tg', 'UTg', 'DTg', 'TTg', 'QaTg', 'QtTg', 'SxTg', 'SpTg', 'OTg', 'NTg', 'Qd', 'UQd', 'DQd', 'TQd', 'QaQd', 'QtQd', 'SxQd', 'SpQd', 'OQd', 'NQd', 'Qi', 'UQi', 'DQi', 'TQi', 'QaQi', 'QtQi', 'SxQi', 'SpQi', 'OQi', 'NQi', 'Se', 'USe', 'DSe', 'TSe', 'QaSe', 'QtSe', 'SxSe', 'SpSe', 'OSe', 'NSe', 'St', 'USt', 'DSt', 'TSt', 'QaSt', 'QtSt', 'SxSt', 'SpSt', 'OSt', 'NSt', 'Og', 'UOg', 'DOg', 'TOg', 'QaOg', 'QtOg', 'SxOg', 'SpOg', 'OOg', 'NOg', 'Nn', 'UNn', 'DNn', 'TNn', 'QaNn', 'QtNn', 'SxNn', 'SpNn', 'ONn', 'NNn', 'Ce', 'UCe'];

function toTier1Abb(t1, t2, aas) {
	if (aas) {
		if (t1 < 3 && t2 == 0) return ["k", "M", "B"][t1]
	} else if (t1 < 102 && t2 == 0) return smallAbbs[t1]

	let prefixes = aas ? [
		["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"],
		["", "De", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"],
		["", "Ce", "Dc", "Tc", "Qe", "Qu", "Se", "Su", "Oe", "Ne"]
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
	if (t2 != "root") r += toTier2Abb(t2, 0, aas)

	return r
}

function toTier2Abb(t2, t3 = 0, aas) {
	if (!t2) return ""

	let prefixes2 = aas ? [
		["", "Mi", "Mc", "Na", "Pi", "Fe", "At", "Ze", "Yo", "Xn"],
		["", "Me", "Du", "Tr", "Te", "P", "Hx", "Hp", "Ot", "E"],
		["", "c", "Ic", "Tcn", "Trc", "Pcn", "Hcn", "Hpc", "Ocn", "Ecn"],
		["", "Hc", "Dh", "Th", "Trh", "Ph", "Hh", "Hph", "Oh", "Eh"]
	] : [
		['', 'MI', 'MC', 'NA', 'PC', 'FM', 'AT', 'ZP', 'YC', 'XN'],
		['', 'ME', 'DU', 'TR', 'TE', 'P', 'HX', 'HP', 'OT', 'E'],
		['', 'C', 'IC', 'TCN', 'TRC', 'PCN', 'HCN', 'HPC', 'OCN', 'ECN'],
		['', 'HC', 'DH', 'TH', 'TRH', 'PH', 'HH', 'HPH', 'OH', 'EH']
	]
	let r = ''

	if (t2 > 1 || t3 == 0) {
		if (t2 < 10) return standardize(prefixes2[0][t2] + toTier3Abb(t3), aas)
		if (t2 % 100 == 10) r = 'V'
		else r = prefixes2[1][t2 % 10]
		if (!aas || (t2 <= 10 || t2 >= 20)) r += prefixes2[2][Math.floor(t2 / 10) % 10]
		r += prefixes2[3][Math.floor(t2 / 100)]
	}
	r += standardize(toTier3Abb(t3))
	return r
}

function toTier2AbbFull(t2, aas) {	
	var r = ""
	if (t2 > 102) {
		var s3 = 0
		while (t2 > 0) {
			partS = t2 % 1000
			if (partS > 0) r = toTier2Abb(partS, s3, aas) + (r ? 'a-' + r : '')
			t2 = Math.floor(t2/1000)
			s3++
		}
	} else r = toTier2Abb(t2, 0, aas)
	return r
}

function toTier3Abb(t3, t4 = 0, aas) {
	if (!t3) return ""
	return (["", "Ka", "Mg", "Gi", "Ter", "Pt", "Ex", "Zt", "Yt", "Xe", "Dk"])[t3]
}

function standardize(x, aas) {
	if (!aas) x = x.toUpperCase()
	return x
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
	document.getElementById("converted").textContent = neg + (layer > 0 ? "e" + (recp2 ? "-" : "") : "") + (layer > 1 ? "e".repeat(layer - 1) : "") + doStandard(new Decimal(mag)) + " = "

	//Standard
	var logAbs = log.abs()
	if (Decimal.pow(10, 3e30).lt(logAbs)) document.getElementById('result').innerHTML = neg + recpText + doHighStandard(Decimal.pow(10, 3e30)) + " (capped at " + neg + "1e" + (recp ? "-" : "") + "1e3e30)"
	else if (logAbs.gte(3e60 + 3)) {
		document.getElementById('result').innerHTML = neg + recpText + doHighStandard(logAbs)
	} else if (logAbs.gte(3e9 + 3)) {
		document.getElementById('result').innerHTML = "<br>Shortened <b>Standard</b>: " + neg + recpText + doHighStandard(logAbs) +
			"<br><b>AAS</b>: " + neg + doHighStandard(logAbs, true)
	} else doStandard(value, true)

	if (logAbs.gte(Decimal.pow(10, 3e15))) document.getElementById('result').innerHTML += "<br><b style='color: red'>WARNING! STANDARD STARTS TO IMPRECISE AT ee3e15. THIS IS EXPERIMENTAL ZONE.</b>"
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

	if (log >= 1e9) return toTier2AbbFull(step) + "s"

	var result = ''
	while (id > 0) {		
		var partE = id % 1000
		if (partE > 0) {
			var prefix = ""
			if (partE > 1 || step == 0) prefix = toTier1Abb(partE, "root", aas)
			if (partE > 0) result = prefix + toTier2AbbFull(step) + (result ? '-' + result : '')
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
	return (exponent < 3e9 + 3 ? mantissa : "") + getAASAbbreviation(Math.floor(exponent / 3) - 1)
}

function getAASAbbreviation(x) {
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