// Opening the Modal

const modal = document.querySelector('.modal')
const addBtn = document.querySelector('.add.btn')
const dtlBtn = document.querySelector('.delete.btn')
let tasks = document.querySelector('select')
let taskId = document.querySelector('.task-cont')
let taskAreaCont = document.querySelector('.textArea-cont')
let allPriority = document.querySelectorAll('.tasks-color-cont')
let mainCont = document.querySelector('.main-cont')
let innerModalDiv = document.querySelector('.modal-cont')
let taskColor = 'Open'


let lockIconClass = 'fa-lock'
let unlockIconClass = 'fa-lock-open'
let colors = ['Open', 'Assigned', 'In-progress', 'Closed']

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
    }
}


// Creating the ticket by taking the information from Modal

function createTicket(taskDesc, taskNum, taskColor) {
    let ticketCont = document.createElement('div')
    ticketCont.classList.add('ticket-cont')
    ticketCont.setAttribute('color', taskColor)

    // console.log(ticketCont);

    ticketCont.innerHTML = `<div class="${taskColor} ticket-color"></div><div class="ticket-id">${taskNum}</div><div class="ticket-area">${taskDesc}<i class="fa-solid fa-lock fa-lg" id="lock"></i></div>`

    mainCont.appendChild(ticketCont)

    handleDelete(ticketCont)
    handleLock(ticketCont)
    handleColor(ticketCont)
}

dtlBtn.addEventListener('click', () => {
    removeTaskflag = !removeTaskflag

    if (removeTaskflag == true) {
        alert('Delete Mode is activated')
        dtlBtn.classList.add('dlt-clicked')
    }
    else {
        dtlBtn.classList.remove('dlt-clicked')
    }
})

// Deleting the ticket

function handleDelete(ticketCont) {
    ticketCont.addEventListener('click', () => {
        if (removeTaskflag == true) {
            ticketCont.remove()
        }
    })
}

// Making the ticket area editable

function handleLock(ticketCont) {
    let ticketArea = ticketCont.children[2]
    let ticketLockIcon = ticketArea.children[0]

    ticketLockIcon.addEventListener('click', () => {
        console.log(ticketArea.children[0]);

        if (ticketLockIcon.classList.contains(lockIconClass)) {
            ticketLockIcon.classList.remove(lockIconClass)
            ticketLockIcon.classList.add(unlockIconClass)
            ticketArea.setAttribute('contenteditable', 'true')
        }
        else {
            ticketLockIcon.classList.remove(unlockIconClass)
            ticketLockIcon.classList.add(lockIconClass)
            ticketArea.setAttribute('contenteditable', 'false')
        }
    })
}

// changing the color or status of the ticket

function handleColor(ticketCont) {
    let ticketColorBand = document.querySelector('.ticket-color')

    ticketColorBand.addEventListener('click', () => {

        let currentColor = ticketColorBand.classList[0]

        let currentColorIndex = colors.findIndex(color => {
            return color == currentColor
        })

        currentColorIndex++

        ticketColorBand.setAttribute('class', '')

        let newColorIndex = currentColorIndex % colors.length
        let newColor = colors[newColorIndex]

        ticketColorBand.parentElement.setAttribute('color', newColor)
        ticketColorBand.classList.add(newColor, 'ticket-color')
    })
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