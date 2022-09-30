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

var NTRS = []
const loadNTRS = function(data)
{
    NTRS = JSON.parse(data)
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ntrs.nasa.gov"+NTRS[0].downloads[0].links.pdf);
    xhr.onreadystatechange = () =>
    {
        if(xhr.readyState === 4)
        {
            window.open(xhr.response)
        }
    }
    xhr.send()
}

export {setEventDom, setValueDom, setLoadingComponent, loadNTRS, NTRS}