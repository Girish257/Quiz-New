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




let currentQuizIndex = 0;
let backButton = 0;
let score = 0;


// initialization of function 
startQuiz()


function startQuiz() {

    UnSelectAnswer();

    if (backButton == 0) {
        document.getElementById('back').style.display = "none";

        backButton++;
    } else {
        document.getElementById('back').style.display = "block";
    }


    // from here one full object is getting
    const currentQuizData = quiz_data[currentQuizIndex];

    // console.log(currentQuizData)


    // From here Question is getting & printing
    getQuestion.innerText = currentQuizData.question

    // console.log(currentQuizData.question)


    // from here all 4 four answer is getting & printing
    ans1.innerText = currentQuizData.A;
    ans2.innerText = currentQuizData.B;
    ans3.innerText = currentQuizData.C;
    ans4.innerText = currentQuizData.D;
    // console.log(currentQuizData.A)

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

var UserN;
var EmailN;
var ScoreN;



// Submit button js

submitButton.addEventListener('click', () => {
    const solution = getSelected();

    if (solution) {









        gettingAgain = localStorage.getItem(EmailN)

        // console.log(gettingAgain)

        // console.log(solution);

        QuesID = quiz_data[currentQuizIndex].id

        AnsObj = {
            // "quesid": QuesID,

            QuesID,
            solution,
        }

        console.log(AnsObj)











        if (solution === quiz_data[currentQuizIndex].correct) {
            score++


        }

        currentQuizIndex++;



        if (currentQuizIndex < quiz_data.length) {
            startQuiz();
        }

        else {
            const getResult = document.getElementById("resultbox");

            getQuiz.addEventListener('click', (e) => {


                e.preventDefault()
                getQuiz.style.display = 'none';

                getResult.style.display = 'block';

                // Correct answer


                var getScore = score;
                ScoreN = getScore;


                // console.log(AnsIDN)




                // console.log(getScore);
                let getData = localStorage.getItem(EmailN)
                // console.log(typeof getData)
                getData = JSON.parse(getData)

                let newobj = {
                    "username": getData.Username,
                    "Email": getData.Email,
                    "score": ScoreN,
                }
                // console.log(newobj)

                let x = localStorage.setItem(EmailN, JSON.stringify(newobj))

                // console.log(typeof x)

                var CurrentUserScore = localStorage.getItem(EmailN);
                // console.log(EmailN);
                const parseData = JSON.parse(CurrentUserScore);

                document.getElementById("tcorrect").innerHTML = parseData.score;

                // console.log(localStorage.length)

                for (let i = 0; i < localStorage.length; i++) {
                    // console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
                    XX = JSON.parse(localStorage.getItem(localStorage.key(i)))

                    tbl.innerHTML += `
                    <table>
                       <tr>

                         <td>${i + 1}</td> 

                         <td>${XX.username}</td> 
                        
                         <td>${XX.Email}</td>
                        
                         <td>${XX.score}</td>

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

// cookie implement here


// Submit modelbox to box

const getModel = document.getElementById("modelbox")


let tryObj = {}

// 

const form = document.getElementById('myForm')



form.addEventListener('submit', (e) => {

    e.preventDefault()
    if (validateform() == false) {
        // validateform()
        return false;

    }




    // for(let i = 0; i < localStorage.length; i++)
    // // email = localStorage.EmailN;
    // if(email == localStorage)


    getModel.style.display = 'none';

    getQuiz.style.display = 'block';

    let getUser = document.getElementById('username').value
    let getEmail = document.getElementById('email').value

    EmailN = getEmail;

    tryObj = {
        "Username": getUser,
        "Email": EmailN,
    }


    let x = localStorage.setItem(EmailN, JSON.stringify(tryObj))


    let y1 = localStorage.getItem(EmailN)
    y1 = JSON.parse(y1)

    // console.log(y1)



    var aq = document.getElementById('username1');
    aq.value = y1.Username;

    let y = document.getElementById('username2')
    y.innerHTML = y1.Username;


})

// validation form 
const isValidEmail = emailpara => {
    const Regex = /^(([a-zA-Z]+[^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return Regex.test(String(emailpara).toLowerCase());
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
    if (currentQuizIndex > 0) {
        currentQuizIndex--;
        startQuiz()


    }
});











