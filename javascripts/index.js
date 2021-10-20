let dark_mode = parseInt(localStorage.getItem(btoa("aarexs_site_dark_mode"))) || 0

function on_page_load() {
	create_element("theme", "button", "header")
	get_element("theme").onclick = function() {
		toggle_dark_mode()
	}
	toggle_dark_mode(true)
	get_body().style.setProperty('--animation_duration', "0.5s")
}

function toggle_dark_mode(on_load) {
	if (!on_load) {
		dark_mode = dark_mode ? 0 : 1
		localStorage.setItem(btoa("aarexs_site_dark_mode"), dark_mode)
	}
	change_class("body", dark_mode ? "dark" : "")
	change_text("theme", "Dark Mode: " + (dark_mode ? "ON" : "OFF"))
}

function get_body() {
	return document.body
}

function get_element(id) {
	if (id == "body") return get_body()
	return document.getElementById(id)
}

function change_class(id, class_name) {
	get_element(id).className = class_name
}

function change_text(id, text) {
	get_element(id).innerHTML = text
}

function create_element(id, type, parent) {
	let x = document.createElement(type)
	x.id = id
	get_element(parent).appendChild(x)
}