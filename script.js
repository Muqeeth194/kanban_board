// Opening the Modal

const modal = document.querySelector('.modal')
const addBtn = document.querySelector('.add.btn')
const dtlBtn = document.querySelector('.delete.btn')
let tasks = document.querySelector('select')
let taskId = document.querySelector('.task-cont')
let taskAreaCont = document.querySelector('.textArea-cont')
let allPriority = document.querySelectorAll('.tasks-color-cont')
let mainCont = document.querySelector('.main-cont')
let taskColor = 'Open'

let addModalFlag = false
let removeTaskflag = false


addBtn.addEventListener('click', () => {

    if (modal.style.display == 'none') {
        addModalFlag = false
    }

    addModalFlag = !addModalFlag
    if (addModalFlag == true) {
        modal.style.display = 'block'
        taskId.textContent = shortid()
        addBtn.classList.add('add-clicked')
    }
    else {
        modal.style.display = 'none'
        addBtn.classList.remove('add-clicked')
    }
})

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = 'none'
        addBtn.classList.remove('add-clicked')
    }
}

// Filtering the tasks

tasks.addEventListener('change', (e) => {
    let taskName = tasks.value

    let ticketNames = document.querySelectorAll('.ticket-cont')


    if (taskName === 'All') {
        ticketNames.forEach(function (ticket) {
            ticket.style.display = 'block'
            // console.log('all is showing');
        })
    }
    else {
        ticketNames.forEach(function (ticket) {
            let ticketColor = ticket.getAttribute('color')
            // console.log(ticketColor);

            if (taskName === ticketColor) {
                ticket.style.display = 'block'
            }
            else {
                ticket.style.display = 'none'
            }
        })
    }
})


// Focus the clicked color option and get the color of the div
allPriority.forEach(priority => {
    priority.addEventListener('click', () => {
        allPriority.forEach(div => {
            div.classList.remove('active')
        })
        priority.classList.add('active')
        taskColor = priority.textContent
        
    })
})

// Noting down the details when the Shift button is clicked and call the ticket creation function

// let innerColorDiv = document.querySelector('.color-cont')
let innerModalDiv = document.querySelector('.modal-cont')

// innerColorDiv.addEventListener('keydown', submit)
innerModalDiv.addEventListener('keydown', submit)

function submit(event) {

    let keyPressed = event.key

    if (keyPressed === 'Shift') {
        let taskDesc = taskAreaCont.value
        let taskNum = taskId.textContent
        // console.log(taskColor);
        createTicket(taskDesc, taskNum, taskColor)

        modal.style.display = 'none'
        addBtn.classList.remove('add-clicked')
        addModalFlag = !addModalFlag

        taskAreaCont.value = ''
    }}


    // Creating the ticket by taking the information from Modal

function createTicket(taskDesc, taskNum, taskColor) {
    let ticketCont = document.createElement('div')
    ticketCont.classList.add('ticket-cont')
    ticketCont.setAttribute('color', taskColor)

    // console.log(ticketCont);

    ticketCont.innerHTML = `<div class="${taskColor} ticket-color"></div><div class="ticket-id">${taskNum}</div><div class="ticket-area">${taskDesc}<i class="fa-solid fa-lock fa-lg" id="lock"></i></div>`

    mainCont.appendChild(ticketCont)
    handleDelete(ticketCont)
}

dtlBtn.addEventListener('click', ()=>{
    removeTaskflag = !removeTaskflag

    if (removeTaskflag == true){
        alert('Delete Mode is activated')
        dtlBtn.classList.add('dlt-clicked')
    }
    else{
        dtlBtn.classList.remove('dlt-clicked')
    }
})

function handleDelete(ticketCont){
    ticketCont.addEventListener('click', ()=>{
        if (removeTaskflag == true){
            ticketCont.remove()
        }
    })
}
