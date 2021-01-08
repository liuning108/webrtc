import React from "react";
import {Button} from "antd";
import "../canvas.css"
let video;
class  TakeSnap extends  React.Component {

    constructor() {
        super();
        this.video  = React.createRef()
        this.canvas = React.createRef()

    }

    componentDidMount() {
        video = this.video.current
        const constrains = {
            audio:false,
            video:true
        }
        navigator.mediaDevices.getUserMedia(constrains)
            .then(this.handleSuccess)
            .catch(this.handleError)
    }

    handleSuccess=(stream)=>{
        window.stream = stream
        video.srcObject = stream
    }
    handleError(error){
        console.log(error.message,error.name,video)
    }


    takeSnap = async ()=>{
        let canvas = this.canvas.current
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height)
    }

    render() {
        return (
            <div className={"container"}>
                <h1>
                    <span>take snap demo</span>
                </h1>
                <video ref={this.video} className={"small-video"} playsInline autoPlay/>
                <canvas className={"small-canvas"} ref={this.canvas}/>
                <Button className={"button"} onClick={this.takeSnap}  >Take Snap</Button>
            </div>
        )
    }
}

export default TakeSnap

