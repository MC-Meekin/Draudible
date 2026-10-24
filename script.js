const menu = document.querySelector(".menu");
const setupScreen = document.querySelector("#setupScreen");

const playButton = document.querySelector("#playButton");
const backButton = document.querySelector("#backButton");

const soundScreen = document.querySelector("#soundScreen");
const startButton = document.querySelector("#startButton");
const promptText = document.querySelector("#promptText");
const beginDrawingButton = document.querySelector("#beginDrawingButton");

const drawingScreen = document.querySelector("#drawingScreen");
const drawingCanvas = document.querySelector("#drawingCanvas");
const clearButton = document.querySelector("#clearButton");
const finishDrawingButton = document.querySelector("#finishDrawingButton");

const resultScreen = document.querySelector("#resultScreen");
const resultPrompt = document.querySelector("#resultPrompt");
const savedDrawing = document.querySelector("#savedDrawing");
const continueButton = document.querySelector("#continueButton");

const teamCount = document.querySelector("#teamCount");

const roundCount = document.querySelector("#roundCount");

const turnInfo = document.querySelector("#turnInfo");
const drawingTurnInfo = document.querySelector("#drawingTurnInfo");

const gameSummaryScreen =
    document.querySelector("#gameSummaryScreen");
const summaryText = document.querySelector("#summaryText");
const mainMenuButton = document.querySelector("#mainMenuButton");

const matchingScreen = document.querySelector("#matchingScreen");
const matchingArea = document.querySelector("#matchingArea");
const submitMatchesButton =
    document.querySelector("#submitMatchesButton");
const matchingTurnInfo =
    document.querySelector("#matchingTurnInfo");

const drawingScoreboardContent =
    document.querySelector("#drawingScoreboardContent");

const matchingScoreboardContent =
    document.querySelector("#matchingScoreboardContent");
const finalScores = document.querySelector("#finalScores");

const handoffScreen = document.querySelector("#handoff-screen");
const handoffTitle = document.querySelector("#handoff-title");
const handoffInstructions =
    document.querySelector("#handoff-instructions");
const handoffReminder =
    document.querySelector("#handoff-reminder");
const handoffButton = document.querySelector("#handoff-button");


const roundScoreboardScreen =
    document.querySelector("#roundScoreboardScreen");
const roundScoreboardTitle =
    document.querySelector("#roundScoreboardTitle");
const roundScoreboardContent =
    document.querySelector("#roundScoreboardContent");
const roundScoreboardContinueButton =
    document.querySelector("#roundScoreboardContinueButton");


let totalTeams = 2;
let totalRounds = 3;
let currentRound = 1;
let currentTeam = 1;
let allDrawings = [];
let roundPrompts = [];
let currentMatchingTeam = 1;
let allMatches = [];
let scores = [];

playButton.addEventListener("click", function () {
    menu.hidden = true;
    setupScreen.hidden = false;
});

backButton.addEventListener("click", function () {
    setupScreen.hidden = true;
    menu.hidden = false;
});

