import cv2
import numpy as np
import pywt

# function to transform image using wavelet transform to extract features
def wavelet_transform(image, mode='haar', level=1):
    gray_img = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    normalized_img = np.float32(gray_img) / 255.0

    coefficients = pywt.wavedec2(normalized_img, mode, level=level)
    modified_coefficients = list(coefficients)
    modified_coefficients[0] *= 0

    reconstructed_img = pywt.waverec2(modified_coefficients, mode)
    final_img = np.uint8(reconstructed_img * 255.0)

    return final_img