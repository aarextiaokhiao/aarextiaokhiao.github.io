el = (x) => document.getElementById(x)

var tab = null
function openMe(x) {
	if (tab != null) el(tab).className = "row"
	if (tab == x) tab = null
	else tab = x
	if (tab != null) el(x).className = "row opened_" + pos[x]
}

var pos = {
	0: "left",
	1: "right",
	2: "right",
}

function load() {
	el("loading").style.bottom = "100%"
}