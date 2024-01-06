from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse
import utils.classify as util

app = FastAPI()

@app.route('/classify_image', methods=['GET', 'POST'])
async def classify_image(image_data: str = Form(...)):
    response = JSONResponse(util.classify_image(image_data))
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == '__main__':
    print('Starting Python FastAPI Server...')
    util.load_artifacts()
    app.run()