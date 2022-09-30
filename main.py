from fastapi import FastAPI, APIRouter
from Router.router import router
from fastapi.staticfiles import StaticFiles


app = FastAPI(title='BitBull')
app.mount("/static", StaticFiles(directory="Static"), name="static")


_router = APIRouter()
_router.include_router(router, prefix='/bitbull', tags=["BITBULL - API"])

app.include_router(_router)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=5000, log_level='info', reload=True)