
import React from "react";
import {Button,message} from "antd";

class ScreenSharing extends React.Component {
    video = React.createRef()


    start = async  ()=>{
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({video:true})
            this.handleSuccess(stream)
        }catch (e) {
            message.error(e)

        }

    }

    handleSuccess =(stream)=>{
        const video = this.video.current
        const videoTracks = stream.getVideoTracks()
        console.log(videoTracks[0].label)
        video.srcObject = stream
    }

    render() {
        return (

            <div className={"container"}>
                <h1>
                    <span>Share Screen Demo</span>
                </h1>
                <video className={"video"} ref={this.video} autoPlay playsInline/>
                <Button className={"button"} onClick={this.start} >Start Shareing Screen</Button>
            </div>
        )
    }

}

export default  ScreenSharing