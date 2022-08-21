var text = document.getElementById('item')
var val = ''
var list = document.getElementById('list')
var h2 = document.querySelector('h2')

text.addEventListener('input', function (e) {
    val = text.value
    val = val[0].toUpperCase() + val.slice(1).toLowerCase()
    text.value = val
})


var List = [], id = 0
const check = "fa-circle-check"
const uncheck = "fa-circle-thin"
var linethrough = "linethrough"

document.getElementById('add-item').addEventListener('click', function () {
    addItem(val, id, false, false)
})

document.getElementById('del-item').addEventListener('click', function () {
    if (!list.innerHTML == '') {
        h2.innerHTML = "All items deleted. Nothing to do!!"
        list.innerHTML = ''
    }
    else
        alert('List is Empty!!Please add something.')
})

text.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        addItem(val, id, false, false)
        id++
    }
})


function addItem(value, id, done, trash) {
    const DONE = done ? check : uncheck
    const LINE = done ? linethrough : ""

    if (trash)
        return
    else {
        if (value != 'undefined' && value != '' && value != 'null') {
            const text = `<li class="item"><i class="fa ${DONE} correct" job="complete" id="${id}"></i><p class="text ${LINE}">${value}</p><i class="fa-solid fa-pen update" job="update" id="${id}"></i><i class="fa-solid fa-trash delete" job="delete" id="${id}"></i></li>`
            list.innerHTML += text
            List.push(
                {
                    name: value, id: id, done: false, trash: false
                }
            )
            document.getElementById('item').value = ''
            val = ''
            h2.innerHTML = "Things to do 👇"
        }
        else
            alert("Please enter something!!")
    }
}

list.addEventListener('click', function (e) {
    var ele = e.target
    var job = ele.getAttribute('job')
    if (job == 'complete')
        Complete(ele)
    else if (job == 'delete')
        Delete(ele)
    else
        Update(ele)
})

function Complete(e) {
    e.classList.toggle(check)
    e.classList.toggle(uncheck)
    e.parentNode.querySelector('.text').classList.toggle(linethrough)
    List[e.id].done = List[e.id].done ? true : false
    e.parentNode.querySelector('.update').remove()
}

function Delete(e) {
    e.parentNode.remove()
    List[e.id].trash = List[e.id].trash ? true : false
    checkList()
}

function checkList() {
    if (list.innerHTML == '') {
        alert('All items Deleted')
        h2.innerHTML = "Nothing to do!!"
        text.value = ''
        val = ''
        id = 0
    }
}

function Update(e) {
    val = e.parentNode.innerText
    text.value = val
    e.parentNode.querySelector('.correct').remove()
    e.parentNode.querySelector('.text').classList.toggle(linethrough)
    e.remove()
}
