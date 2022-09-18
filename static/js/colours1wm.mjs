//Scorepage vars 
var userScore = 0;
const score = document.getElementById('score');
const message = document.getElementById('message');
const scorepage = document.getElementById('scorepage');

//Quizpage vars 
const startpage = document.getElementById('startpg');
const startbtn = document.getElementById('startbtn');
const queslabel = document.getElementById('queslabel');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const nextbtn = document.getElementById('nextbtn');

//Vars used to ensure each answer is clicked only once/no cheating 
var checkedans1 = 0;
var checkedans2 = 0;
var checkedans3 = 0;
var checkedans4 = 0;

//Array with question and answer sets  
var questions = [
    {
        question: "What is 'Red' in French?",
        ans1: "Rouge",
        ans2: "Bouge",
        ans3: "Orange",
        ans4: "Marron",
        corrans:"Rouge"
    },
    {
        question: "What is 'Black' in French?",
        ans1: "Voir",
        ans2: "Noir",
        ans3: "Blaque",
        ans4: "Fumée",
        corrans:"Noir"
    },
    {
        question: "What is 'Blue' in French?",
        ans1: "Bleu",
        ans2: "Rigolo",
        ans3: "Heu",
        ans4: "Vert",
        corrans:"Bleu"
    },
    {
        question: "What is 'Grey' in French?",
        ans1: "Violet",
        ans2: "Jaune",
        ans3: "Blanc",
        ans4: "Gris",
        corrans:"Gris"
    }
];

//Hides all elements save for 'startquiz' at page opening 
const questionpage = document.getElementById('quizpage');
function hideinitialqpage (){
    questionpage.style.display='none';
    scorepage.style.display = 'none';
}
hideinitialqpage();

//Shuffles question array 
function shuffleques(){
    for (var i = 0; i < questions.length; i++){
        var newIndex = Math.floor(Math.random() * questions.length);
        var tempobj = questions[i];
        questions[i] = questions[newIndex];
        questions[newIndex] = tempobj;
        
    console.log(questions);
}
}

//For displaying the first question 
var qnum = 0;
function firstquestion(){
    questionpage.style.display='block';
    startpage.style.display= 'none';
    queslabel.innerHTML = questions[qnum].question;
    button1.innerHTML= questions[qnum].ans1;
    button2.innerHTML= questions[qnum].ans2;
    button3.innerHTML = questions[qnum].ans3;
    button4.innerHTML = questions[qnum].ans4;
};

//Giving the start button the ability to show the question answer boxes, starting from the first question 
startbtn.addEventListener('click', function (){
    shuffleques();
    firstquestion();
});

//Takes user to next question 
//Shows scorepage and hides quizpage after questions are completed
function gonextques(){
    qnum += 1
    if (qnum>questions.length-1) {
        console.log('Questions finished!');
        console.log(userScore)
        hideinitialqpage()
        showscoreandmsg()
    } else { 
        //questionpage.style.backgroundColor = 'white'
        queslabel.innerHTML = questions[qnum].question;
        button1.innerHTML= questions[qnum].ans1;
        button2.innerHTML= questions[qnum].ans2;
        button3.innerHTML = questions[qnum].ans3;
        button4.innerHTML = questions[qnum].ans4;
        checkedans1=0;
        checkedans2=0;
        checkedans3=0;
        checkedans4=0;
        button1.disabled = false;
        button2.disabled = false;
        button3.disabled = false;
        button4.disabled= false;
        button1.style.backgroundColor = '#0fa3b1';
        button2.style.backgroundColor = '#0fa3b1';
        button3.style.backgroundColor = '#0fa3b1';
        button4.style.backgroundColor = '#0fa3b1';
    }
}

nextbtn.addEventListener('click', gonextques);

//Shows score and message depending on score
function showscoreandmsg(){
    scorepage.style.display='block'
    score.innerHTML = userScore;
    if (userScore/questions.length < 0.4){
        message.innerHTML = 'You did not do well but keep trying!'
    } else if (userScore/questions.length < 0.8 && userScore/questions.length > 0.4){
        message.innerHTML = 'You did well! Keep practicing!'
    } else {
        message.innerHTML = 'Amazing score! Well done!'
    }
}

//Answer buttons
button1.addEventListener('click', checkans1);
button2.addEventListener('click', checkans2);
button3.addEventListener('click', checkans3);
button4.addEventListener('click', checkans4);



function checkans1(){
    for (var i = 0; i < questions.length; i++) {
        if (button1.textContent == questions[i].corrans && queslabel.textContent == questions[i].question){
            console.log('correct answer chosen');
            userScore += 1;
            button1.style.backgroundColor = 'lime';
            checkedans1 += 1;
            break;
        } else {
            console.log('wrong answer chosen');
            button1.style.backgroundColor = 'red';
            checkedans1 += 1;
            
        }  
    } 
    button1.disabled= true;
    button2.disabled = true;
    button3.disabled = true;
    button4.disabled= true;
}
function checkans2(){
    for (var i = 0; i < questions.length; i++) {
        if (button2.textContent == questions[i].corrans && queslabel.textContent == questions[i].question){
            console.log('correct answer chosen');
            userScore += 1;
            button2.style.backgroundColor = 'lime';
            checkedans2 += 1;
            break;
        } else {
            console.log('wrong answer chosen');
            button2.style.backgroundColor = 'red';
            checkedans2 += 1;
            
        }
    }
    button2.disabled= true;
    button1.disabled = true;
    button3.disabled = true;
    button4.disabled= true;
}
function checkans3(){
    for (var i = 0; i < questions.length; i++) {
        if (button3.textContent == questions[i].corrans && queslabel.textContent == questions[i].question){
            console.log('correct answer chosen');
            userScore += 1;
            button3.style.backgroundColor = 'lime';
            checkedans3 += 1;
            break;
        } else {
            console.log('wrong answer chosen');
            button3.style.backgroundColor = 'red';
            checkedans3 += 1;
            
        }
    }
    button3.disabled= true;
    button1.disabled = true;
    button2.disabled = true;
    button4.disabled= true;
}
function checkans4(){
    for (var i = 0; i < questions.length; i++) {
        if (button4.textContent == questions[i].corrans && queslabel.textContent == questions[i].question){
            console.log('correct answer chosen');
            userScore += 1;
            button4.style.backgroundColor = 'lime'; 
            checkedans4 += 1;
            break;
        } else {
            console.log('wrong answer chosen');
            button4.style.backgroundColor = 'red';
            checkedans4 += 1;
            
        }
    }
    button4.disabled= true;
    button1.disabled = true;
    button2.disabled = true;
    button3.disabled= true;
}
