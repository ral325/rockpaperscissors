play_options = ["rock", "paper", "scissors"];

function computerPlay() {
    randomNumber = Math.floor(Math.random()*3);

    return play_options[randomNumber];
}

function playRoundOfRPS(playerSelection,computerSelection) {
    playerSelection = playerSelection.toLowerCase();

    if (playerSelection === computerSelection) {
        return "Tie! You both played " + playerSelection + ".";
    }

    let playerSelection_index = play_options.indexOf(playerSelection);
    let computerSelection_index = play_options.indexOf(computerSelection);

    if (((playerSelection_index - computerSelection_index) + 3) % 3 === 1) {
        return "You win! " + playerSelection + " beats " + computerSelection + "!"
    }
    return "You lose! " + computerSelection + " beats " + playerSelection + "!"
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