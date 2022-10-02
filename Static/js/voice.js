import {biuldRequest, sendRequest, ping} from './api.js'
import {setEventDom, setValueDom, setLoadingComponent, loadNTRS} from './dom.js'

if(window.SpeechRecognition || window.webkitSpeechRecognition) 
{
    var recognizer = new window.webkitSpeechRecognition();
    recognizer.continuous = true;
    recognizer.lang = 'en-US';
    var ret = "";

    recognizer.onresult = function(event)
    {
        ret += " "+event.results[event.resultIndex][0].transcript;
        console.log(event.results[event.resultIndex][0].transcript)
        console.log(event.results[event.resultIndex][0].confidence)
        if(ret.toUpperCase().indexOf("FIND") > 0)
        {
            let request = biuldRequest("POST", "search", [], ret, ()=>{setLoadingComponent(true); let btn = document.querySelector("#btn-start-record"); btn.style.backgroundColor = "#0d6efd"; document.querySelector(".spinner-grow").remove()}, ()=>setLoadingComponent(false), ()=>loadNTRS(request.response))
            sendRequest(request)
            recognizer.abort();
        }
    }

    document.querySelector("#btn-start-record").addEventListener("click", function() 
    {
        this.style.backgroundColor = "red"
        this.innerHTML += ' <div class="spinner-grow" role="status"><span class="visually-hidden"> Loading...</span></div>'
        recognizer.start();
    });

    document.onkeydown = (event) => 
    {
        if(event.code == "Enter")
        {
            try 
            {
                this.style.backgroundColor = "red"
                this.setAttribute("disabled", true)
                recognizer.start();
            } 
            catch (ex) 
            {
                alert("error: " + ex.message);
            }
        }
      }
}
else
{
    alert("Pesquisa por Voz não Habilitada")
}