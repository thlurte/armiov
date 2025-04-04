from fastapi.responses import RedirectResponse
from fastapi import FastAPI
from dotenv import dotenv_values
from typing import Dict
from fastapi.security import OAuth2PasswordBearer
from starlette.middleware.cors import CORSMiddleware
import time

from routers import auth, patient

app = FastAPI()
# origins = ["http://localhost:5173/"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# routers.include
app.include_router(auth.router)
app.include_router(patient.router)

config = dotenv_values(".env")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
# auth_handler = AuthHandler()

