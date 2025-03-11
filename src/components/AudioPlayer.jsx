import { useEffect,useRef ,useState} from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
const AudioPlayer =({audioFile})=>{
const [isPlaying, setPlaying]=useState(false);
const [currentTime,setCurrentTime] = useState(0);
const [duration, setDuration]=useState(0);
const audioRef = useRef();
const progressBarRef = useRef();
    useEffect(()=>{
        if(audioFile){
            const audioArrayBuffer = audioFile.AudioStream.buffer;
            const audioURL = URL.createObjectURL(new Blob([audioArrayBuffer],{type:"audio/mpeg"}));
            const audio = audioRef.current;
            audio.src = audioURL;
            audio.addEventListener('loaddata',()=>{
                setDuration(audio.duration);
            })
            audio.addEventListener('timeupdate',updateProgressBar);
            return()=>{
                URL.revokeObjectURL(audioURL)
            }
        }
    },[audioFile])
    const updateProgressBar=()=>{
        const audio = audioRef.current;
        const progress = (audio.currentTime/audio.duration)*100;

        setCurrentTime(audio.currentTime);
        progressBarRef.current.style.width =`${progress}%`
    }
const togglePlay = ()=>{
    const audio = audioRef.current;
    if(isPlaying){
        audio.pause();
    }else{
        audio.play();
    }
    setPlaying(!isPlaying);
}
    const downloadAudio =()=>{
        if(audioFile){
            const audioArrayBuffer = audioFile.AudioStream.buffer;
            const audioURL = URL.createObjectURL(new Blob([audioArrayBuffer],{type:"audio/mpeg"}));
            const audio = audioRef.current;
            audio.src = audioURL;
            const a = document.createElement('a');
            a.href = audioURL;
            a.download = "audio.mp3";
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(audioURL);

        }
    }
    return(
        <div className="audio-container">
            <audio ref={audioRef} />
            <div className="progress-container">
                <div
                ref={progressBarRef} 
                className="progress-bar"
                style={{width:`${(currentTime/duration)*100}%`}}
                />
            </div>
            <div>
                <button className="audio-btn" disabled = {!audioFile} onClick={()=>togglePlay()} >
                    {
                        isPlaying ? <FaCirclePause className="icon-btn"/>:<FaPlayCircle className="icon-btn" />
                    }
                </button>
                <button className="audio-btn" disabled = {!audioFile} onClick={()=> downloadAudio()}>
                    <IoMdDownload className="icon-btn" />
                </button>
            </div>
        </div>
    )
}

export default AudioPlayer;