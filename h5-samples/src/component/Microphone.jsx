import  React from  'react'
import  {message} from 'antd'
class  Microphone extends  React.Component {

    constructor() {
        super();
        this.audioRef = React.createRef()
    }
    componentDidMount() {
        const constraints  ={
            audio:true,
            video:false
        }
        navigator.mediaDevices.getUserMedia(constraints).then(this.handleSuccess).catch(this.handleError)
    }

    handleSuccess = (stream)=>{
        let audio = this.audioRef.current
        const audioTracks = stream.getAudioTracks()
        console.log("Audio Dervice"+audioTracks[0].label)
        stream.onactivate=()=>{
            console.log("Stream Stop")
        }
        audio.srcObject = stream
    }

    handleError = (error)=>{
        message.error(JSON.stringify(error))
    }


    render() {
        return (
            <div className={"container"}>
                 <h1>
                     <span>Audio Demo</span>
                 </h1>
                 <audio ref={this.audioRef} controls autoPlay/>

            </div>
        )
    }
}
export  default  Microphone