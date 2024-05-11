from typing import Annotated, Union
from datetime import datetime, timedelta

from fastapi import FastAPI, Request, Form, HTTPException, Cookie
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse

from jose import jwt, JWTError

SECRETE_KEY = "14d2534b96250549d10b7bed396969dc92105aec8175de9cac6152b16194e92b"
TOKEN_SECONDS_EXP = 20

db_users = {
    "fernando": {
        "id": 0,
        "username": "fernando", 
        "password": "123456#hash"
    }, 
    "patricio": {
        "id": 1,
        "username": "patricio", 
        "password": "654321#hash"
    }
}

app = FastAPI()

jinja2_template = Jinja2Templates(directory="templates")

def get_user(username: str, db: list):
    if username in db:
        return db[username]

def authenticate_user(password: str, password_plane: str):
    password_clean = password.split("#")[0]
    if password_plane == password_clean:
        return True
    return False

def create_token(data: list):
    data_token = data.copy()
    data_token["exp"] = datetime.utcnow() + timedelta(seconds=TOKEN_SECONDS_EXP)
    token_jwt = jwt.encode(data_token, key=SECRETE_KEY, algorithm="HS256")
    return token_jwt


@app.get("/", response_class=HTMLResponse)
def root(request: Request):
    return jinja2_template.TemplateResponse("index.html", {"request": request})


@app.get("/users/dashboard", response_class=HTMLResponse)
def dashboard(request: Request, access_token: Annotated[Union[str, None], Cookie()] = None):
    if access_token is None:
        return RedirectResponse("/", status_code=302)
    try:
        data_user = jwt.decode(access_token, key=SECRETE_KEY, algorithms=["HS256"])
        if get_user(data_user["username"], db_users) is None:
            return RedirectResponse("/", status_code=302) 
        return jinja2_template.TemplateResponse("dashboard.html", {"request": request})
    except JWTError:
        return RedirectResponse("/", status_code=302) 


@app.post("/users/login")
def login(username: Annotated[str, Form()], password: Annotated[str, Form()]):
    user_data = get_user(username, db_users)
    if user_data is None:
        raise HTTPException(
            status_code=401, 
            detail="No Authorization"
        )
    if not authenticate_user(user_data["password"], password):
        raise HTTPException(
            status_code=401, 
            detail="No Authorization"
        )
    token = create_token({"username": user_data["username"]})
    return RedirectResponse(
        "/users/dashboard", 
        status_code=302,
        headers={"set-cookie": f"access_token={token}; Max-Age={TOKEN_SECONDS_EXP}"}
        )

@app.post("/users/logout")
def logout():
    return RedirectResponse("/", status_code=302,
            headers={"set-cookie": "access_token=; Max-Age=0"
            } )

