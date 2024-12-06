import './Upload.css';
import Button from './Button';
import { useState } from 'react';


const Upload = ({ setBook}) => {
const [fileDetails, setFileDetails] = useState('No file selected');
function manageState(key, details){
    sessionStorage.setItem(key, details);
}
    return (
        <>
            <div className="upload">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/10848/10848828.png"
                    alt="upload icon"
                    className="uploadIcon"
                />
                <p className="uploadText">Click to upload PDF files here</p>
                <input type='file' className='uploadInput' accept="application/pdf" onChange={
                    (e) => {
                        // manageState('fileName', e.target.files[0].name)
                        setFileDetails(e.target.files[0].name)    
                        setBook(e.target.files[0]);
                    }
                }></input>
                <div className='fileCard'>
                    <img src='https://cdn-icons-png.flaticon.com/512/4725/4725510.png' alt='file icon'/> 
                    <span>{fileDetails}</span>
                    {/* sessionStorage.getItem('fileDetails') */}
                </div>
            </div>

            <div className="pre-nex">
                <div></div>
                <Button ButtonName={'next'} Path={'/Narrators'} />
            </div>
        </>
    );
};

export default Upload;
