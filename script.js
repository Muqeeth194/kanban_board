// Opening the Modal

const modal = document.querySelector('.modal')
const addBtn = document.querySelector('.add.btn')

let addModalFlag = false


addBtn.addEventListener('click', () => {

    if (modal.style.display == 'none'){
        addModalFlag = false
    }


    addModalFlag = !addModalFlag
    if (addModalFlag == true){
        modal.style.display = 'block'
    }
    else{
        modal.style.display = 'none'
    }
})

window.onclick = (e) => {
    if (e.target == modal){
        modal.style.display = 'none'
    }
}

// Filtering the tasks

let tasks = document.querySelector('select')

tasks.addEventListener('change', (e)=>{
    let taskName = tasks.value
    // console.log(taskName);
    let ticketNames = document.querySelectorAll('.ticket-cont')
    // console.log(ticketName);

    if (taskName === 'All'){
        ticketNames.forEach(function(ticket){
            ticket.style.display = 'block'
        })
    }
    else{
        ticketNames.forEach(function(ticket){
            let ticketColor = ticket.getAttribute('color')
            if (taskName === ticketColor){
                ticket.style.display = 'block'
            }
            else{
                ticket.style.display = 'none'
            }
        })
    }
})

// Adding the tasks

let addTask = (button) => {
    let taskId = document.querySelector('.task-cont')
    let taskAreaCont = document.querySelector('.textArea-cont')

    let ticketCont = document.createElement('div')
    ticketCont.classList.add('ticket-cont')
    ticketCont.setAttribute('color', button.innerText)
    
    let ticketColor = document.createElement('div')
    ticketColor.classList.add(button.innerText, 'ticket-color')

    let ticketId = document.createElement('div')
    ticketId.classList.add('ticket-id')
    ticketId.innerText = taskId.value
    taskId.value = ''

    let ticketArea = document.createElement('div')
    ticketArea.classList.add('ticket-area')
    ticketArea.innerHTML = taskAreaCont.value
    taskAreaCont.value = ''

    let lockIcon = document.createElement('i')
    lockIcon.classList.add('fa-solid', 'fa-lock', 'fa-lg')
    lockIcon.id = 'lock'

    let ticketConsole = document.querySelector('.main-cont')
    ticketConsole.appendChild(ticketCont)

    ticketCont.appendChild(ticketColor)
    ticketCont.appendChild(ticketId)
    ticketCont.appendChild(ticketArea)

    ticketArea.appendChild(lockIcon)
}



const modalButtons = document.querySelectorAll('.tasks-color-cont');
modalButtons.forEach(function(button){
    button.addEventListener('click', function(){
        addTask(button)
        modal.style.display = 'none'
        addModalFlag = false
    })
})