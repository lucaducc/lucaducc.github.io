const title1 = document.querySelector(".title");
const title2 = document.querySelector(".title2");
const title3 = document.querySelector(".title3");
const title4 = document.querySelector(".title4");
const bg1 = document.querySelector(".bg1");
const bg2 = document.querySelector(".bg2");
const bg3 = document.querySelector(".bg3");
const bg4 = document.querySelector(".bg4");
const bg5 = document.querySelector(".bg5");
const li1 = document.querySelectorAll(".li1");
const li2 = document.querySelectorAll(".li2");
const li3 = document.querySelectorAll(".li3");
const li4 = document.querySelectorAll(".li4");
const his2 = document.querySelector(".his2");
const historyoverall = document.querySelector(".historyoverall");
const similargenres = document.querySelector(".similargenres");
const artists = document.querySelector(".artists");
const game = document.querySelector(".game");
let isatmain = true;
if (historyoverall.style.display === "flex"){
	isatmain = true;
}
else{
	isatmain=false;
}

window.addEventListener("scroll", ()=>{
	const start = window.innerHeight;
	const end = 0;
	
	//bg2 (janebg)
	const rect2 = his2.getBoundingClientRect();
	let progress2 = (start - rect2.top)/(start-end);
	progress2 = Math.max(0,Math.min(progress2,1));
	bg2.style.opacity = progress2;
	
	//scrolling for tall backgrounds
	const scrollY = window.scrollY;
	bg1.style.backgroundPosition = 
		`center ${scrollY * -0.4}px`;

	bg3.style.backgroundPosition = 
		`center ${scrollY * -0.3}px`;
		
	bg4.style.backgroundPosition = 
		`center ${scrollY * -0.5}px`;
});

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add("show");
		}
	});
},
{
	threshold: 0.01,
});
document.querySelectorAll("section").forEach(section => {
	observer.observe(section);
});

//functions------------------------------------------------------------------------------------
function resetsec(){
	document.querySelectorAll("section").forEach(section => {
		section.classList.remove("show");
	});
	requestAnimationFrame(() => {
		document.querySelectorAll("section").forEach(section => {
			if (section.getBoundingClientRect().top < window.innerHeight) {
				section.classList.add("show");
			}
		});
	});
}
function scrolltotop(){
	window.scrollTo({
		top:0,
		behavior:"instant"
	});
}

//index------------------------------------------------------------------------------------------

li1.forEach(li => {
	li.addEventListener("click", function(){
		if (isatmain){
			window.location.reload();
			return;
		}
		isatmain = true;
		
		title1.style.display = "flex";
		title2.style.display = "none";
		title3.style.display = "none";
		title4.style.display = "none";
		historyoverall.style.display = "flex";
		similargenres.style.display = "none";
		artists.style.display = "none";
		game.style.display = "none";
		bg1.style.display = "block";
		bg2.style.display = "block";
		bg3.style.display = "none";
		bg4.style.display = "none";
		bg5.style.display = "none";
		bg2.style.opacity = 0;
		resetsec();
		scrolltotop();
	});
});

li2.forEach(li => {
	li.addEventListener("click", function(){
		isatmain = false;
		title1.style.display = "none";
		title2.style.display = "flex";
		title3.style.display = "none";
		title4.style.display = "none";
		historyoverall.style.display = "none";
		artists.style.display = "flex";
		similargenres.style.display = "none";
		game.style.display = "none";
		bg1.style.display = "none";
		bg2.style.display = "none";
		bg3.style.display = "block";
		bg4.style.display = "none";
		bg5.style.display = "none";
		resetsec();
		scrolltotop();
	});
});

li3.forEach(li => {
	li.addEventListener("click", function(){
		isatmain = false;
		title1.style.display = "none";
		title2.style.display = "none";
		title3.style.display = "flex";
		title4.style.display = "none";
		historyoverall.style.display = "none";
		artists.style.display = "none";
		similargenres.style.display = "flex";
		game.style.display = "none";
		bg1.style.display = "none";
		bg2.style.display = "none";
		bg3.style.display = "none";
		bg4.style.display = "block";
		bg5.style.display = "none";
		resetsec();
		scrolltotop();
	});
});

li4.forEach(li => {
	li.addEventListener("click", function(){
		isatmain = false;
		title1.style.display = "none";
		title2.style.display = "none";
		title3.style.display = "none";
		title4.style.display = "flex";
		historyoverall.style.display = "none";
		artists.style.display = "none";
		similargenres.style.display = "none";
		game.style.display = "flex";
		bg1.style.display = "none";
		bg2.style.display = "none";
		bg3.style.display = "none";
		bg4.style.display = "none";
		bg5.style.display = "block";
		resetsec();
		scrolltotop();
	});
});

//game------------------------------------------------------------------------

const start = document.querySelector(".start");
const scorebox = document.querySelector(".scorebox");
const note = document.getElementById("note");
const target = document.getElementById("target");
const gamescreen = document.querySelector(".gamescreen");

const well = document.querySelector(".well");

let score = 0;
let startorno = false;
let whenmove;
let moving = false;
let wasnotepressed = false;

/*randomisation for both note and target*/
let targetx;
let targety;
let notex;
let notey;
let spawndist;

function howwell() {
	well.style.display = "flex";
	well.classList.add("fade");

	setTimeout(function () {
		well.style.display = "none";
		well.classList.remove("fade");
	}, 1500);
}

