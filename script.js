const quiz_data = [
    {
        question: "What year was JavaScript Launched ?",
        id: "1",
        A: "1996",
        B: "1995",
        C: "1994",
        D: "1993",
        correct: "B",
    },
    {
        question: "What Does HTML stand for?",
        id: "2",
        A: "Hypertext Markup language",
        B: "Hypertext Markdown Language",
        C: "Hyperloop Machine Language",
        D: "Helicopers Terminals Motorboats Lamborginis",
        correct: "A",
    },
    {
        question: "What language runs in a web browser?",
        id: "3",
        A: "Java",
        B: "C",
        C: "Python",
        D: "JavaScript",
        correct: "D",
    },
    {
        question: "What does CSS stand for ?",
        id: "4",
        A: "Cental Style Sheets",
        B: "Cascading Simple Sheets",
        C: "Cascanding Style Sheets",
        D: "Cars SUVs Sailboats",
        correct: "C",
    },

];


// this is for initialization of random-question function
randomQues();


const getQuiz = document.getElementById("box");

const getQuestion = document.getElementById("question");

const getAnswerAll = document.querySelectorAll(".answer");

const ans1 = document.getElementById('answer1');
const ans2 = document.getElementById('answer2');
const ans3 = document.getElementById('answer3');
const ans4 = document.getElementById('answer4');

const submitButton = document.getElementById('submit');


const getResult = document.getElementById("resultbox");


let currentQuizIndex = 0;
let backButton = 0;
let score = 0;
emtObj = {}
solnSelected = 0;


// initialization of function 
startQuiz()


function startQuiz() {

    UnSelectAnswer();

    if (backButton == 0) {
        document.getElementById('back').style.display = "none";

        backButton++;
    }
    else {
        document.getElementById('back').style.display = "block";
    }

    // from here one full object is getting
    const currentQuizData = quiz_data[currentQuizIndex];
    // console.log(currentQuizData)


    // From here Question
    getQuestion.innerText = currentQuizData.question

    // console.log(currentQuizData.question)


    // from here all 4 four answer
    ans1.innerText = currentQuizData.A;
    ans2.innerText = currentQuizData.B;
    ans3.innerText = currentQuizData.C;
    ans4.innerText = currentQuizData.D;

}

// this is for unselecting
function UnSelectAnswer() {
    getAnswerAll.forEach(getAnswer => getAnswer.checked = false);
}

function getSelected() {
    let result;
    getAnswerAll.forEach(getAnswer => {
        if (getAnswer.checked) {
            result = getAnswer.id;
        }
    })
    return result;
}
var EmailN;
var ScoreN;

// Submit button js

submitButton.addEventListener('click', () => {
    const solution = getSelected();
    let getId = quiz_data[currentQuizIndex].id

    if (solution) {

        if (!emtObj.optionSelect) {
            let getForOption = localStorage.getItem(EmailN)

            getForOption = JSON.parse(getForOption)

            emtObj.optionSelect = {
                "username": getForOption.Username,
                "Email": getForOption.Email,
                [getId]: solution
            }
        }
        else {
            emtObj.optionSelect[getId] = solution

        }
        solnSelected[getId] = solution

        emtObj.getId = getId;

        localStorage.setItem(EmailN, JSON.stringify(emtObj))


        if (solution === quiz_data[currentQuizIndex].correct) {
            score++
        }

        currentQuizIndex++;

        if (currentQuizIndex < quiz_data.length) {
            startQuiz();
        }

        else {

            getQuiz.addEventListener('click', (e) => {

                e.preventDefault()
                getQuiz.style.display = 'none';
                getResult.style.display = 'block';
                // Correct answer

                ScoreN = score;

                let getData = localStorage.getItem(EmailN)
                getData = JSON.parse(getData)

                let newobj = {
                    "username": getData.optionSelect.username,
                    "Email": getData.optionSelect.Email,
                    "score": ScoreN,
                }
                let setWithScore = localStorage.setItem(EmailN, JSON.stringify(newobj))


                var CurrentUserScore = localStorage.getItem(EmailN);
                // console.log(EmailN);
                const parseData = JSON.parse(CurrentUserScore);

                document.getElementById("tcorrect").innerHTML = parseData.score;

                // console.log(localStorage.length)

                for (let i = 0; i < localStorage.length; i++) {

                    getFortable = JSON.parse(localStorage.getItem(localStorage.key(i)))

                    tbl.innerHTML += `
                    <table>
                       <tr>

                         <td>${i + 1}</td> 

                         <td>${getFortable.username}</td> 
                        
                         <td>${getFortable.Email}</td>
                        
                         <td>${getFortable.score}</td>

                       </tr>
                       
                     </table>   
                    `
                }
            });
        };
    } else {
        // without radio-button submit button is clicked.
        alert("Please select one option atleast!");
    }
})

