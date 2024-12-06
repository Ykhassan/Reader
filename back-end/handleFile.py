import os
from google.oauth2 import service_account
from googleapiclient.discovery import build
from utility import timer
from googleapiclient.http import MediaFileUpload

# to authenticate my API server with google-drive server
SERVICE_ACCOUNT_FILE = r'' + os.getenv('SERVICE_ACCOUNT_FILE')

print(SERVICE_ACCOUNT_FILE)

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE,
    scopes=["https://www.googleapis.com/auth/drive"]

)
service = build('drive', 'v3', credentials=credentials)


# returned results are of dict type which is similar to JSON however they store any python objects unlike JSON

def checkClientFile(folderUrl):
    userFolderId = ''
    #
    folderId = folderUrl.split('folders/')
    folderId = folderId[1].split('?')[0]
    print(folderId)
    try:
        # list will not work when we want to find a certain id
        results = service.files().get(
            fileId=folderId,
            fields='id'
        ).execute()
        userFolderId = results
    except Exception as e:
        print(f'Error Meassge: {e}')
    return userFolderId.get('id')


def uploadAudio(folderId, filePath, fileName):
    folderName = ''
    # Max file size is 5,120 GB
    # Upload type media=file , multipart= file and metadata
    fileMetaData = {
        'name': fileName,
        'parents': [folderId],
    }
    # no need to specify the type
    media = MediaFileUpload(filePath, mimetype='audio/wav')
    try:
        upload = service.files().create(
            body=fileMetaData,
            media_body=media,
            supportsAllDrives=True
        ).execute()
        folderName = service.files().get(fileId=folderId, fields='name').execute()
    except Exception as e:
        print(f'Error Meassge: {e}')
    return folderName
