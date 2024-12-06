import os.path

from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
from convertToAudio import listen
from convertToText import extractText
from notifyUser import notifyUser
from handleFile import checkClientFile, uploadAudio

# from Db import dataBase

app = Flask(__name__)

CORS(app)

# app.config sets the general configurations the api server uses such as debugging mode, DB settings etc...
app.config["DEBUG"] = True
app.config["UPLOADSFOLDER"] = "./Uploads"
app.config['AUDIOFOLDER'] = './Audio'


# we can also load configuration from a file
# app.config.from_pyfile("config.py")


# request.form (reads all form data besides files)
# request.files (reads file content)

@app.route("/upload", methods=['POST'])
def uploadBook():
    print("received request")
    file = request.files.get('book')
    bookTitle = request.form.get('bookTitle')
    filename = secure_filename(file.filename)
    filePath = os.path.join(app.config["UPLOADSFOLDER"], filename)
    file.save(filePath)

    # ass the created file to extract text
    content = extractText(filePath, startPage=1, endPage=1)
    print(content)
    listen(content, request.form.get('voiceType'), f'./Audio/{bookTitle}.wav')

    # upload file
    driveUrl = request.form.get('drive')
    print(driveUrl)
    driveId = checkClientFile(driveUrl)
    upload = uploadAudio(driveId, f'./Audio/{bookTitle}.wav', f'{bookTitle}.wav')

    # Notify user
    email = request.form.get('email')
    notifyUser(email, bookTitle, upload.get('name'))
    # delete the file after converting it to sound
    os.remove(filePath)
    os.remove(f'./Audio/{bookTitle}.wav')

    print(file, driveUrl, bookTitle, email)

    return "finshed", 200


@app.route("/health")
def helthCheck():
    return "up and running", 200


# check and run the api server when the script app.py is run directly __name__ == main if this file was imported by another file the __name__ variable will be the module/file name
if __name__ == "__main__":
    app.run()
