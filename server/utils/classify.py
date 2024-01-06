import cv2
import numpy as np
import base64
import joblib
from utils.wavelet import wavelet_transform
import matplotlib.pyplot as plt

label_encoder = None
model = None

# function to classify image
def classify_image(base64_string, path = None):
    print('Classifying Image...')
    global label_encoder, model

    images = get_cropped_images(path, base64_string)
    if type(images) == str:
        return [{'error': images}]
    
    result = []
    for image in images:
        transformed_img = wavelet_transform(image, 'db1', 5)

        reshaped_sr_img = np.reshape(cv2.resize(image, (32, 32)), (32*32*3, 1))
        reshaped_st_img = np.reshape(cv2.resize(transformed_img, (32, 32)), (32*32, 1))

        combined_img = np.vstack((reshaped_sr_img, reshaped_st_img))

        final_img = combined_img.reshape(1, 32*32*3 + 32*32).astype(float)

        load_artifacts()

        probabilities = np.round(model.predict_proba(final_img)*100, 2)[0].tolist()
        classes = label_encoder.classes_.tolist()
        classes = [x.title().replace('_', ' ') for x in classes]

        class_probabilities = []
        for p, c in zip(probabilities, classes):
            class_probabilities.append((p, c))
        class_probabilities.sort(reverse=True)

        result.append({
            'class': label_encoder.inverse_transform(model.predict(final_img))[0],
            'class_probabilities': class_probabilities,
            'error': None
        })
    return result

# function to get cropped images
def get_cropped_images(path: str, base64_image):
    face_cascade = cv2.CascadeClassifier('./utils/haarcascades/haarcascade_frontalface_default.xml')
    eye_cascade = cv2.CascadeClassifier('./utils/haarcascades/haarcascade_eye.xml')

    if path:
        img = cv2.imread(path)
    else:
        img = get_cv2_image(base64_image)

    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray_img, 1.25, 6)
    if len(faces) == 0:
        return 'Please check the image, Classifier was not able to detect Face properly'
    else:
        faces_images = []
        for (x, y, w, h) in faces:
            roi_gray = gray_img[y:y+h, x:x+w]
            roi_color = img[y:y+h, x:x+w]
            eyes = eye_cascade.detectMultiScale(roi_gray)
            if len(eyes) >= 1:
                faces_images.append(roi_color)
            else:
                return 'Please check the image, Classifier was not able to detect Eyes properly'
        if len(faces_images) != 0:
            return faces_images
    return None

# function to convert base64 string to cv2 image
def get_cv2_image(base64_string):
    encoded_data = base64_string.split(',')[1]
    # print(encoded_data)
    np_array = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    plt.imshow(img)
    return img

# function to get base64 encoded image
def get_base64_encoded_image(image_path):
    with open(image_path) as f:
        return f.read()

# function to load model and label encoder
def load_artifacts():
    global label_encoder, model

    with open('./artifacts/label_encoder.pkl', 'rb') as f:
        label_encoder = joblib.load(f)
    
    with open('./artifacts/model.pkl', 'rb') as f:
        model = joblib.load(f)
    
if __name__ == '__main__':
    load_artifacts()