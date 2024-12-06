import React, { useState } from 'react';
import './SampleCard.css'

const SampleCard = ({ Voice, Narrator, handleSelection, Icon, Accent, Gender, Tag }) => {
  // the default is play button
  const [playerIcon, setPlayerIcon] = useState('&#9654');


  // alow us to directly access the virtual dom and grab an element
  const audioRef = React.useRef(null);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlayerIcon('&#9208;');
    } else {
      audioRef.current.pause();
      setPlayerIcon('&#9654');
    }
  };

  return (
    <div className='sampleCard'
      onClick={(e) => {
        console.log('choosen narrator', Tag);
        handleSelection(Tag);
      }} >

      <div className="audioPlayer">
        {/* Ican later based on the condition raise the pause sign up when its playing to be centered */}
        {/* I need another button here to handle the selection, Once the client clicks, lower the opacity to show its been selected and set the */}
        <button onClick={togglePlay} className='playBtn'>
          <span className="playIcon" dangerouslySetInnerHTML={{ __html: playerIcon }}></span>
          <audio ref={audioRef} src={Voice}></audio>
        </button>
      </div>

      <div className='narratorDetails'>
        <h1>{Narrator}</h1>
        <p> <img src={Icon} alt='nationality icon' />
          {Accent} • {Gender}</p>
      </div>


    </div>
  );
}

export default SampleCard;

