import {FC} from "react";
import {useGlobalCtxHook} from "../../store/GlobalStore";
import useRtcClientHooks from "../../hooks/useRtcClientHooks";
import LocalVideoView from "./LocalVideoView";
import RemoteVideoView from "./RemoteVideoView";
const  Room :FC<IRtcCLientOption> = (config)=>{
    let rtcResult =useRtcClientHooks(config)
    return (
        <div>
            <LocalVideoView/>
            <RemoteVideoView/>
        </div>
    )
}

export default Room