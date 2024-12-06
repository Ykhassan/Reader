import Button from './Button'
import './Form.css'
import './Button.css'
const Form = ({ Email, Drive, Request }) => {
    return (
        <>
            <div className='form'>
                <div className='formField'>
                    <h3> Reader Account </h3>
                    <input type='text' value={'upload@reader-441219.iam.gserviceaccount.com'} disabled></input>
                </div>
                <div className='formField'>
                    <h3> Drive Folder Url </h3>
                    <input type='text' placeholder='enter your drive URL, make sure you share the folder with service account and give edit permissions'
                        onChange={(e) => {
                            console.log('drive', e.target.value);
                            Drive(e.target.value)
                        }}
                    ></input>
                </div>
                <div className='formField'>
                    <h3> Email </h3>
                    <input type='text' placeholder='enter your email address to notify you when conversion is done'
                        onChange={(e) => {
                            console.log('Email', e.target.value);
                            Email(e.target.value)
                        }}
                    ></input>
                </div>
            </div>
            <div className="pre-nex">
                <Button ButtonName={'previous'} Path={'/Narrators'} />
                <button style={{ width: '69px', height: '36.36px', fontSize: '15px', textAlign: 'center'}} className='btn' onClick={() => {
                    Request()
                }}> Send </button>
            </div>
        </>
    )
};

export default Form;