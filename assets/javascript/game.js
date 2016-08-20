$(document).ready( function(){
	var characters = {
		corgi: {
			name: "Cam Corgi",
			healthPoints: 150,
			baseAttack: 7,
			attackPower: 7,
			counterAttackPower: 16,
			idElem: "corgi",
			activeImg: url="/assets/images/charPlaceholder.png",
			defeatedImg: url="assets/images/charPlaceholderDead.png" 
		},
		scottie: {
			name: "Samuel Scottie",
			healthPoints: 100,
			baseAttack: 9,
			attackPower: 9,
			counterAttackPower: 14,
			idElem: "scottie",
			activeImg: url="assets/images/charPlaceholder.png",
			defeatedImg: url="assets/images/charPlaceholderDead.png" 
		},
		akiba: {
			name: "Alisha Akiba",
			healthPoints: 180,
			baseAttack: 6,
			attackPower: 6,
			counterAttackPower: 17,
			idElem: "akiba",
			activeImg: url="assets/images/charPlaceholder.png",
			defeatedImg: url="assets/images/charPlaceholderDead.png" 
		},
		dachshund: {
			name: "Dee Dachshund",
			healthPoints: 120,
			baseAttack: 8,
			attackPower: 8,
			counterAttackPower: 15,
			idElem: "dachshund",
			activeImg: url="assets/images/charPlaceholder.png",
			defeatedImg: url="assets/images/charPlaceholderDead.png" 
		}
	}
	var isPlayerSelected = false;
	var isEnemySelected = false;
	var isFightActive = false;
	var isGameActive = true;
	var playerCharacter = "";
	var currentEnemy = "";
	var playerHP = 0;
	var enemyHP = 0;
	var defeatedCount = 0;

	function whatWasClicked() {
		console.log(this.id);
		console.log("Fight Active? " + isFightActive);
		console.log("Game Active? " + isGameActive);
		console.log("Defeated: " + defeatedCount);
		if ((isFightActive === false) && (isGameActive === true)) {
			if (isPlayerSelected === false) {
				playerCharacter = this.id;
				playerHP = characters[playerCharacter].healthPoints;
				isPlayerSelected = true;
				console.log("this is the playerCharacter: " + playerCharacter);
				$("#player-character-section").append($("#" + playerCharacter.toString()));
				$("#" + playerCharacter.toString()).removeClass("default-character");
				$(".default-character").appendTo($(".waiting-enemies-section"));
				$(".default-character").addClass("waiting-enemies");
				$("#player-character-section").find("div").addClass("player-character");
				$(".available-char").toggle();
				updateStatusMsg();
			}
			else if (playerCharacter !== this.id) {
				currentEnemy = this.id;
				enemyHP = characters[currentEnemy].healthPoints;
				isEnemySelected = true;
				console.log("this is the currentEnemy: " + currentEnemy);
				$("#current-enemy").append($("#" + currentEnemy.toString()));
				$("#current-enemy").find("div").addClass("current-enemy");
				updateStatusMsg();
				isFightActive = true;
			} 
		}

	} 
	function attack() {
		if ((isFightActive === true)) {
			if ((playerHP > 0) && (enemyHP > 0) && (isGameActive === true)) {
				playerHP -= characters[currentEnemy].counterAttackPower;
				enemyHP -= characters[playerCharacter].baseAttack;
				console.log("Player HP " + playerHP);
				console.log("Enemy HP " + enemyHP);
				$("#" + (playerCharacter.toString())).find(".healthPointsStat").html(playerHP);
				$("#" + (currentEnemy.toString())).find(".healthPointsStat").html(enemyHP);
				increasePlayerAtk()
				// if ((playerHP < 0) && (enemyHP < 0)) {
				// 	// isFightActive = false;
				// }
				updateStatusMsg()
			}
			else {
				updateStatusMsg()
				//checkScores();
			}
		}
	}
	function increasePlayerAtk() {
		characters[playerCharacter].baseAttack += characters[playerCharacter].attackPower;
	}
	function updateStatusMsg() {
		if ((isPlayerSelected === true) && (isEnemySelected === false)) {
			$("#statusMsg").html("Please choose an enemy to battle.");
		}
		else if ((isEnemySelected === true) && (isFightActive === false)) {
			$("#statusMsg").html("Hit Attack to fight!");
		}
		else if ((isFightActive === true) && (playerHP > 0) && (enemyHP > 0)){
			$("#statusMsg").html("You attacked " + characters[currentEnemy].name + " for " + characters[playerCharacter].baseAttack + " damage. <br>" + characters[currentEnemy].name + " attacked you back for " + characters[currentEnemy].counterAttackPower + " damage.")		
		}
		else if (enemyHP < 0) {
			defeatedCount ++;
			if (defeatedCount === 3) {
				$("#statusMsg").html("YOU WON! You are now the sassiest pup of them all!");
				$(".current-enemy").remove();
				$("#statusMsg").append("<br><button class='btn btn-default' id='restart'>Restart Game</button>");
					$("#restart").on("click", function(){
						location.reload(true);
					});
			}
			else {
				$("#statusMsg").html("You defeated " + characters[currentEnemy].name + "! Who will you take on next, mighty pup?");
				$(".current-enemy").remove();
				resetFight()
			}
		} 
		else {
			$("#statusMsg").html("You have been defeated =( GAME OVER");
			$("#statusMsg").append("<br><button class='btn btn-default' id='restart'>Restart</button>");
				$("#restart").on("click", function(){
					location.reload(true);
				});
		}
	}
	function resetFight() {
		isEnemySelected === false;
		isFightActive = false;
	}
	function restartGame() {
		isPlayerSelected = false;
		isEnemySelected = false;
		isFightActive = false;
		isGameActive = true;
		playerCharacter = "";
		currentEnemy = "";
		playerHP = 0;
		enemyHP = 0;
		defeatedCount = 0;
	}

	$(".character").on("click", whatWasClicked);
	$("#attack").on("click", attack);
	$("#restart").on("click", function(){
		location.reload(true);
	});
})









