from fastapi.responses import RedirectResponse
from fastapi import FastAPI
from dotenv import dotenv_values
from typing import Dict
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
import time

from routers import auth

app = FastAPI()

# routers.include
app.include_router(auth.router)

config = dotenv_values(".env")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
# auth_handler = AuthHandler()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
