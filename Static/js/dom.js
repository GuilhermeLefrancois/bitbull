import {biuldRequest, sendRequest, ping} from './api.js'

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

const createElement = function(tag, value, click, css)
{
    let element = document.createElement(tag)
    element.innerText = value
    element.onclick = click
    for (let classe of css)
    {
        element.classList.add(classe)
    }
    
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
    console.log(JSON.parse(data))
    
    let table = document.querySelector("#tableNTRS tbody")
    for(let item of JSON.parse(data))
    {
        let tr = document.createElement("tr")
        tr.onclick = () => {window.open("/bitbull/ntrs/"+item.id, "_blank")}
        tr.appendChild(createElement("td", item.id, ()=>{}, ["table-ntrs-text"]))
        tr.appendChild(createElement("td", item.title, ()=>{}, ["table-ntrs-text"]))
        //tr.appendChild(createElement("button", "OPEN", () => window.open("/bitbull/ntrs/"+item.id, "_blank"), ["btn-table"]))
        table.appendChild(tr)
        
    }
    
    for(let ele of document.getElementsByTagName("br"))
    {
        ele.remove()
    }

    setModalComponent(true)
}

const init = function()
{
    for(let ele of document.querySelectorAll('[data-bs-dismiss="modal"]'))
    {
        ele.addEventListener('click', () => setModalComponent(false));
    }

    for(let ele of document.querySelectorAll('[data-btn-action="openModal"]'))
    {
        ele.addEventListener('click', () => 
        {
            window.open("https://ntrs.nasa.gov/"+ele.getAttribute("data-download"),"_blank")
        });
    }

    document.getElementById("btn-search").onclick=()=>
    {
        let request = biuldRequest("POST", "search", [], document.getElementById("text-search").value, ()=>setLoadingComponent(true), ()=>setLoadingComponent(false), ()=>loadNTRS(request.response))
        sendRequest(request)
    }
}
init()

export {setEventDom, setValueDom, setLoadingComponent, loadNTRS, NTRS}