const prompts = [
    "Car engine starting",
    "Motorcycle revving",
    "Helicopter flying",
    "Airplane flying",
    "Electric drill",
    "Blender",
    "Lawn mower",
    "Vacuum cleaner",
    "Alarm clock",
    "Phone ringing",
    "Microwave finished",
    "Busy telephone signal",
    "Robot powering up",
    "Robot malfunctioning",
    "Video game laser",
    "Computer error",
    "Hammer hitting a nail",
    "Knocking on a door",
    "Typing on a keyboard",
    "Jackhammer",
    "Glass shattering",
    "A tree falling",
    "Bowling ball hitting pins",
    "A car crash",
    "Water dripping from a tap",
    "Pouring a glass of water",
    "Swimming underwater",
    "Blowing bubbles",
    "A waterfall",
    "Ocean waves",
    "A boat motor",
    "A toilet flushing",
    "Thunderstorm",
    "Strong wind",
    "Tornado",
    "Rain hitting a roof",
    "An avalanche",
    "An earthquake",
    "A volcano erupting",
    "A forest fire",
    "Snoring",
    "Coughing",
    "Sneezing",
    "Hiccupping",
    "Brushing teeth",
    "Shaving with an electric razor",
    "Someone running",
    "Someone climbing stairs",
    "A squeaky door",
    "A creaking floorboard",
    "Scissors cutting paper",
    "Paper tearing",
    "Zipping up a jacket",
    "A rusty swing",
    "A shopping cart with a bad wheel",
    "A chair scraping across the floor",
    "Train moving along tracks",
    "Steam locomotive whistle",
    "Bicycle bell",
    "Car horn",
    "Ambulance siren",
    "Police siren",
    "Rocket launching",
    "A boat horn",
    "Drumming",
    "Playing a trumpet",
    "Playing a flute",
    "Playing a violin",
    "Beatboxing",
    "DJ scratching a record",
    "Playing a guitar",
    "A ringing triangle instrument",
    "Ghost haunting a house",
    "Alien communicating",
    "Spaceship charging its weapons",
    "Teleportation",
    "A magical spell being cast",
    "A force field breaking",
    "A monster waking up",
    "A giant robot walking",
    "Bacon frying",
    "Popcorn popping",
    "Crunching chips",
    "Slurping noodles",
    "A kettle boiling",
    "A blender crushing ice",
    "Biting an apple",
    "A soda can opening",
    "A balloon deflating",
    "A balloon popping",
    "A bouncing ball",
    "A spring bouncing",
    "A coin spinning on a table",
    "A metal chain rattling",
    "A zipper getting stuck",
    "A door unlocking"
];


function updateRoundScoreboard() {
    roundScoreboardTitle.textContent =
        "Scores after Round " + currentRound;

    roundScoreboardContent.innerHTML = "";

    const rankedTeams = scores
        .map(function (score, index) {
            return {
                team: index + 1,
                score: score
            };
        })
        .sort(function (a, b) {
            return b.score - a.score;
        });

    rankedTeams.forEach(function (team, index) {
        const scoreLine = document.createElement("p");

        scoreLine.textContent =
            (index + 1) + ". Team " + team.team +
            " — " + team.score + " points";

        roundScoreboardContent.appendChild(scoreLine);
    });

    

    const roundMatches = allMatches.filter(function (teamMatch) {
        return teamMatch.round === currentRound;
    });

    const resultsTitle = document.createElement("h2");
    resultsTitle.textContent = "Drawing Results";
    roundScoreboardContent.appendChild(resultsTitle);

    const roundDrawings = allDrawings.filter(function (drawing) {
        return drawing.round === currentRound;
    });

    roundDrawings.forEach(function (drawing) {
        const result = document.createElement("div");
        result.style.marginBottom = "24px";
        result.style.padding = "16px";
        result.style.border = "1px solid #ccc";
        result.style.borderRadius = "8px";

        const heading = document.createElement("h3");
        heading.textContent = "Drawing by Team " + drawing.team;

        const image = document.createElement("img");
        image.src = drawing.image;
        image.alt = "Drawing by Team " + drawing.team;
        image.style.width = "180px";
        image.style.maxWidth = "100%";

        const originalPrompt = document.createElement("p");
        originalPrompt.textContent =
            "Original prompt: " + drawing.prompt;

        result.appendChild(heading);
        result.appendChild(image);
        result.appendChild(originalPrompt);

        const correctTeams = [];
        const incorrectGuesses = [];

        roundMatches.forEach(function (teamMatch) {
            teamMatch.matches.forEach(function (match) {
                if (match.drawingImage === drawing.image) {
                    if (match.prompt === drawing.prompt) {
                        correctTeams.push(teamMatch.team);
                    } else {
                        incorrectGuesses.push({
                            team: teamMatch.team,
                            prompt: match.prompt
                        });
                    }
                }
            });
        });

        const correctText = document.createElement("p");

        correctText.textContent = correctTeams.length > 0
            ? "Guessed correctly by Team " +
                correctTeams.join(", Team ")
            : "No teams guessed correctly.";

        result.appendChild(correctText);

        incorrectGuesses.forEach(function (guess) {
            const guessText = document.createElement("p");
            guessText.textContent =
                "Team " + guess.team +
                " guessed: " + guess.prompt;

            result.appendChild(guessText);
        });

        roundScoreboardContent.appendChild(result);
    });


}



