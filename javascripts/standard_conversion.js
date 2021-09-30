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

function toTier3Abb(t3, t4 = 0, aas) {
	if (!t3) return ""
	return (["", "Ka", "Mg", "Gi", "Ter", "Pt"])[t3]
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
		document.getElementById("start").style.display = ""
		return
	} else {
		document.getElementById("result").style.display = ""
		document.getElementById("start").style.display = "none"
	}

	var value = new Decimal(document.getElementById("number").value)
	// if (value.gt(1/0)) document.getElementById('result').innerHTML = "<b>Result</b>: <b style='color:#e50000'>&#x221e;</b>"
	if (Decimal_BI.gte(value.logarithm, Decimal_BI.pow(10, 3e15).times(3))) document.getElementById('result').innerHTML = "<b>Result</b>: " + doHighStandard(Decimal_BI.pow(10, 3e15).times(3)) + " (capped at 1e3e3000000000000000)"
	else if (Decimal_BI.gte(value.logarithm, 3e60 + 3)) {
		document.getElementById('result').innerHTML = "<b>Result</b>: " + doHighStandard(value.logarithm)
	} else if (Decimal_BI.gte(value.logarithm, 3e9 + 3)) {
		document.getElementById('result').innerHTML = "<b>Results</b>:<br>Shortened <b>Standard</b>: " + doHighStandard(value.logarithm) +
			"<br><b>AAS</b>: " + doHighStandard(value.logarithm, true)
	} else {
		var mantissa = value.m
		var exponent = value.e
		mantissa = mantissa * Math.pow(10, exponent % 3)
		exponent = exponent - exponent % 3
		if (mantissa >= 999.995) {
			mantissa /= 1000
			exponent += 3
		}
		if (exponent < 3) document.getElementById('result').innerHTML = "<b>Result</b>: " + mantissa.toFixed(2)
		else if (exponent < 309) document.getElementById('result').innerHTML = "<b>Results</b>:<br><b>Standard</b>: "+mantissa.toFixed(2) + " " + smallAbbs[exponent / 3] + "<br><b>AAS</b>: " + AAS(value)
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
			document.getElementById('result').innerHTML = "<b>Results</b>:<br><b>Standard</b>: "+mantissa.toFixed(2)+" "+result+"<br><b>AAS</b>: "+AAS(value)
		}
	}
}

function doHighStandard(e, aas) {
	var isNum = typeof(e) == "number"
	if (isNum) {
		var id = Math.floor(e / 3 - 1)
		var log = Math.floor(Math.log10(id))
	} else {
		var id = e.div(3)
		var log = Math.floor(id.log10())
	}
	var precise = Math.max(Math.floor(9 - Math.log10(log)), 0)
	var offset = log - precise
	var step = Math.floor(offset / 3)
	if (isNum) {
		id = Math.round(id / Math.pow(10, offset)) * Math.pow(10, offset - step * 3)
	} else {
		id = Math.round(id.div(Decimal_BI.pow(10, offset)).toNumber()) * Math.pow(10, offset - step * 3)
	}

	var result = ''
	while (id > 0) {		
		var partE = id % 1000
		if (partE > 0) {
			if (partE == 1 && step > 0) var prefix = ""
			else var prefix = toTier1Abb(partE, "root", aas)
			var result2 = ""
			if (step > 102) {
				var s2 = step
				var stepT3 = 0
				while (s2 > 0) {
					partS = s2 % 1000
					if (partS > 0) result2 = toTier2Abb(partS, stepT3, aas) + (result2 ? 'a-' + result2 : '')
					s2 = Math.floor(s2/1000)
					stepT3++
				}
				
			} else result2 = toTier2Abb(step, 0, aas)
			if (partE > 0) result = prefix + result2 + (result ? '-' + result : '')
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