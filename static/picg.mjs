//Array containing links of images and answers 

qansset = [
    {
        link1: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        link2: 'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/06/cat-217679.jpg?h=c4ed616d&itok=3qHaqQ56',
        link3: 'https://media.npr.org/assets/img/2021/08/17/gettyimages-135773550-bb02ff79dd836d6e4170d4bc555423f24fa29d5e.jpg',
        link4: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-1.2.1&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
        corrans: 'chat'
    },
    {
        link1: 'https://www.railway-technology.com/wp-content/uploads/sites/13/2020/09/Singapore-29thSept.jpg',
        link2:'https://onecms-res.cloudinary.com/image/upload/s--gwCdld_5--/f_auto,q_auto/c_fill,g_auto,h_676,w_1200/v1/mediacorp/cna/image/2022/06/19/jb_woodlands_train.jpg?itok=tlCc6YH0',
        link3:'https://www.tripsavvy.com/thmb/ACgmbvY3AgwFZ5JwjFaRAvSF9Fc=/2048x1152/smart/filters:no_upscale()/DSC_0240-92f4cafe7b634f9f846b9fa747b0e7a7.jpg',
        link4:'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/d6/a2/35/main-platform.jpg?w=1200&h=-1&s=1',
        corrans: 'gare'
    }
];

//Get the picture holders

picture1 = document.getElementById('pic1')
picture2 = document.getElementById('pic2')
picture3 = document.getElementById('pic3')
picture4 = document.getElementById('pic4')

//Get the start button 
startbutton = document.getElementById('startbtn')

//Get the button to submit
answerbtn = document.getElementById('ansbtn');

//Get the text entry boxes without content for the answer
box1 = document.getElementById('L1')
box2 = document.getElementById('L2')
box3 = document.getElementById('L3')
box4 = document.getElementById('L4')

//Hiding the question and score pages at the entry point 
const questionpage = document.getElementById('question page')
const startpage= document.getElementById('start page')
const scorepage = document.getElementById('score page')
scorelabel = document.getElementById('finalscore')
scoremsg = document.getElementById('compmsg')
function hidepages(){
    questionpage.style.display = 'none'
    scorepage.style.display = 'none'
}
hidepages()

//Set a score variable

var userscore = 0;

//Binding a start game function to the button 
var qnum = 0;
function startgame(){
    startpage.style.display = 'none'
    questionpage.style.display = 'block';
    scorepage.style.display = 'none'
    picture1.src = qansset[qnum].link1;
    picture2.src = qansset[qnum].link2;
    picture3.src = qansset[qnum].link3;
    picture4.src = qansset[qnum].link4;
}
startbutton.addEventListener('click', startgame)

answerbtn.addEventListener('click', checkans);
function checkans(){
    letter1 = document.getElementById('L1').value
    letter2 = document.getElementById('L2').value
    letter3 = document.getElementById('L3').value
    letter4 = document.getElementById('L4').value
    answer = letter1+letter2+letter3+letter4
    console.log(answer)
    if (answer == qansset[qnum].corrans){ //qansset[qnum].corrans
        box1.style.backgroundColor = 'lime'
        box2.style.backgroundColor = 'lime'
        box3.style.backgroundColor = 'lime'
        box4.style.backgroundColor = 'lime'
        console.log('correc')
        userscore++
    } else {
        box1.style.backgroundColor = 'red'
        box2.style.backgroundColor = 'red'
        box3.style.backgroundColor = 'red'
        box4.style.backgroundColor = 'red'
        console.log('lmao loser')
    }
    answerbtn.disabled = true;
}

//Get the next question button 

nextqbtn = document.getElementById('nextq')

//Function to set up next button 

nextqbtn.addEventListener('click', nextpicg)

function nextpicg(){
    qnum++
    if (qnum>qansset.length-1){
        startpage.style.display = 'none'
        questionpage.style.display = 'none'
        showscorepage()
    } else {
        picture1.src = qansset[qnum].link1;
        picture2.src = qansset[qnum].link2;
        picture3.src = qansset[qnum].link3;
        picture4.src = qansset[qnum].link4;
        box1.style.backgroundColor = 'white'
        box2.style.backgroundColor = 'white'
        box3.style.backgroundColor = 'white'
        box4.style.backgroundColor = 'white'
        box1.value = ''
        box2.value = ''
        box3.value = ''
        box4.value = ''
        answerbtn.disabled = false;
    }
    
}

//Set up a score page


function showscorepage(){
    scorepage.style.display= 'block'
    scorelabel.innerHTML = userscore
    userscoreband = (userscore/2)*100
    if (userscoreband>50){
        scoremsg.innerHTML = 'good job'
    } else {
        scoremsg.innerHTML = 'keep trying'
    }
}
