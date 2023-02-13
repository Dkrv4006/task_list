;(function(){

    const itemInput = document.getElementById("item-input")
    const color = document.getElementById("color")
    const todoAddForm = document.getElementById("todo-add")
    const ul =  document.getElementById("todo-list")
    const form =  document.getElementById("form")
    const card =  document.getElementById("card")
    const lis = ul.getElementsByTagName("li")
    
    
    form.addEventListener('click' , function(){
        const todo =  document.getElementById("todo-add-item__container")
        card.style.display = "flex"
    })
    card.addEventListener('click' , function(e){
        let o = e.target.getAttribute('class')
        console.log(o);
        if(o == 'card'){

            card.style.display = "none"
        }
    })

    let arrTasks = getSavedData()

    function getSavedData(){

        let tasksData = localStorage.getItem("tasks")
        tasksData = JSON.parse(tasksData)

        return tasksData && tasksData.length ? tasksData : [
            {
                name: "task 1",
                color: '#0026ff',
                createAt: Date.now(),
                completed: false
            }
        ]

    }

    function setNewData () {
        localStorage.setItem("tasks", JSON.stringify(arrTasks))
    }

    setNewData()


    function generateLiTask(obj){
        const li = document.createElement('li')
        const p = document.createElement('p')
        const div = document.createElement('div')
        const checkButton = document.createElement("button")
        const editButton = document.createElement("i")
        const deletButton = document.createElement('i')

        div.className = "daniel"
        li.className ="todo-item"
        li.style.borderLeft = `4px solid ${obj.color}`

        checkButton.className = "button-check"
        checkButton.innerHTML = `
                <i class="fas fa-check ${obj.completed ? "" : "displayNone" }" data-action = "checkButton"></i>`
        checkButton.setAttribute("data-action", "checkButton")

        li.appendChild(div)
        li.appendChild(checkButton)

        p.className = `${obj.completed ? 'da' : 'task-name'}`
        p.textContent = obj.name
        div.appendChild(p)

        editButton.className = "fas fa-edit"
        editButton.setAttribute("data-action", "editButton")
        li.appendChild(editButton)


        const containerEdit = document.createElement("div")
        containerEdit.className = "editContainer"

        const inputEdit = document.createElement('input')
        inputEdit.setAttribute("type","text")
        inputEdit.className = "editInput"
        inputEdit.value = obj.name
        containerEdit.appendChild(inputEdit)

        // Button edita
        const containerEditButton = document.createElement("button")
        containerEditButton.className = "editButton"
        containerEditButton.textContent = "Edit"
        containerEditButton.setAttribute("data-action", "containerEditButton")
        containerEdit.appendChild(containerEditButton)
        
        // Button cancelar
        const containercancelButton = document.createElement('button')
        containercancelButton.className = 'cancelButton'
        containercancelButton.textContent = "Cancel"
        containercancelButton.setAttribute("data-action", "containercancelButton")
        containerEdit.appendChild(containercancelButton)

        li.appendChild(containerEdit)

        deletButton.className = "fas fa-trash-alt"
        deletButton.setAttribute("data-action", "deleteButton")
        li.appendChild(deletButton)



        // addEventLi(li)
        return li
    }

    function renderTasks(){
        ul.innerHTML = ''
        arrTasks.forEach(task => {
        ul.appendChild(generateLiTask(task))
        ul.style.display = "flex"            
        });
    }

    function addTask(task, colors,date){

        arrTasks.unshift({
             
            name: task,
            createAt: date,
            color: colors,
            completed: false

        })
        setNewData()

    }

    const editButton = (a) => {
        [...ul.querySelectorAll(".editContainer")].forEach( container => {
            container.removeAttribute("style")
        });
        a.style.display = "flex"
    }
    const deleteButton = (a) => {
        arrTasks.splice(a, 1)
        renderTasks()
        setNewData()

    }

    function clickedUl(e){
        const dataAction = e.target.getAttribute("data-action")

        if(!dataAction) return

        let currentLi = e.target
        console.log(currentLi);
        while(currentLi.nodeName !== "LI"){
            currentLi = currentLi.parentElement
        }


        const currentLiIndex = [...lis].indexOf(currentLi)
        

        const editContainer = currentLi.querySelector(".editContainer");

        const actions = {
            editButton: function(){
                editButton(editContainer)
            },
            deleteButton: function() {
                deleteButton(currentLiIndex)
            },

            containerEditButton: function(){
                const val = currentLi.querySelector(".editInput").value
                arrTasks[currentLiIndex].name = val
                renderTasks()
                setNewData()
            },
            containercancelButton: function(){
                const editContainer = currentLi.querySelector(".editContainer")
                editContainer.style.display = "none"
                currentLi.querySelector(".editInput").value = arrTasks[currentLiIndex].name

            },
            checkButton: function(){
                arrTasks[currentLiIndex].completed = !arrTasks[currentLiIndex].completed

                if(arrTasks[currentLiIndex].completed){
                    currentLi.querySelector(".fa-check").classList.remove("displayNone")
                    
                }else{
                    currentLi.querySelector(".fa-check").classList.add("displayNone")
                    
                }

                setNewData()
                renderTasks()

            } 
        }

        if (actions[dataAction]){
            actions[dataAction]()
        }


    }

    todoAddForm.addEventListener("submit", function(e){
        e.preventDefault()
        let task = itemInput.value
        let colors = color.value
        if(task === ""){

            alert("Escreva uma tarefa")
            
        }else{
            let newdate = new Date()
            let date = newdate.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              });

          
            addTask(task, colors, date)
            renderTasks()
            card.style.display = "none"
            itemInput.value = ''
            itemInput.focus()
        }
    });


    ul.addEventListener("click", clickedUl)


    renderTasks()

})()
