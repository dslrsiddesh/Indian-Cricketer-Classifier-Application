from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import utils.classify as util

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/classify')
async def classify(image_data: dict):
    response_data = util.classify_image(image_data['base64String'])
    return JSONResponse(content=response_data)

if __name__ == '__main__':
    print('Starting Python FastAPI Server...')
    app.run()