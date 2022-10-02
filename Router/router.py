import json
from fastapi import APIRouter
from fastapi.templating import Jinja2Templates
from starlette.requests import Request
from Engine.database import Agent as db
from Engine.comunication import Agent as com
from Engine.translation import Agent as translater
from Engine.file import Agent as reader
from fastapi.responses import FileResponse
from Engine.npl import Agent as npl
import base64

router = APIRouter()
templates = Jinja2Templates(directory="View")

@router.get('/ping')
async def pong():
    try:
        #return await db.insert("NTRS", {"data": "teste2", "num": "14"})
        #return await db.rescue("NTRS", {})
        #return await db.edit("NTRS", {"num": "14"}, {"data": "teste3"})
        #return await db.delete("NTRS", {"num": "14"})
        #api = com(host="nasa", method="GET", endpoint="teste")
        #return api.getURL()
        #tra = translater(src="pt", dest="en")
        #return tra.translateList(["Ola mundo", "Tudo Bem", "Como vai?"])
        #return reader.getPdfText("teste2.pdf")
        #return reader.createPDF("new_teste.pdf")
        return npl.getTagsFromText()
    except Exception as exp:
        return exp.args 

@router.post('/search')
async def search(request: Request):
    body = await request.json()
    print(body)
    request = com(host="nasa", endpoint="citations/search", queryparams=npl.getTagsFromText(body), method="GET")
    return request.sendRequest()["results"]

@router.get('/ntrs/{id}')
async def search(request: Request, id):
    requestb = com(host="nasa", endpoint="citations/"+id, method="GET")
    return templates.TemplateResponse("NTRS.html", {"request": request, "data": requestb.sendRequest()})

