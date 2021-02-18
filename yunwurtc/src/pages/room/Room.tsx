import {FC, useEffect} from "react";
import {useGlobalCtxHook} from "../../store/GlobalStore";
import RtcClient from "../../utils/RtcClient";

const  Room :FC = ()=>{
    const {state} =useGlobalCtxHook();
    const {config} = state.user  as IUserInfo
    console.log('curUser',config)
    let client = new RtcClient(config)
    client.join()
    return (
        <div>
            ROOM
        </div>
    )
}

export default Room