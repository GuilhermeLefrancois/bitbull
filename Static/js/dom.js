const setEventDom = function(id, nameEvent, execute)
{
    document.querySelector(id).addEventListener(nameEvent, execute);
}

const setValueDom = function(id, value)
{
    document.querySelector(id).innerText = value;
}

const setLoadingComponent = function(state)
{
    document.querySelector('#loading').style.display = state? "block" : "none";
}

const setModalComponent = function(state)
{
    document.querySelector('#modalNTRS').style.display = state? "block" : "none";
}

const createElement = function(tag, value, click)
{
    let element = document.createElement(tag)
    element.innerText = value
    element.onclick = click
    return element
}

const biuldDate = function(value)
{
    let date = new Date(value)
    return date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()
} 


var NTRS = []
const loadNTRS = function(data)
{
    let table = document.querySelector("#tableNTRS tbody")
    for(let item of JSON.parse(data))
    {
        let tr = document.createElement("tr")
        //tr.className = "table-active"
        tr.appendChild(createElement("td", item.id))
        tr.appendChild(createElement("td", item.title))
        tr.appendChild(createElement("button", "Open", () => window.location.href="/bitbull/ntrs/"+item.id))
        //tr.appendChild(createElement("td", item.center.name))
        //tr.appendChild(createElement("td", biuldDate(item.created)))
        //tr.appendChild(createElement("td", item.status))
        //tr.appendChild(createElement("td", item.stiType))

        table.appendChild(tr)
        console.log(item)
    }
    setModalComponent(true)
}

const init = function()
{
    for(let ele of document.querySelectorAll('[data-bs-dismiss="modal"]'))
    {
        ele.addEventListener('click', () => setModalComponent(false));
    }
}
init()

export {setEventDom, setValueDom, setLoadingComponent, loadNTRS, NTRS}