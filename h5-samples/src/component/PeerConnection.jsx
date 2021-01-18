import React from 'react'
import {Button} from "antd";

let localVideo
let remoteVideo
let localStream
let peerConnA
let peerConnB

class PeerConnection extends  React.Component {
    localVideoRef = React.createRef()
    remoteVideoRef = React.createRef()

    componentDidMount() {
        localVideo = this.localVideoRef.current
        remoteVideo = this.remoteVideoRef.current
        localVideo.addEventListener("loadedmetadata",()=>{
            console.log(`本地视频为: videoWidth:${localVideo.videoWidth}px,videoHeight:${localVideo.videoHeight}`)
        })
        remoteVideo.addEventListener("loadedmetadata",()=>{
            console.log(`远端视频为: videoWidth:${remoteVideo.videoWidth}px,videoHeight:${remoteVideo.videoHeight}`)
        })
        remoteVideo.addEventListener("resize",()=>{
            console.log(`远端视频为: videoWidth:${remoteVideo.videoWidth}px,videoHeight:${remoteVideo.videoHeight}`)
        })
    }

    start =async ()=>{
        console.log("获取本地流")
        try {
            const  stream = await navigator.mediaDevices.getUserMedia({
                audio:true,
                video:true,
            })
            localVideo.srcObject = stream
            localStream = stream

        }catch (e) {
            console.log("getUserMedia Error:"+e)
        }

    }

    call= async ()=>{
        console.log("开始Call")
        const videoTracks = localStream.getVideoTracks();
        const audioTracks = localStream.getAudioTracks();
        if(videoTracks.length>0){
            console.log(`使用的视频设备为:${videoTracks[0].label}`)
        }
        if(audioTracks.length>0){
            console.log(`使用的视频设备为:${audioTracks[0].label}`)
        }

       let  configuration={"iceServers":[{"urls":["turn:stun.l.liuningff.xyz"],"username":"liuning","credential":"123456"}],"iceTransportPolicy":"all","iceCandidatePoolSize":"0"}
        peerConnA = new RTCPeerConnection(configuration)
        console.log("本地的PeerConnection"+peerConnA)
        peerConnA.addEventListener("icecandidate",this.onlceCandidateA)
        peerConnA.addEventListener("iceconnectionstatechange",this.onlceStateChangeA)

        peerConnB = new RTCPeerConnection(configuration)
        console.log("远端的PeerConnection"+peerConnB)

        try {
        }catch (e){

        }
    }

    onlceStateChangeA(){
        alert("onlceStateChangeA")
    }
    onlceCandidateA = async(event)=>{
        try{
            alert(event.candidate)
        }catch (e){

        }
    }


    render() {
        return (
            <div className={"container"}>
                <h1>
                    <span>RTCPeerConnection Demo</span>
                </h1>
                <video ref={this.localVideoRef} playsInline autoPlay muted/>
                <video ref={this.remoteVideoRef}  playsInline autoPlay muted/>
                <Button onClick={this.start}>开始</Button>
                <Button onClick={this.call}>呼叫</Button>
                <Button>挂断</Button>

            </div>
        )
    }
}
export  default PeerConnection
