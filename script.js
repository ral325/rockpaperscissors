// activity
const buttons = Array.from(document.querySelectorAll(".button"));
buttons.forEach(button => button.addEventListener("click",onPlayerChoice));

const status_div = document.querySelector("#results-display");

let playerScore = 0;
let computerScore = 0;

// functions
function onPlayerChoice() {
    playRoundOfRPS(this.id,computerPlay());
}

function checkIfWinner() { //if they win, display it and disable the buttons
    if (playerScore > 4) {
        status_div.textContent = "Player won 5 times! Congratulations! Refresh to play again."
        buttons.forEach(button => button.removeEventListener("click",onPlayerChoice));
    } else if (computerScore > 4) {
        status_div.textContent = "Computer won 5 times! Oh well! Refresh to try again."
        buttons.forEach(button => button.removeEventListener("click",onPlayerChoice));
    }
}

play_options = ["rock", "paper", "scissors"];

function computerPlay() {
    randomNumber = Math.floor(Math.random()*3);

    return play_options[randomNumber];
}

function playRoundOfRPS(playerSelection,computerSelection) {
    //playerSelection = playerSelection.toLowerCase(); //not needed when using buttons

    if (playerSelection === computerSelection) {
        status_div.textContent = "Tie! Score is unchanged. Player: " + playerScore + " - Computer: " + computerScore;
        console.log("Player: " + playerSelection + " - Computer: " + computerSelection);
        checkIfWinner();
        return;
    }

    let playerSelection_index = play_options.indexOf(playerSelection);
    let computerSelection_index = play_options.indexOf(computerSelection);

    if (((playerSelection_index - computerSelection_index) + 3) % 3 === 1) {
        playerScore++;
        status_div.textContent = "You win! " + capitalizeFirstLetter(playerSelection) +
            " beats " + computerSelection + "! Player: " + playerScore + " - Computer: " + computerScore;
        console.log("Player: " + playerSelection + " - Computer: " + computerSelection);
        checkIfWinner();
        return;
    }
    computerScore++;
    status_div.textContent = "You lose! " + capitalizeFirstLetter(computerSelection) + " beats " +
        playerSelection + "! Player: " + playerScore + " - Computer: " + computerScore;
    console.log("Player: " + playerSelection + " - Computer: " + computerSelection);
    checkIfWinner();
}

function game(numberOfRounds) {
    let playerWinsCount = 0;
    let compWinsCount = 0;
    let userPlay;
    let result;

    for (let i = 1; i<=numberOfRounds; i++) {
        userPlay = prompt("User, please play Rock, Paper, or Scissors").toLowerCase();

        if (!play_options.includes(userPlay)) {
            error("User input: '" + userPlay + "' not recognized. Please play one of the following: rock, paper, or scissors.");
        }

        result = playRoundOfRPS(userPlay,computerPlay());
        console.log("Result of game #"+i+": " + result);

        if (result.includes("lose")) {
            compWinsCount++;
        } else if (result.includes("win")) {
            playerWinsCount++;
        } 
        // do not log a win for either team if there is a tie
    }

    if (playerWinsCount > compWinsCount) {
        return "Player wins, " + playerWinsCount + " to " + compWinsCount;
    } else if (compWinsCount < playerWinsCount) {
        return "Computer wins, " + compWinsCount + " to " + playerWinsCount;
    } else {
        return "You tied the computer at " + playerWinsCount + " wins each."
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}