//randomisation
function GetRandom(min,max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function notout(value, min, max){
	return Math.min(Math.max(value, min), max);
}

/*game only starts when button is pressed*/
start.addEventListener("click", function(){
	if (startorno){
		return;
	}
	startorno = true;

	note.style.display = "block";
	target.style.display = "block";
	
	movement();
	whenmove = setInterval(movement, 4500); /* moves every 4.5 sec*/
});

/*movement of notes----------------------------------------------------------*/
function movement(){
	note.style.transition = "none";
	note.classList.remove("hit");
	target.classList.remove("hit");
	note.classList.remove("miss");
	note.style.pointerEvents = "auto"; /*allow the note to be clicked again*/
	
	note.style.display="block";
	target.style.display="block";
	wasnotepressed = false;
	moving = true;
	
	let chance = GetRandom(1, 3);
	if (chance <= 1){
		note.src="images/note1colour.jpg";
		target.src="images/note1.jpg";
	}
	else if (chance <= 2){
		note.src="images/note2colour.jpg";
		target.src="images/note2.jpg";
	}
	else{
		note.src="images/note3colour.jpg";
		target.src="images/note3.jpg";
	}
	
	note.onload = function(){
		noteplacement();
	};
}
	
function noteplacement(){
	/* making sure notes dont spawn or overshoot outside the screen*/
	let screenwidth = gamescreen.offsetWidth - note.offsetWidth;
	let screenheight = gamescreen.offsetHeight - note.offsetHeight;
	
	targetx = GetRandom(0, screenwidth);
	targety = GetRandom(0, screenheight);
	
	target.style.left = targetx + "px";
	target.style.top = targety + "px";
	
	/*ensure note and target is not too close*/
	do{
		notex = GetRandom(0, screenwidth);
		notey = GetRandom(0, screenheight);
		let dx = targetx - notex;
		let dy = targety - notey;
		
		spawndist = Math.sqrt(dx*dx + dy*dy);
	}
	while(
		spawndist < 400
	);
	
	note.style.left = notex + "px"; 
	note.style.top = notey + "px";
	
	//distance between note and target
	let dx = targetx - notex;
	let dy = targety - notey;
	
	let distance = Math.sqrt(dx*dx + dy*dy);
	let overshooter = 150;
	
	let finalcenterx = targetx + (dx / distance) * overshooter;
	let finalcentery = targety + (dy /distance) * overshooter;
	
	let finalx = finalcenterx;
	let finaly = finalcentery;
	
	finalx = notout(finalx, 0, screenwidth);
	finaly = notout(finaly, 0, screenheight);
	
	void note.offsetWidth; // force the note to update every movement
	note.style.transition = "left 2s linear, top 2s linear";
	
	console.log({
    startNote: [notex, notey],
    target: [targetx, targety],
    endNote: [finalx, finaly],
		distanceToTarget: Math.sqrt(
			(finalx - targetx) ** 2 +
			(finaly - targety) ** 2
		)
	});

	note.style.left = finalx + "px";
	note.style.top = finaly + "px";
	
	setTimeout(function(){
		if(moving && !wasnotepressed){
			moving = false;
			missed();
		}
	}, 2500);
}

function missed(){
	note.classList.add("miss");
	well.style.display = "block";
	well.textContent = "MISS!";
	well.style.color = "#DA506A";
	setTimeout(function () {
		note.style.display = "none";
	}, 1500);
	howwell();
	note.style.pointerEvents = "none";
}
	
	
/*clicking part-------------------------------------------------------*/
function clicked() {
	if(note.style.pointerEvents == "none"){
		return;
	}
	const notepos = note.getBoundingClientRect();
	const targetpos = target.getBoundingClientRect();
	const gamescreenpos = gamescreen.getBoundingClientRect();
	moving = false;
	wasnotepressed = true;
	note.style.transition = "none";
	
	note.style.left = notepos.left - gamescreenpos.left + "px";
	note.style.top = notepos.top - gamescreenpos.top + "px";
	
	const notecenterx = notepos.left + note.offsetWidth / 2;
	const notecentery = notepos.top + note.offsetHeight / 2;
	const targetcenterx = targetpos.left + target.offsetWidth / 2;
	const targetcentery = targetpos.top + target.offsetHeight / 2;
	
	const dx = notecenterx - targetcenterx;
	const dy = notecentery - targetcentery;
	
	const distance = Math.sqrt(dx * dx + dy * dy);
	
	if(distance < 15){
		setTimeout(function () {
			note.classList.add("hit");
			target.classList.add("hit");
		}, 500);
		well.style.display = "block";
		well.textContent = "PERFECT!";
		well.style.color = "#8AE578";
		howwell();
		wasnotepressed = true;
		score += 50;
	}
	else if(distance < 35){
		setTimeout(function () {
			note.classList.add("hit");
			target.classList.add("hit");
		}, 500);
		well.style.display = "block";
		well.textContent = "GREAT!";
		well.style.color = "#4AB0C2";
		howwell();
		wasnotepressed = true;
		score += 25;
	}
	else if(distance < 60){
		setTimeout(function () {
			note.classList.add("hit");
			target.classList.add("hit");
		}, 500);
		well.style.display = "block";
		well.textContent = "GOOD!";
		well.style.color = "#FFE846";
		howwell();
		wasnotepressed = true;
		score += 15;
	}
	else{
		missed();
	}
	scorebox.innerHTML = "Score: " + score;
}

note.addEventListener("click", clicked);

document.addEventListener("keydown", function(event){
	if(event.code === "Enter" && moving){
		let currentnotepos = note.getBoundingClientRect();
		let parentnotepos = note.parentElement.getBoundingClientRect();
		
		note.style.transition = "none";
		
		note.style.left = currentnotepos.left - parentnotepos.left + "px";
		note.style.top = currentnotepos.top - parentnotepos.top + "px";
		
		wasnotepressed = true;
		clicked();
		note.style.pointerEvents = "none";
		moving = false;
		setTimeout(function(){
			note.style.transition="left 2s linear, top 2s linear";
		},10);
	}
});