function showHandoff(title, instructions, reminder, nextAction) {
    handoffTitle.textContent = title;
    handoffInstructions.textContent = instructions;
    handoffReminder.textContent = reminder;

    soundScreen.hidden = true;
    drawingScreen.hidden = true;
    resultScreen.hidden = true;
    matchingScreen.hidden = true;
    gameSummaryScreen.hidden = true;

    handoffScreen.classList.remove("hidden");
    handoffScreen.hidden = false;

    handoffButton.onclick = function () {
        handoffScreen.classList.add("hidden");
        handoffScreen.hidden = true;
        nextAction();
    };
}


function getRandomPrompts(count) {
    const shuffled = [...prompts];

    shuffled.sort(function () {
        return Math.random() - 0.5;
    });

    return shuffled.slice(0, count);
}




function calculateScores() {
    scores = Array(totalTeams).fill(0);

    console.log("Calculating scores...");
    console.log("All matches:", allMatches);
    console.log("All drawings:", allDrawings);

    allMatches.forEach(function (teamMatch) {
        teamMatch.matches.forEach(function (match) {
            const originalDrawing = allDrawings.find(
                function (drawing) {
                    return drawing.image === match.drawingImage;
                }
            );

            if (!originalDrawing) {
                console.log("Drawing not found:", match);
                return;
            }

            console.log(
                "Checking match:",
                "Team:", teamMatch.team,
                "Selected prompt:", match.prompt,
                "Original prompt:", originalDrawing.prompt
            );

            if (match.prompt === originalDrawing.prompt) {
                scores[teamMatch.team - 1]++;

                if (teamMatch.team !== originalDrawing.team) {
                    scores[originalDrawing.team - 1]++;
                }

                console.log("Correct match! Scores:", scores);
            }
        });
    });

    console.log("Final calculated scores:", scores);
}




function updateScoreboard() {
    matchingScoreboardContent.innerHTML = "";
    drawingScoreboardContent.innerHTML = "";

    scores.forEach(function (score, index) {
        const teamScore = document.createElement("p");

        teamScore.textContent =
            "Team " + (index + 1) + ": " + score + " points";
        matchingScoreboardContent.appendChild(
            teamScore.cloneNode(true)
        );

        drawingScoreboardContent.appendChild(teamScore);
    });
}

function getCanvasCoordinates(event) {
    const rect = drawingCanvas.getBoundingClientRect();
    const style = getComputedStyle(drawingCanvas);

    const borderLeft = parseFloat(style.borderLeftWidth);
    const borderTop = parseFloat(style.borderTopWidth);

    const contentWidth = rect.width - borderLeft
        - parseFloat(style.borderRightWidth);
    const contentHeight = rect.height - borderTop
        - parseFloat(style.borderBottomWidth);

    return {
        x: (event.clientX - rect.left - borderLeft)
            * (drawingCanvas.width / contentWidth),
        y: (event.clientY - rect.top - borderTop)
            * (drawingCanvas.height / contentHeight)
    };
}



startButton.addEventListener("click", function () {
    totalTeams = Number(teamCount.value);
    totalRounds = Number(roundCount.value);
    currentRound = 1;
    currentTeam = 1;
    scores = Array(totalTeams).fill(0);
    updateScoreboard();

    roundPrompts = getRandomPrompts(totalTeams);
    promptText.textContent = roundPrompts[0];

    turnInfo.textContent =
    "Round " + currentRound + " of " + totalRounds +
    " — Team " + currentTeam;

    setupScreen.hidden = true;

    showHandoff(
        "Team " + currentTeam + " — Clue Giver",
        "The clue giver should take the device.",
        "Keep your prompt secret from the drawer!",
        function () {
            soundScreen.hidden = false;
        }
    );
});

beginDrawingButton.addEventListener("click", function () {
    drawingTurnInfo.textContent =
        "Round " + currentRound + " of " + totalRounds +
        " — Team " + currentTeam;

    soundScreen.hidden = true;

    showHandoff(
        "Team " + currentTeam + " — Drawer",
        "The drawer should take the device.",
        "Listen to the clue and draw what you think it means.",
        function () {
            drawingScreen.hidden = false;
        }
    );
});

