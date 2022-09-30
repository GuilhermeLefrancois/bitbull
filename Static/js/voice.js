import {biuldRequest, sendRequest, ping} from './api.js'
import {setEventDom, setValueDom, setLoadingComponent, loadNTRS} from './dom.js'

if(window.SpeechRecognition || window.webkitSpeechRecognition) 
{
    var recognizer = new window.webkitSpeechRecognition();
    recognizer.continuous = true;
    
    recognizer.onresult = function(event)
    {
        var ret = "";
        ret += " "+event.results[event.resultIndex][0].transcript;
        console.log(ret)
        //console.log(event.results[event.resultIndex][0].transcript)
        //console.log(event.results[event.resultIndex][0].confidence)
        if(ret.indexOf("Shazam") > 0)
        {
            let request = biuldRequest("POST", "teste", [], ret, ()=>setLoadingComponent(true), ()=>setLoadingComponent(false), ()=>loadNTRS(request.response))
            sendRequest(request)
            recognizer.abort();
        }
    }

    document.querySelector("#btn-start-record").addEventListener("click", function() 
    {
        try 
        {
            recognizer.start();
        } 
        catch (ex) 
        {
            alert("error: " + ex.message);
        }
    });
}
else
{
    alert("Pesquisa por Voz não Habilitada")
}