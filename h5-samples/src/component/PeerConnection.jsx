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
            console.log(`使用的视频设备为:`,audioTracks)
        }

       let  configuration={"iceServers":[{"urls":["turn:stun.l.liuningff.xyz"],"username":"liuning","credential":"123456"}],"iceTransportPolicy":"all","iceCandidatePoolSize":"0"}
        peerConnA = new RTCPeerConnection(configuration)
        console.log("本地的PeerConnection"+peerConnA)
        peerConnA.addEventListener("icecandidate",this.onlceCandidateA)
        peerConnA.addEventListener("iceconnectionstatechange",this.onlceStateChangeA)


        peerConnB = new RTCPeerConnection(configuration)
        peerConnB.addEventListener("icecandidate",this.onlceCandidateB)
        peerConnB.addEventListener("iceconnectionstatechange",this.onlceStateChangeB)
        peerConnB.addEventListener('track',this.gotRemoteStream)
        console.log("远端的PeerConnection"+peerConnB)

        localStream.getTracks().forEach((track)=>{
            peerConnA.addTrack(track,localStream)
        })

        try {
            console.log("peerConnA创建提议Offer开始")
            const offer = await peerConnA.createOffer()
            await this.onCreateOffetSuccess(offer)
        }catch (e){
            await this.onCreateSessionDescriptionError(e)
        }


    }

    gotRemoteStream=(e)=>{
        if(remoteVideo.srcObject!==e.streams[0]){
            remoteVideo.srcObject= e.streams[0]
            console.log("开始接收远端流")
        }

        console.log("gotRemoteStream",e)
    }

    onCreateSessionDescriptionError =(error)=>{
     console.log(`创建会话描述SD错误:${error.toString()}`)
    }
    //创建Offer成功
    onCreateOffetSuccess=async (desc)=>{
        console.log(`peerConnA 创建Offer返回SDP信息:${desc.sdp}`)
        try {
            await peerConnA.setLocalDescription(desc)
            this.onSetLocalSuccess(peerConnA)

        }catch (e){
            this.onSetSessionDescriptionError(e)
        }
        console.log("peerConnB开始远端描述")
        try {
            await peerConnB.setRemoteDescription(desc)
            this.onSetRemoteSuccess(peerConnB)
        }catch (e){
            this.onSetSessionDescriptionError(e)
        }

        console.log("peerConnB开始创建应答Answer")
        try {
            const answer = await peerConnB.createAnswer()
            await  this.onCreateAnswerSuccess(answer)
        }catch (e) {
            this.onCreateSessionDescriptionError(e)
        }
    }

    onCreateAnswerSuccess=async (answer)=>{
           console.log('PeerConnB的应答Answer'+answer.sdp)
           console.log('peerConnB设置本地描述开始setLocalDescription')
           try {
               await peerConnB.setLocalDescription(answer)
               this.onSetLocalSuccess(peerConnB)
           }catch (e) {
               this.onSetSessionDescriptionError(e)
           }

           console.log('peerConnA设置远端描述开始setRemoteDescription')
           try {
               await peerConnA.setRemoteDescription(answer)
               this.onSetRemoteSuccess(peerConnA)
           } catch (e) {
               this.onSetSessionDescriptionError(e)
           }

    }

    onSetLocalSuccess=(pc)=>{
        console.log(`${this.getName(pc)} setLocalDescription`)
    }
    onSetSessionDescriptionError=(error)=>{
        console.log(`设置描述SD信息错误${error.toString()}`)
    }

    onSetRemoteSuccess=(pc)=>{
        console.log(`${this.getName(pc)} onSetRemoteSuccess`)
    }

    getName = (pc)=>{
        return (pc===peerConnA)?'peerConnA':'peerConnB'
    }

    onlceStateChangeA=(event)=>{
        console.log("onlceStateChangeA",peerConnA.iceConnectionState,event)
    }

    onlceStateChangeB=(event)=>{
        console.log("onlceStateChangeA",peerConnB.iceConnectionState,event)

    }
    onlceCandidateA = async(event)=>{
        try{
            if(event.candidate){
                await peerConnB.addIceCandidate(event.candidate)
                this.onAddIceCandidateSuccess(peerConnB)
            }
        }catch (e){
        }
    }


    onlceCandidateB = async(event)=>{
        try{
            if(event.candidate){
                await peerConnA.addIceCandidate(event.candidate)
                this.onAddIceCandidateSuccess(peerConnA)
            }
        }catch (e){

        }
    }

    onAddIceCandidateSuccess=(pc)=>{
        console.log(`${this.getName(pc)} 添加IceCandi成功`)
    }

    hangup=()=>{
        peerConnA.close()
        peerConnB.close()
        peerConnA=null
        peerConnB=null
    }


    render() {
        return (
            <div className={"container"}>
                <h1>
                    <span>RTCPeerConnection Demo22</span>
                </h1>

                <h2>本地</h2>
                <video ref={this.localVideoRef} playsInline autoPlay muted/>
                <h2>远端</h2>
                <video ref={this.remoteVideoRef}  playsInline autoPlay/>
                <Button onClick={this.start}>开始</Button>
                <Button onClick={this.call}>呼叫</Button>
                <Button onClick={this.hangup}>挂断</Button>

            </div>
        )
    }
}
export  default PeerConnection
