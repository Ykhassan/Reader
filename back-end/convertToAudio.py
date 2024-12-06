from dotenv import load_dotenv
import os
import azure.cognitiveservices.speech as speechsdk


# Limitations
# max audio length generated from a single request = 10min
# max character length per request = 5000char
# SSML (Speech Synthesis Markup Language) fine tune the synthesised speech through params like speed, emotions in XML
# IBM Tone analyzer => provides insight into text tone. Used to identify customers tone through texts. XML+Tone Analyzer
# Limitations of IBM Tone analyzer, It doesn't provide analysis for inappropriate language (Context is important here!!
def listen(text, voiceName, fileName):
    load_dotenv()
    speechConfig = speechsdk.SpeechConfig(subscription=os.getenv('AZURE_TTS_SUBSCRIPTION_KEY'),
                                          region=os.getenv('AZURE_SERVICE_REGION'))
    fileConfig = speechsdk.audio.AudioOutputConfig(filename=fileName)
    speechConfig.speech_synthesis_voice_name = voiceName
    speechSynthesizer = speechsdk.SpeechSynthesizer(speech_config=speechConfig, audio_config=fileConfig)

    result = speechSynthesizer.speak_text_async(text).get()

    # Check result
    if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
        print("Speech synthesized for text [{}], and the audio was saved to [{}]".format(text, fileName))
    elif result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = result.cancellation_details
        print("Speech synthesis canceled: {}".format(cancellation_details.reason))
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            print("Error details: {}".format(cancellation_details.error_details))
