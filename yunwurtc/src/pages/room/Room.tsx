import {FC} from "react";
import {useGlobalCtxHook} from "../../store/GlobalStore";
import useRtcClientHooks from "../../hooks/useRtcClientHooks";
import LocalVideoView from "./LocalVideoView";
import RemoteVideoView from "./RemoteVideoView";
const  Room :FC = ()=>{
    const {state} =useGlobalCtxHook();
    const {config} = state.user  as IUserInfo
    let rtcResult =useRtcClientHooks(config)

    return (
        <div>
            ROOM
            {rtcResult}
            <LocalVideoView/>
            <RemoteVideoView/>
        </div>
    )
}

export default Room