const ctx = drawingCanvas.getContext("2d");

let isDrawing = false;

drawingCanvas.addEventListener("mousedown", function (event) {
    isDrawing = true;

    const pos = getCanvasCoordinates(event);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
});

drawingCanvas.addEventListener("mousemove", function (event) {
    if (!isDrawing) return;

    const pos = getCanvasCoordinates(event);
    console.log("Canvas:", pos.x, pos.y);

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
});

drawingCanvas.addEventListener("mouseup", function () {
    isDrawing = false;
});

drawingCanvas.addEventListener("mouseleave", function () {
    isDrawing = false;
});

clearButton.addEventListener("click", function () {
    ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
});


let completedDrawing = "";
let completedPrompt = "";


finishDrawingButton.addEventListener("click", function () {
    const drawingRecord = {
        team: currentTeam,
        round: currentRound,
        prompt: promptText.textContent,
        image: drawingCanvas.toDataURL("image/png")
    };

    allDrawings.push(drawingRecord);

    savedDrawing.src = drawingRecord.image;
    resultPrompt.textContent = "Drawing saved!";

    drawingScreen.hidden = true;
    resultScreen.hidden = false;
});





continueButton.addEventListener("click", function () {
    resultScreen.hidden = true;

    if (currentTeam < totalTeams) {
        // Another team needs to draw this round.
        currentTeam = currentTeam + 1;

        promptText.textContent = roundPrompts[currentTeam - 1];

        ctx.clearRect(
            0, 0, drawingCanvas.width, drawingCanvas.height
        );

        turnInfo.textContent =
            "Round " + currentRound + " of " + totalRounds +
            " — Team " + currentTeam;

        showHandoff(
            "Team " + currentTeam + " — Clue Giver",
            "The next team's clue giver should take the device.",
            "Don't look at the previous team's drawing or prompt!",
            function () {
                soundScreen.hidden = false;
            }
        );    
    } else {
        // All teams have drawn this round.
        gameSummaryScreen.hidden = true;
        currentMatchingTeam = 1;

        showHandoff(
            "Team " + currentMatchingTeam +
                " — Clue Giver Matching",
            "The clue giver should take the device.",
            "Match the drawings to the prompts. Don't reveal your answers to other teams.",
            function () {
                matchingScreen.hidden = false;
            }
        );

        matchingTurnInfo.textContent =
            "Round " + currentRound +
            " — Team " + currentMatchingTeam + " is matching";

        matchingArea.innerHTML = "";

        // Get the drawings from the current round.
        const roundDrawings = allDrawings
            .filter(function (drawing) {
                return drawing.round === currentRound;
            });

        // Shuffle the drawing order.
        roundDrawings.sort(function () {
            return Math.random() - 0.5;
        });

        // Shuffle the prompt options ONCE.
        const shuffledPrompts = roundDrawings
            .map(function (drawing) {
                return drawing.prompt;
            })
            .sort(function () {
                return Math.random() - 0.5;
            });

        // Create a card for each drawing.
        roundDrawings.forEach(function (drawing, index) {
            const drawingCard = document.createElement("div");
            const image = document.createElement("img");
            const promptSelect = document.createElement("select");

            promptSelect.classList.add("promptSelect");

            image.src = drawing.image;
            image.alt = "Drawing " + (index + 1);
            image.width = 250;

            const placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.textContent = "Choose a prompt";
            promptSelect.appendChild(placeholder);

            // Every dropdown uses the same shuffled order.
            shuffledPrompts.forEach(function (prompt) {
                const option = document.createElement("option");
                option.value = prompt;
                option.textContent = prompt;
                promptSelect.appendChild(option);
            });

            drawingCard.appendChild(image);
            drawingCard.appendChild(promptSelect);
            matchingArea.appendChild(drawingCard);
        });
    }
});






