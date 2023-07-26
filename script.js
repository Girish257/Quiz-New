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

// 

// this is for initialization of random-question function
// randomQues();


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
let index = 0;


var localObj = {}
// solnSelected = 0;


// initialization of function 
startQuiz()



function startQuiz() {

    UnSelectAnswer();
    currentEmail = localStorage.getItem('currentUser')
    if (currentEmail) {
        let ls = localStorage.getItem(currentEmail)
        localObj = JSON.parse(ls)
        index = localObj.aaaindex
    }

    if (index == 0) {
        document.getElementById('back').style.display = "none";
    }
    else {
        document.getElementById('back').style.display = "block";
    }

    currentEmail = localStorage.getItem('currentUser')
    if (currentEmail) {
        currentUser = localStorage.getItem(currentEmail)
        currentUser = JSON.parse(currentUser)
        currentQuizIndex = currentUser.aaaindex
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
    currentEmail = localStorage.getItem('currentUser')
    if (currentEmail) {
        let ls = localStorage.getItem(currentEmail)
        localObj = JSON.parse(ls)
        index = localObj.aaaindex
    }
    let getId = quiz_data[currentQuizIndex].id
    currentQuizIndex = index + 1;
    if (solution) {


        localObj.selected[getId] = { id: getId, Answer: solution }
        localObj.aaaindex = currentQuizIndex
        /*if (solution === quiz_data[index].correct) {
            score++

        }

        localObj.scoreaa = score*/

        let setls = localStorage.setItem(currentEmail, JSON.stringify(localObj))
        // setaa()

        //currentQuizIndex++;

        if (currentQuizIndex < quiz_data.length) {
            if (currentEmail) {
                currentUser = localStorage.getItem(currentEmail)
                currentUser = JSON.parse(currentUser)
                currentQuizIndex = currentUser.aaaindex
            }
            startQuiz();
            setPreviousSelection()
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

                localObj = {
                    "Username": getData.Username,
                    "Email": getData.Email,
                    "scoreaa": ScoreN,
                    "aaaindex": index,

                }
                let setWithScore = localStorage.setItem(EmailN, JSON.stringify(localObj))
                // setaa()

                var CurrentUserScore = localStorage.getItem(EmailN);
                // console.log(EmailN);
                const parseData = JSON.parse(CurrentUserScore);

                document.getElementById("tcorrect").innerHTML = parseData.scoreaa;

                // console.log(localStorage.length)

                for (let i = 0; i < localStorage.length; i++) {

                    getFortable = JSON.parse(localStorage.getItem(localStorage.key(i)))

                    tbl.innerHTML += `
                    <table>
                       <tr>

                         <td>${i + 1}</td> 

                         <td>${getFortable.Username}</td> 
                        
                         <td>${getFortable.Email}</td>
                        
                         <td>${getFortable.scoreaa}</td>

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

// function randomQues() {

//     for (let i = quiz_data.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         let temp = quiz_data[i];
//         quiz_data[i] = quiz_data[j];
//         quiz_data[j] = temp;
//     }
// }

// local storage implement here

const getModel = document.getElementById("modelbox")

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

            document.getElementById("tcorrect").innerHTML = Dataparse.scoreaa;

            document.getElementById('username2').innerHTML = Dataparse.Username

            for (let i = 0; i < localStorage.length; i++) {
                getForsmEmail = JSON.parse(localStorage.getItem(localStorage.key(i)))

                tbl.innerHTML += `
                <table>
                   <tr>
                     <td>${i + 1}</td> 

                     <td>${getForsmEmail.Username}</td> 
                    
                     <td>${getForsmEmail.Email}</td>
                    
                     <td>${getForsmEmail.scoreaa}</td>
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

    localObj = {
        "Username": getUser,
        "Email": EmailN,
        "selected": {},
        "scoreaa": score,
        "aaaindex": index,
    }

    let set1 = localStorage.setItem(EmailN, JSON.stringify(localObj))


    // setaa()


    let get1 = localStorage.getItem(EmailN)
    get1 = JSON.parse(get1)
    localStorage.setItem('currentUser', EmailN)

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
    currentEmail = localStorage.getItem('currentUser')
    if (currentEmail) {
        let ls = localStorage.getItem(currentEmail)
        localObj = JSON.parse(ls)
        index = localObj.aaaindex
    }
    currentQuizIndex = index
    if (currentQuizIndex > 0) {
        currentQuizIndex--;

        let emailSame = localStorage.getItem(currentEmail)

        emailSame = JSON.parse(emailSame)
        /*if (score > 0) {
            score--
        }
        index--*/

        // localObj.aaaindex = index
        // localObj.scoreaa = score

        localObj = {
            "Username": emailSame.Username,
            "Email": emailSame.Email,
            "selected": emailSame.selected,
            "scoreaa": score,
            "aaaindex": currentQuizIndex,
        }


        let setls = localStorage.setItem(currentEmail, JSON.stringify(localObj))
        // setaa()

        startQuiz();

        let getId = quiz_data[currentQuizIndex].id

        // console.log(emailSame.selected[getId])

        // console.log(Object.keys(emailSame.selected).length)

        setPreviousSelection()

    }
});


function setPreviousSelection() {

    let emailSame = localStorage.getItem(currentEmail)

    emailSame = JSON.parse(emailSame)
    let getId = quiz_data[currentQuizIndex].id

    console.log(emailSame)

    console.log(quiz_data[currentQuizIndex].id)
    console.log(emailSame.selected.length);



    for (let i = 0; i < emailSame.selected.length; i++) {
        if (emailSame.selected[i].Id == getId) {
            document.getElementById(emailSame.selected[i].Answer).checked = true;
        }
    }
}




//   Close browser

function closeBrowser() {

    if (localStorage.length >= 10) {
        alert("max item")
        localStorage.clear()
        window.close("index.html")
        return true;
    }
}


window.addEventListener("load", () => {

    loadUserData();

});


// window.addEventListener("beforeunload", () => {

// });


function loadUserData() {

    currentEmail = localStorage.getItem('currentUser')
    /*var qqq = sessionStorage.getItem("SetItem");
    console.log(qqq);
    qqq = JSON.parse(qqq)*/
    // var ddd = localStorage.getItem(qqq);
    // console.log("++++++++++++++", ddd);


    //const localStorageData = localStorage.getItem("userData");
    if (currentEmail) {
        currentUser = localStorage.getItem(currentEmail)
        let usernameElement = document.getElementById('username1')
        currentUser = JSON.parse(currentUser)
        usernameElement.value = currentUser['Username'];
        // console.log(currentUser.aaaindex)
        // console.log(quiz_data.length)
        if (currentUser.aaaindex !== undefined && currentUser.aaaindex >= quiz_data.length) {

            getQuiz.style.display = "none";
            getModel.style.display = "none"

            getResult.style.display = "block";


        } else {
            getModel.style.display = "none";
            getResult.style.display = "none";
            getQuiz.style.display = "block";
        }


    } else {
        getModel.style.display = "block";
        getResult.style.display = "none";
        getQuiz.style.display = "none";

    }


    /*if (qqq) {
        currentUserData = qqq;
    }

    else {

        getModel.style.display = 'block';

        getQuiz.style.display = 'none';
        return;
    }

    if (currentUserData.aaaindex !== undefined) {

        // userAnswers = currentUserData.userAnswers || [];
        if (currentUserData.aaaindex >= quiz_data.length) {

            getQuiz.style.display = "none";
            getModel.style.display = "none"

            getResult.style.display = "block";


        } else {
            getModel.style.display = "none";
            getResult.style.display = "none";
            getQuiz.style.display = "block";
            // startQuiz();

        }
        return;
    }


    getModel.style.display = "block";
    getResult.style.display = "none";
    getQuiz.style.display = "none";*/

}


