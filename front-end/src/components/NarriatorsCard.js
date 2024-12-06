// Multiple Narrator samples, each pass the voice name to the Video sample componet

import SampleCard from "./SampleCard"
import Button from "./Button";
import './NarriatorsCard.css'
// React is kind. It allows us to add handlers on components even if we didnt define them 
// whenever we have multiple elements to render through loops, we give then a unique id so react can identify them 
const NarriatorsCard = ({ pass }) => {
    // I will return to this later, but I beleieve that the selection handeling must be done at here, to account for the selection of only a single element
    const narratorsInfo = [[{ name: 'Abbi', path: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/en-GB-Abbi-General-audio.wav', tag: 'en-GB-AbbiNeural', gender: 'female', icon: '   https://cdn-icons-png.flaticon.com/512/16025/16025240.png ', accent: 'British' }, { name: 'Ollie', path: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/en-GB-OllieMultilingual-General-Audio.wav', tag: 'en-GB-OllieMultilingualNeural', gender: 'male', icon: '   https://cdn-icons-png.flaticon.com/512/16025/16025240.png ', accent: 'British' }, { name: 'Olivia', path: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/en-GB-Olivia-General-audio.wav', tag: 'en-GB-OliviaNeural', gender: 'female', icon: 'https://cdn-icons-png.flaticon.com/512/16025/16025240.png ', accent: 'British' }],
    [{ name: 'Rosa', path: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/en-PH-Rosa-General-Audio.wav', tag: 'en-PH-RosaNeural', gender: 'female', icon: '    https://cdn-icons-png.flaticon.com/512/16022/16022850.png ', accent: 'Philippine' }, { name: 'Abeo', path: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/en-NG-Abeo-General-Audio.wav', tag: 'en-NG-AbeoNeural', gender: 'male', icon: '    https://cdn-icons-png.flaticon.com/512/5922/5922004.png ', accent: 'Nigerian' }, { name: 'Prabhat', path: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/en-IN-Prabhat-General-Audio.wav', tag: 'en-IN-PrabhatNeural', gender: 'female', icon: 'https://cdn-icons-png.flaticon.com/512/10597/10597864.png ', accent: 'Indian' }],
    [{ name: 'Duncan', path: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/en-AU-Duncan-General-Audio.wav', tag: 'en-AU-DuncanNeural', gender: 'male', icon: '   https://cdn-icons-png.flaticon.com/512/323/323367.png', accent: 'Austrilian' }, { name: 'Ava', path: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/en-US-AvaMultilingual-General-Audio.wav', tag: 'en-US-AvaMultilingualNeural', gender: 'female', icon: '      https://cdn-icons-png.flaticon.com/512/10576/10576632.png ', accent: 'American' }, { name: 'Emily', path: 'https://speechstudioprodpublicsa.blob.core.windows.net/ttsvoice/Masterpieces/en-IE-Emily-General-Audio.wav', tag: 'en-IE-EmilyNeural', gender: 'female', icon: '   https://cdn-icons-png.flaticon.com/512/10576/10576451.png ', accent: 'Irish' }]];
    return (
        <>
            <div className="card">
                {narratorsInfo.map((narrators, index) => (
                    
                    <div className="line" key={index}>
                        {
                            narrators.map((narrator, index) => (
                                <SampleCard handleSelection={pass} Narrator={narrator.name} Voice={narrator.path} key={index} Icon={narrator.icon} Accent={narrator.accent} Gender={narrator.gender} Tag={narrator.tag} />
                            ))
                        }
                    </div>
                ))}
            </div>
            <div className="pre-nex">
                <Button ButtonName={'previous'} Path={'/'} />
                <Button ButtonName={'next'} Path={'/Form'} />
            </div>
        </>
    )
}

// Important note, () in map with arraow function retruns a value implictly, but with {} it needs explict return 

export default NarriatorsCard;