submitMatchesButton.addEventListener("click", function () {
    const promptSelects =
        matchingArea.querySelectorAll(".promptSelect");

    const selectedPrompts = [];

    promptSelects.forEach(function (select) {
        selectedPrompts.push(select.value);
    });

    const allSelected = selectedPrompts.every(function (prompt) {
        return prompt !== "";
    });

    const noDuplicates =
        new Set(selectedPrompts).size === selectedPrompts.length;

    if (!allSelected) {
        alert("Choose a prompt for every drawing!");
        return;
    }

    if (!noDuplicates) {
        alert("Each prompt can only be used once!");
        return;
    }

    // Save this team's answers.
    const teamMatches = selectedPrompts.map(function (prompt, index) {
        const drawingCard = matchingArea.children[index];
        const image = drawingCard.querySelector("img");

        return {
            drawingImage: image.src,
            drawingTeam: allDrawings.find(function (drawing) {
                return drawing.image === image.src;
            }).team,
            prompt: prompt
        };
    });

    allMatches.push({
        round: currentRound,
        team: currentMatchingTeam,
        matches: teamMatches
    });

    // Give the next team a turn to match.
    
    if (currentMatchingTeam < totalTeams) {
        currentMatchingTeam = currentMatchingTeam + 1;

        matchingTurnInfo.textContent =
            "Round " + currentRound +
            " — Team " + currentMatchingTeam + " is matching";

        // Clear previous team's selections.
        promptSelects.forEach(function (select) {
            select.value = "";
        });

        showHandoff(
            "Team " + currentMatchingTeam +
                " — Clue Giver Matching",
            "The next team's clue giver should take the device.",
            "Keep your matches secret from the other teams!",
            function () {
                matchingScreen.hidden = false;
            }
        );

        return;
    }


    
    // Every team has submitted its matches.
    matchingScreen.hidden = true;

    calculateScores();
    updateScoreboard();
    updateRoundScoreboard();

    roundScoreboardScreen.classList.remove("hidden");
    roundScoreboardScreen.hidden = false;

});



roundScoreboardContinueButton.addEventListener("click", function () {
    roundScoreboardScreen.classList.add("hidden");
    roundScoreboardScreen.hidden = true;

    if (currentRound < totalRounds) {
        currentRound = currentRound + 1;
        currentTeam = 1;

        roundPrompts = getRandomPrompts(totalTeams);
        promptText.textContent = roundPrompts[0];

        ctx.clearRect(
            0, 0, drawingCanvas.width, drawingCanvas.height
        );

        turnInfo.textContent =
            "Round " + currentRound + " of " + totalRounds +
            " — Team " + currentTeam;

        showHandoff(
            "Round " + currentRound +
                " — Team " + currentTeam + " Clue Giver",
            "The next round's clue giver should take the device.",
            "Keep your prompt secret from the drawer!",
            function () {
                soundScreen.hidden = false;
            }
        );

    } else {
        gameSummaryScreen.hidden = false;

        summaryText.textContent =
            "You completed " + allDrawings.length +
            " drawings over " + totalRounds +
            " rounds with " + totalTeams + " teams.";

        finalScores.innerHTML = "";

        const rankedTeams = scores
            .map(function (score, index) {
                return {
                    team: index + 1,
                    score: score
                };
            })
            .sort(function (a, b) {
                return b.score - a.score;
            });

        rankedTeams.forEach(function (team, index) {
            const scoreLine = document.createElement("p");

            scoreLine.textContent =
                (index + 1) + ". Team " + team.team +
                " — " + team.score + " points";

            finalScores.appendChild(scoreLine);
        });
    }

});



mainMenuButton.addEventListener("click", function () {
    gameSummaryScreen.hidden = true;
    menu.hidden = false;

    // Reset the game for the next playthrough.
    currentRound = 1;
    currentTeam = 1;
    allDrawings = [];
    roundPrompts = [];
    currentMatchingTeam = 1;
    allMatches = [];

    // Clear the drawing canvas.
    ctx.clearRect(
        0, 0, drawingCanvas.width, drawingCanvas.height
    );

    // Clear the previously saved drawing image.
    savedDrawing.src = "";
    resultPrompt.textContent = "";
    promptText.textContent = "";
});

