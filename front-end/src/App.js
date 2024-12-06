import { useState } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Uplaod from './components/Upload';
import NarriatorsCard from './components/NarriatorsCard';
import Form from './components/Form';

function App() {
  const [book, setBook] = useState(null);
  const [bookTitle, setBookTitle] = useState(null);
  const [voiceType, setVoiceType] = useState(null);
  const [email, setEmail] = useState(null);
  const [drive, setDrive] = useState(null);

  function print() {
    console.log({
      book: book,
      voiceType: voiceType,
      email: email,
      drive: drive
    })
  }

  // there is a new issue now, when i upload the file, the first time it wont work only the second time (Solved, Idon't know how 😂)
  //  The last element, which is the Form, will take the convertRequest object, the setDrive and email and send the request to the server or I can use useEffect() which i think will be better and compare additional value which is the send

  function request() {
    const formData = new FormData();
    print()
    setBookTitle(book.name);
    formData.append('bookTitle', bookTitle);
    formData.append('book', book);
    formData.append('bookTitle', bookTitle)
    formData.append('voiceType', voiceType);
    formData.append('email', email);
    formData.append('drive', drive);
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => { return response.text() })
      .then(data => (console.log(data)))
      .catch(error => console.log(error.message));

  }
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Header />
        <Routes>
          <Route path='/' element={<Uplaod setBook={setBook} BookDetails={book}/>}> </Route>
          <Route path='/Narrators' element={<NarriatorsCard pass={setVoiceType} />}> </Route>
          <Route path='/Form' element={<Form Email={setEmail} Drive={setDrive} Request={request} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
