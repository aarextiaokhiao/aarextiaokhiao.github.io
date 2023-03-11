let player = {
	log: [],
	rng: 0,
	sum: 0,
	did: 0,

	r2_streak: 0,
	r3_streak: 0,
	r4_streak: 0,

	highest: 0,
	highest_2_prod: 0,
	highest_3_prod: 0,

	tug_of_war: 0,
}

function generateNum() {
	let rng = 0
	for (var i = 0; i < 4; i++) rng += Math.random()
	return 4 / (4 - rng)
}

function putList(x) {
	if (player.log.length == 10) player.log = player.log.splice(1, 9)
	player.log.push(x)
}

function getLastProducts(amt) {
	let r = 1
	for (var i = 1; i <= amt; i++) r *= player.log?.[player.log.length - i] || 1
	return r
}

function doRNG() {
	let rng = generateNum()
	player.did++
	player.rng = rng
	player.sum += rng

	player.tug_of_war += rng >= 2 ? -1 : 1
	player.r2_streak = rng < 4 ? 0 : player.r2_streak + 1
	player.r3_streak = rng < 8 ? 0 : player.r3_streak + 1
	player.r4_streak = rng < 16 ? 0 : player.r4_streak + 1

	putList(rng)
	player.highest = Math.max(player.highest, rng)
	player.highest_2_prod = Math.max(player.highest_2_prod, getLastProducts(2))
	player.highest_3_prod = Math.max(player.highest_3_prod, getLastProducts(3))
}

//Utils
el = x => document.getElementById(x)

//Main
function refreshHTML() {
	el("rng").textContent = "Number: " + player.rng.toFixed(2)
	el("average").textContent = "Average: " + (player.sum / player.did).toFixed(2) + " (over " + player.did + " occassions)"
	el("r2_streak").textContent = "4 Streak: " + player.r2_streak
	el("r3_streak").textContent = "8 Streak: " + player.r3_streak
	el("r4_streak").textContent = "16 Streak: " + player.r4_streak

	el("highest").textContent = "Highest Got: " + player.highest
	el("highest_2_prod").textContent = "Highest Product of Last 2: " + player.highest
	el("highest_3_prod").textContent = "Highest Product of Last 3: " + player.highest

	el("tug_of_war").textContent = "Tug-of-War: " + player.tug_of_war
}

function initGen() {
	setInterval(function() {
		doRNG()
		refreshHTML()
	}, 500)
}