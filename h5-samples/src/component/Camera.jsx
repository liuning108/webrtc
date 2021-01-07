import React from 'react'
import {Button,message}  from  'antd'

const constraints = window.constraints ={
    audio:false,
    video:true
}

class  Camera extends  React.Component {

    constructor() {
        super();

        this.myVideo = React.createRef();
    }

    openCamera= async ()=>{

        try {

            const  stream = await  navigator.mediaDevices.getUserMedia(constraints)
            this.handleSuccess(stream)

        }catch (e){
            console.log(e)
            message.error("Error。。。 ",1)

        }
    }
    handleSuccess = (stream)=>{
        const video =this.myVideo.current
        console.log(video)

        const videoTracks = stream.getVideoTracks()

        console.log("视频设备:",videoTracks[0].label)
        window.stream = stream
        video.srcObject = stream
    }
    render() {

        return (
            <div className={"container"}>
                 <h1>
                     <span>摄像头Demo</span>
                 </h1>
                 <video ref={this.myVideo}  autoPlay playsInline/>
                 <Button onClick={this.openCamera} >Open</Button>
            </div>
        )
    }
}

export  default Camera