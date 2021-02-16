import React, {FC} from "react";
import useCheckSystemHook from "../../hooks/useCheckSystemHook";
import {Alert} from "antd";


const  CheckSystemTip:FC =()=>{
    let checkSystem = useCheckSystemHook();
    return checkSystem?null:<Alert message="你的浏览器不支持视频通信" type="error" showIcon  closable={true} />
}

export default  CheckSystemTip