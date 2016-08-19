var characters = {
	corgi: {
		name: "Cam Corgi",
		healthPoints: 150,
		baseAttack: 7,
		attackPower: 7,
		counterAttackPower: 19,
		idElem: "corgi",
		activeImg: url="/assets/images/charPlaceholder.png",
		defeatedImg: url="assets/images/charPlaceholderDead.png" 
	},
	scottie: {
		name: "Samuel Scottie",
		healthPoints: 100,
		baseAttack: 9,
		attackPower: 9,
		counterAttackPower: 17,
		idElem: "scottie",
		activeImg: url="assets/images/charPlaceholder.png",
		defeatedImg: url="assets/images/charPlaceholderDead.png" 
	},
	akiba: {
		name: "Alisha Akiba",
		healthPoints: 180,
		baseAttack: 6,
		attackPower: 6,
		counterAttackPower: 20,
		idElem: "akiba",
		activeImg: url="assets/images/charPlaceholder.png",
		defeatedImg: url="assets/images/charPlaceholderDead.png" 
	},
	frenchie: {
		name: "Flora Frenchie",
		healthPoints: 120,
		baseAttack: 8,
		attackPower: 8,
		counterAttackPower: 18,
		idElem: "frenchie",
		activeImg: url="assets/images/charPlaceholder.png",
		defeatedImg: url="assets/images/charPlaceholderDead.png" 
	}
}
var isPlayerSelected = false;
var isFightActive = false;
var isGameActive = true;
var playerCharacter = "";
var currentEnemy = "";

function whatWasClicked() {
	if ((isFightActive === false) && (isGameActive === true)) {
		if (isPlayerSelected === false) {
			playerCharacter = this.id;
			isPlayerSelected = true;
			console.log("this is the playerCharacter: " + playerCharacter);
			$("#player-character").append($("#" + playerCharacter.toString()));
			$("#" + playerCharacter.toString()).removeClass("default-character");
			$(".default-character").appendTo($(".waiting-enemies"));
		}
		else if (playerCharacter !== this.id) {
			currentEnemy = this.id;
			isFightActive = true;
			console.log("this is the currentEnemy: " + currentEnemy);
			$("#current-enemy").append($("#" + currentEnemy.toString()));
		} 
	}

} 
function attack() {
	if ((isFightActive === true) && (characters[playerCharacter].healthPoints > 0) && (characters[currentEnemy].healthPoints > 0)) {
		console.log("Player's HP: " + playerCharacter + " " + characters[playerCharacter].healthPoints)
		console.log("Enemy's HP: " + currentEnemy + " " + characters[currentEnemy].healthPoints)
		characters[playerCharacter].healthPoints -= characters[currentEnemy].counterAttackPower;
		characters[currentEnemy].healthPoints -= characters[playerCharacter].baseAttack;
		console.log("Player's HP: " + playerCharacter + " " + characters[playerCharacter].healthPoints)
		console.log("Enemy's HP: " + currentEnemy + " " + characters[currentEnemy].healthPoints)
	}
}
function moveEnemies() {
	// move current enemy to Arena 
}

$(".character").on("click", whatWasClicked);
$("#attack").on("click",attack);




