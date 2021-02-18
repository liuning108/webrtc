import RtcClient from "../utils/RtcClient";
import {useEffect, useState} from "react";
import {LocalStream} from "trtc-js-sdk";
interface  IRtcHookResult{
    /**
     * 远端用户列表
     */
    remoteList: string[]
}

const useRtcClientHooks = (config:IRtcCLientOption)=>{
    let client = new RtcClient(config)
    const [remoteList,setRemoteList] =useState(new Array<string>())
    useEffect(()=>{
        client.join().then((localStream)=>{
            client.on('peer-join',(evt)=>{
                remoteList.push(evt.userId)
                setRemoteList([...remoteList])
            })
            client.on("peer-leave", (evt)=>{
                const newRemoteList = remoteList.filter(id => id !== evt.userId);
                setRemoteList(newRemoteList)
            })

            if(localStream){
                localStream.play("local-video")
            }
        })
    },[])

    return remoteList
}
export default useRtcClientHooks