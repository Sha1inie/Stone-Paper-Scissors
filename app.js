let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScore1 = document.querySelector("#user-score");
const compScore1 = document.querySelector("#comp-score");


const genCompChoice = () => {
    const options = ["stone", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() *3);
    return options[randIdx];
};

const clickSound = new Audio('./others/soundclick.mp3');


const drawGame = () =>{
    msg.innerText = "It's a DRAW, play again!";
    msg.style.backgroundColor = "purple";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin){
        userScore++;
        userScore1.innerText = userScore;
        msg.innerText = `You won! WOW!! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }else{
        compScore++;
        compScore1.innerText = compScore;
        msg.innerText = `Such a loser! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

const playGame = (userChoice) =>{
   // console.log("user's choice is ", userChoice);
    const compChoice = genCompChoice();
    // console.log("comp choice is ", compChoice);

    clickSound.play();


    if(userChoice===compChoice ){
          drawGame();
    }else{
        let userWin = true;
        if(userChoice === "stone"){
            userWin = compChoice ==="paper"? false : true;
        } else if(userChoice ==="paper"){
            userWin= compChoice === "scissors" ? false : true;
        } else{
            userWin = compChoice === "stone" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);

    }
};



choices.forEach((choice)=> {
    choice.addEventListener("click", ()=>{
        const userChoice= choice.getAttribute("id");
        playGame(userChoice);
    });
});

/// Background music setup
const backgroundMusic = new Audio('./others/backgroundaudio1.mp3');
backgroundMusic.loop = true;

// Start playing the music when the user interacts with the page
const startMusic = () => {
    backgroundMusic.play().catch(error => {
        console.log("Error playing background music:", error);
    });
    document.removeEventListener("click", startMusic); // Remove listener after music starts
};

document.addEventListener("click", startMusic);

const handleVisibilityChange = () => {
    if (document.hidden) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play().catch(error => {
            console.log("Error playing background music:", error);
        });
    }
};

document.addEventListener("visibilitychange", handleVisibilityChange);
