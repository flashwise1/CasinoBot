from dotenv import load_dotenv
import os
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

# Load .env values
load_dotenv()
WEB_APP_URL = os.getenv("WEB_APP_URL")

# Initialize FastAPI app
app = FastAPI()

# Mount static folder (for JS, CSS, images, etc.)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Jinja2 templates directory (for index.html)
templates = Jinja2Templates(directory="templates")

# Main route
@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "web_app_url": WEB_APP_URL})
