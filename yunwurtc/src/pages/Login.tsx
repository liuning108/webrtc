import useCheckSystemHook from "../hooks/useCheckSystemHook";
import CheckDevices from "../components/checkDevice/CheckDevices";
import React from "react";


const Login = ()=>{
    let checkSystem = useCheckSystemHook();
    return (
        <>
            {
                checkSystem?<div>你的浏览器支持视频通信</div>:null
            }

            <CheckDevices/>
        </>

    )

}
export  default  Login
