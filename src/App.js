import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Section from './components/Section';
import AWS from 'aws-sdk';
import AudioPlayer from './components/AudioPlayer';
AWS.config.update({
  accessKeyId:" ",
  secretAccessKey:" ", 
  region: " "
})
const polly = new AWS.Polly()

function App() {
  const [text, setText] = useState('');
  const [audioFile, setAudioFile] = useState();
  const convertTextToSpeech = () => {
    polly.synthesizeSpeech({
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: 'Amy'
    },
      (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          setAudioFile(data);
        }
      }
    )
  }
  return (
    <>
    <div className='container'>
      <Header />
      <Section text={text} setText={setText} convertTextToSpeech={convertTextToSpeech} />
    </div>
    <AudioPlayer audioFile={audioFile}/>
    </>
  );
}


export default App;
