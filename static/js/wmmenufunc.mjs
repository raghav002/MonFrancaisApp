const defaultsec = document.getElementById("defaultsec")
const topicname = document.getElementById("topicph")

const bconvsec = document.getElementById("bconv")
const animsec = document.getElementById("anim")
const colsec = document.getElementById("col")
const closec = document.getElementById("clo")
const furnsec = document.getElementById("furn")


function hidepages(){
    bconvsec.style.display='none'
    animsec.style.display='none'
    colsec.style.display='none'
    closec.style.display='none'
    furnsec.style.display='none'
}

hidepages()

var activesec = defaultsec

const bconvchoice = document.getElementById("bconvcho")
bconvchoice.addEventListener('click', showbconv)
function showbconv(){
    topicname.innerHTML = "Basic Conversation Quizzes"
    activesec.style.display='none'
    bconvsec.style.display='grid'
    activesec=bconvsec 
}

const animchoice = document.getElementById("animcho")
animchoice.addEventListener('click', showanim)
function showanim(){
    topicname.innerHTML = "Animals Quizzes"
    activesec.style.display='none'
    animsec.style.display='grid'
    activesec=animsec 
}

const colchoice = document.getElementById("colcho")
colchoice.addEventListener('click', showcol)
function showcol(){
    topicname.innerHTML = "Colours Quizzes"
    activesec.style.display='none'
    colsec.style.display='grid'
    activesec=colsec 
}

const clochoice = document.getElementById("clocho")
clochoice.addEventListener('click', showclo)
function showclo(){
    topicname.innerHTML = "Clothes Quizzes"
    activesec.style.display='none'
    closec.style.display='grid'
    activesec=closec 
}

const furnchoice = document.getElementById("furncho")
furnchoice.addEventListener('click', showfurn)
function showfurn(){
    topicname.innerHTML = "Furniture Quizzes"
    activesec.style.display='none'
    furnsec.style.display='grid'
    activesec=furnsec 
}