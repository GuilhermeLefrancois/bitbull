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
        if(ret.toUpperCase().indexOf("ABORT") > 0)
        {
            let btn = document.querySelector("#btn-start-record"); 
            btn.style.backgroundColor = "#0d6efd"; 
            document.querySelector(".spinner-grow").remove()
            //document.getElementById("btn-start-record").setAttribute("disabled", false)
            recognizer.abort();
        }
    }

    document.querySelector("#btn-start-record").addEventListener("click", async function() 
    {
        this.style.backgroundColor = "red"
        document.getElementById("btn-start-record").innerHTML += ' <div class="spinner-grow" role="status"><span class="visually-hidden"> Loading...</span></div>'
        //document.getElementById("btn-start-record").setAttribute("disabled", true)
        recognizer.start();
        document.getElementById("alert-info-index").style.display = "flex"
        await new Promise(r => setTimeout(r, 4000));
        document.getElementById("alert-info-index").style.display = "none"
    });

    document.onkeydown = async function(event) 
    {
        if(event.code == "Enter")
        {
            try 
            {
                document.getElementById("btn-start-record").style.backgroundColor = "red"
                document.getElementById("btn-start-record").innerHTML += ' <div class="spinner-grow" role="status"><span class="visually-hidden"> Loading...</span></div>'
                //document.getElementById("btn-start-record").setAttribute("disabled", true)
                recognizer.start();
                document.getElementById("alert-info-index").style.display = "flex"
                await new Promise(r => setTimeout(r, 10000));
                document.getElementById("alert-info-index").style.display = "none"
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