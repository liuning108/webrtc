import useCheckSystemHook from "../../hooks/useCheckSystemHook";
import CheckDevices from "../../components/checkDevice/CheckDevices";
import React, {FC} from "react";
import {useLocation,useHistory} from 'react-router-dom'
import {Button} from "antd";
import {useGlobalCtxHook} from "../../store/GlobalStore";

const Login:FC = ()=>{
    const globalCtx = useGlobalCtxHook();
    const history = useHistory();
    const location = useLocation<any>();
    let checkSystem = useCheckSystemHook();
    let { from } = location.state || { from: { pathname: "/" } };
    let login = async () => {
        await globalCtx.login()
        history.replace(from);
    };
    return (
        <>
            {
                checkSystem?<div>你的浏览器支持视频通信</div>:null
            }

            <CheckDevices/>
            <Button onClick={login}>login</Button>
        </>

    )

}
export  default  Login