// Randomly shuffling of question.

function randomQues() {

    for (let i = quiz_data.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = quiz_data[i];
        quiz_data[i] = quiz_data[j];
        quiz_data[j] = temp;
    }
}

// local storage implement here

const getModel = document.getElementById("modelbox")
let tryObj = {}
const form = document.getElementById('myForm')

// modelbox to box
form.addEventListener('submit', (e) => {

    e.preventDefault()
    closeBrowser()

    // if (closeBrowser() == false) {
    //     return false;
    // }

    if (validateform() == false) {
        return false;
    }
    let getUser = document.getElementById('username').value
    let getEmail = document.getElementById('email').value

    EmailN = getEmail;

    for (let i = 0; i < localStorage.length; i++) {

        let smEmail = localStorage.key(i)

        if (smEmail == EmailN) {

            let resultView = localStorage.getItem(EmailN);
            const Dataparse = JSON.parse(resultView);

            document.getElementById("tcorrect").innerHTML = Dataparse.score;

            document.getElementById('username2').innerHTML = Dataparse.username

            for (let i = 0; i < localStorage.length; i++) {
                getForsmEmail = JSON.parse(localStorage.getItem(localStorage.key(i)))

                tbl.innerHTML += `
                <table>
                   <tr>
                     <td>${i + 1}</td> 

                     <td>${getForsmEmail.username}</td> 
                    
                     <td>${getForsmEmail.Email}</td>
                    
                     <td>${getForsmEmail.score}</td>
                   </tr>

                 </table>   
                `
            }


            getModel.style.display = "none";
            getResult.style.display = 'block';
            return false


        }
    }

    getModel.style.display = 'none';

    getQuiz.style.display = 'block';


    tryObj = {
        "Username": getUser,
        "Email": EmailN,
    }

    let set1 = localStorage.setItem(EmailN, JSON.stringify(tryObj))

    let get1 = localStorage.getItem(EmailN)
    get1 = JSON.parse(get1)

    var get2 = document.getElementById('username1');
    get2.value = get1.Username;

    let get3 = document.getElementById('username2')
    get3.innerHTML = get1.Username;
})



// validation form
const isValidEmail = emailparam => {
    const Regex = /^(([a-zA-Z]+[^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return Regex.test(String(emailparam).toLowerCase());
}

function validateform() {
    var name = form.username.value;
    var emailcheck = form.email.value;

    if (name == null || name == "") {
        alert("Name can't be blank");
        return false;

    } else if (name.length < 8) {
        alert("Name can't be less than 8 characters!")
        return false;
    }
    else if (emailcheck == null || emailcheck == "") {
        alert("Email can't be blank");
        return false;
    }
    else if (!isValidEmail(emailcheck)) {
        alert("You have insert invalid email");
        return false;
    }
    else {
        return true;
    }
}



// Back button
back.addEventListener("click", () => {
    if (currentQuizIndex < 0) {
        currentQuizIndex--;
        startQuiz();

        let emailSame = localStorage.getItem(EmailN)

        emailSame = JSON.parse(emailSame)


        let getId = quiz_data[currentQuizIndex].id

        console.log(emailSame.getId.length)

        for (let i = 0; i < emailSame.getId.length; i++) {
            if (emailSame.getId == getId) {
                document.getElementById(emailSame.optionSelect[getId]).checked = true;
            }
        }
    }
});


//   Close browser

function closeBrowser() {

    console.log(localStorage.length)

    if (localStorage.length >= 10) {
        alert("2max item")
        localStorage.clear()
        window.close("index.html")
        return true;
    }
}





