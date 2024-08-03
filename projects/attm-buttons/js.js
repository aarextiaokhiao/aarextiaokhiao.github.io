let BUTTONS = [
	{
		btn_text: "Far Past",
		btn_color: "#00e",

		range: "2001 - 2011",
		bg: "radial-gradient(ellipse at top, #fee, #fdd)"
	}, {
		btn_text: "Very Past",
		btn_color: "#07e",

		range: "2014 - 2017",
		bg: "radial-gradient(ellipse at top, #fee, #fdd)"
	}, {
		btn_text: "Past",
		btn_color: "#0ee",

		range: "2017 - 2021",
		bg: "radial-gradient(ellipse at top, #fee, #fdd)"
	}, {
		btn_text: "Present",
		btn_color: "#0e0",

		start: true,
		range: "2021 - 2024",
	}, {
		btn_text: "Future",
		btn_color: "#ee0",

		range: "2025+",
		bg: "radial-gradient(ellipse at top, #eef, #ddf)",
		img: "../../images/icon.png"
	}
]
let BTN_CHOSEN = 0

const DEFAULT = {
	bg: "radial-gradient(ellipse at top, #fff, #def)",
	range: "???",
	btn_text: "???",
	btn_color: "#fff"
}

//BUTTONS
function on_click(i) {
	let src = BUTTONS[i]
	let img_src = src.img

	el("bg").style.background = src.bg ?? DEFAULT.bg
	el("range").innerHTML = src.range ?? DEFAULT.range
	el("img").setAttribute('src', img_src ?? "")

	//Handle missing stuff to fix WebKit issues.
	el("img").style.display = img_src ? "" : "none"
	el("missing").innerHTML = img_src ? "" : "?"

	el("btn_"+BTN_CHOSEN).className = ""
	el("btn_"+i).className = "chosen"
	BTN_CHOSEN = i
}

function on_load() {
	let btn_html = ``
	for (var [i, btn] of Object.entries(BUTTONS)) {
		btn_html += `<button id="btn_${i}" onclick="on_click(${i})" style="background: ${btn.btn_color ?? DEFAULT.btn_color}">${btn.btn_text ?? DEFAULT.btn_text}</button>`
		if (btn.start) BTN_CHOSEN = i
	}
	el("btns").innerHTML = btn_html

	on_click(BTN_CHOSEN)
}

//UTILITY
let el = x => document.getElementById(x)