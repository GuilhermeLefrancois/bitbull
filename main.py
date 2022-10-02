from fastapi import FastAPI, APIRouter
from Router.router import router
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.requests import Request


app = FastAPI(title='BitBull')
app.mount("/static", StaticFiles(directory="Static"), name="static")
templates = Jinja2Templates(directory="View")

_router = APIRouter()

@_router.get("/")
def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

_router.include_router(router, prefix='/bitbull', tags=["BITBULL - API"])
app.include_router(_router)


if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=5016, log_level='info', reload=True)