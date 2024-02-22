const questions = [
    { q: "2+2", opt: [1, 2, 3, 4], correct: 4, hasImage: false },

    { q: "2*2*2-8", opt: [8, 0, -2, 1], correct: 0, hasImage: false },

    { q: "3+3+3", opt: [0, 333, 6, 9], correct: 9, hasImage: false },

    { q: "4*4/4", opt: [4, 0, 8, 16], correct: 4, hasImage: false },

    {
        q: '<img class="photo" src="assets/ram mandir.webp" /> <br> Which monument is this?',
        opt: ["Taj Mahal", "Red Fort", "Qutub Minar", "Ram Mandir"],
        correct: "Ram Mandir",
        hasImage: true,
    },
];

const para = document.querySelector(".question");
const optionsPara = document.querySelectorAll("#options p");
const timerDiv = document.querySelector(".timer");
const counterDiv = document.querySelector("#counter");
const redcolor = document.querySelectorAll(".red")
const value = [];
const userAnswers = [];
const randomOrder = [];
const temp = [];

let didUserAnswer = false;

let i = 0;
let timer = 5;

// GENERATE A RANDOM ORDER ON PAGE LOAD
for (let i = 0; i < questions.length; i++) {
    // red()
    randomOrder.push(getARandomValue());
}

// PRINT FIRST QUESTION INSTANTLY (WITHOUT DELAY)
// red()
printQ();

timerDiv.innerHTML = timer;

// START THE LOOP TO PRINT NEXT QUESTIONS
const girraj = setInterval(() => {
    if (timer === 1) {
        if (didUserAnswer === false) userAnswers.push("NA");
        red()
        red(i)
        // sohan()
        printQ();
        red(i)
        timer = 5;

        timerDiv.innerHTML = timer;
    } else {
        red()
        timer--;
        timerDiv.innerHTML = timer;
    }
}, 1000);

// WHEN USER CLICKS ON ANY OPTION,
// APPLY CLASS ON THAT OPTION
optionsPara.forEach((p, index) => {
    p.addEventListener("click", () => {
        p.classList.add("selectedOption");
        userAnswers.push(p.innerHTML);

        // NOW THAT USER HAS MADE THEIR CHOICE
        // TOGGLE THE VARIABLE AND,
        // DISABLE ALL THE OPTIONS TO PREVENT DOUBLE CLICKING

        didUserAnswer = true;
        disableOptions();
        console.log(userAnswers);
    });
});

function getARandomValue() {
    const randomValue = Math.floor(Math.random() * questions.length);
    if (temp.includes(randomValue)) return getARandomValue();
    else {
        temp.push(randomValue);
        return randomValue;
    }
}

function printQ() {
    // ENABLE THE OPTIONS
    enableOptions();

    // REMOVE THE SELECTED CLASS
    removeSelectedClass();

    // TOGGLE VARIABLE TO FALSE
    didUserAnswer = false;

    if (i === questions.length) {
        clearInterval(girraj);

        // COMPARE USER ANSWERS WITH ACTUAL ANSWERS AS PER RANDOM ORDER
        const score = compareUserAnswers();

        // DISPLAY SCORE ON SCREEN
        showScore(score);
    } else {
        para.innerHTML = questions[randomOrder[i]].q;
        optionsPara.forEach((p, index) => {
            p.innerHTML = questions[randomOrder[i]].opt[index];
        });
        i++;
    }
}

function disableOptions() {
    optionsPara.forEach((p) => {
        p.style.pointerEvents = "none";
    });
}

function enableOptions() {
    optionsPara.forEach((p) => {
        p.style.pointerEvents = "all";
    });
}

function removeSelectedClass() {
    optionsPara.forEach((p) => {
        if (p.classList.contains("selectedOption"))
            p.classList.remove("selectedOption");
    });
}

function compareUserAnswers() {
    let score = 0;
    userAnswers.forEach((userA, index) => {
        if (questions[randomOrder[index]].hasImage === false) {
            userA = Number(userA);
        }
        if (userA !== "NA" && userA === questions[randomOrder[index]].correct) {
            score++;
        }
    });
    return score;
}

function showScore(score) {
    document.querySelector("#quiz").innerHTML = "";
    counterDiv.style.display = "none";
    const scorePara = document.createElement("p");
    scorePara.classList.add("scorePara");
    scorePara.innerHTML = "Your score is: " + score;
    document.querySelector("#quiz").append(scorePara);
}
// for (let i = 0; i < questions.length; i++) {
// const count = document.createElement("div");
// count.innerHTML = i + 1;
// counterDiv.append(count);
// }

// function sohan(){

for (let i = 0; i < questions.length; i++) {
    const count = document.createElement("div");
    count.classList.add("count");
    count.innerHTML = i + 1;
    counterDiv.append(count);
    // for (let j = 0; j < questions.length; j++) {
    // if(timer===5){

    // count.classList.add("red");
    // i++
    // if (i === j) {
    // count.classList.add("red");
}
// }
// else {
// count.classList.add("count")
// i++
// }
// }
// }
// }
// const count = document.createElement("div");
// // function red(){
// count.classList.add("count");
// temp.count.classList.add("red");
// counterDiv.append(count);
// }
// function red() {
// for(let i =0; i< questions.length; i++){
// const rajesh = document.createElement
// const count = counterDiv;
// count.classList.add("count");
// count.classList.remove("count")
// count.innerHTML = i;
// counterDiv.append(count);
// counterDiv.classList.add("red")
// }
// }
// red()
// red(i++)

function red() {
    Array.from(counterDiv.children).forEach((counter, index) => {
        if (index < i) {
            counter.classList.add("gol");
            if (index === i - 1) counter.classList.add("blue")
            else {
                counter.classList.remove("blue")
                counter.classList.remove("gol")
            }
        }
    })
}