import {NTRS} from './dom.js'

var url = "https://nasa-bitbull.herokuapp.com/bitbull/"
//var url = "http://127.0.0.1:5016/bitbull/"

const biuldRequest = function(method, endpoint, headers, body, loadStart, loadEnd, execute)
{
    let xhr = new XMLHttpRequest();
    xhr.open(method, url+endpoint);

    for(let header of headers)
    {
        xhr.setRequestHeader(header.key, header.value);
    }

    xhr.onloadstart = () => 
    {
        if(xhr.readyState === 1)
        {
            loadStart()
        }
    }

    xhr.onloadend = () => 
    {
        if(xhr.readyState === 4)
        {
            loadEnd()
        }
    }

    xhr.onreadystatechange = () =>
    {
        if(xhr.readyState === 4)
        {
            execute()
        }
    }

    xhr.body = body;
    return xhr;
}

const sendRequest = async function(request)
{
    request.send(JSON.stringify(request.body))
}

const ping = function()
{
    let xhr = biuldRequest("GET", "ping", "headers", {"body": "teste"}, function execute(){alert(xhr.responseText)})
    sendRequest(xhr)
}


export {biuldRequest, sendRequest, ping}

