function on_page_load() {
	get_body().style.setProperty('--animation_duration', "0.4s")
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