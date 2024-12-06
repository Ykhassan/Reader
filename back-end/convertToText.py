# this library is used to detect the language of the text
import os

from langdetect import detect
import re
import pytesseract
from pdf2image import convert_from_path
import fitz
from pdf2image import convert_from_bytes
from functools import wraps
import time
from utility import timer
from convertToAudio import listen


# @timer
def extractText(pdfFilePath, startPage, endPage):
    # extracted text container
    extractedText = ''
    # specify the path for both pytesseract for OCR and pop_path for image conversion
    pytesseract.pytesseract.tesseract_cmd = r'' + os.getenv('PYSTESSERACT_PATH')
    pop_path = r'' + os.getenv('POP_PATH')

    with fitz.open(pdfFilePath) as pdf:
        # convert each page to
        print("starting conversion")
        images = convert_from_path(pdfFilePath, poppler_path=pop_path, first_page=startPage, last_page=endPage)
        # bytes = pdfFilePath.read()
        # print(bytes)
        # images = convert_from_bytes(bytes)
        print("endded conversion")

        imgcount = 0
        # extract text from images
        for img in images:
            imgcount += 1
            print("image: " + str(imgcount))
            text = pytesseract.image_to_string(img, lang='eng')
            # add each extracted page text to the container
            extractedText = extractedText + "\n" + text

    return extractedText
