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
    console.log(data)
}

export {setEventDom, setValueDom, setLoadingComponent, loadNTRS, NTRS}