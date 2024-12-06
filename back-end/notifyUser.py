import base64
from googleapiclient.discovery import build
from email.mime.text import MIMEText
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from utility import timer
import os


@timer
def notifyUser(email, bookName, folerName):
    load_dotenv()

    # Manually Generated from consent screen
    CLIENT_ID = os.getenv('CLIENT_ID')
    CLIENT_SECRET = os.getenv('CLIENT_SECRET')
    ACESS_KEY = os.getenv('ACESS_KEY')
    # Manual credential creation
    credentials = Credentials(
        None,
        refresh_token=ACESS_KEY,
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        token_uri='https://oauth2.googleapis.com/token'
    )
    # creates new access token
    credentials.refresh(Request())
    print(credentials.expiry)
    service = build("gmail", "v1", credentials=credentials)

    # Use a MultipartMIME for attaching image to the client
    message = MIMEText(f"Reader has Converted {bookName} to Audio, see your drive folder {folerName}!!!")
    message['To'] = email
    message['Subject'] = "I know, It's about damn time!!!"

    rawMessage = base64.urlsafe_b64encode(message.as_bytes()).decode("utf-8")
    service.users().messages().send(userId='me', body={'raw': rawMessage}).execute()
