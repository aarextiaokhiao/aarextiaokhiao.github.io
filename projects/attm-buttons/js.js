let BUTTONS = [
	{
		text: "Far Past",
		btn_color: "#00e",

		range: "2001 - 2011",
		bg: "radial-gradient(ellipse at top, #fee, #fdd)"
	}, {
		text: "Very Past",
		btn_color: "#07e",

		range: "2014 - 2017",
		bg: "radial-gradient(ellipse at top, #fee, #fdd)"
	}, {
		text: "Past",
		btn_color: "#0ee",

		range: "2017 - 2021",
		bg: "radial-gradient(ellipse at top, #fee, #fdd)"
	}, {
		text: "Present",
		btn_color: "#0e0",

		start: true,
		range: "2021 - 2024",
	}, {
		text: "Future",
		btn_color: "#ee0",

		range: "2025+",
		bg: "radial-gradient(ellipse at top, #eef, #ddf)",
		img: "../../images/icon.png"
	}, {
		text: "2024 Style I",
		text_gradient: "linear-gradient(black, white)",

		btn_color: "linear-gradient(#111, black)",
		btn_border: "#111",

		bg: "black",
	}, {
		text: "2024 Style II",
		text_color: "#bbf",
		text_stroke: "#33f",

		btn_color: "linear-gradient(#33f, black)",
		btn_border: "#33f",

		range: "This is cool!",
		bg: "linear-gradient(black, blue, white)",
	}
]
let BTN_CHOSEN = 0

const DEFAULT = {
	btn_color: "#fff",
	btn_border: "black",
	text: "???",
	text_color: "black",

	bg: "radial-gradient(ellipse at top, #fff, #def)",
	range: "???"
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
		let text = `${btn.text ?? DEFAULT.text}`, style = ""
		if (btn.text_gradient) style += `background: ${btn.text_gradient}; -webkit-background-clip:text; -webkit-text-fill-color: transparent`
		else if (btn.text_stroke) style += `text-shadow: ${btn.text_stroke} 1.5px 2px, ${btn.text_stroke} 1.5px -1.5px, ${btn.text_stroke} -1.5px 2px, ${btn.text_stroke} -1.5px -1.5px`

		btn_html += `<button id="btn_${i}" onclick="on_click(${i})" style="border-color: ${btn.btn_border ?? DEFAULT.btn_border}; color: ${btn.text_color ?? DEFAULT.text_color}; background: ${btn.btn_color ?? DEFAULT.btn_color}"><div style='${style}'>${text}</div></button>`
		if (btn.start) BTN_CHOSEN = i
	}
	el("btns").innerHTML = btn_html

	on_click(BTN_CHOSEN)
}

//UTILITY
let el = x => document.getElementById(x)