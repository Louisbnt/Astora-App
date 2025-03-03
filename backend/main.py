from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router as notes_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notes_router)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API FastAPI"}

@app.get("/name/{enter_name}")
def read_name(enter_name: str):
    return {"message": f"Hello, {enter_name}!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)