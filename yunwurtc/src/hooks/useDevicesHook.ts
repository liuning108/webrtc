import {useEffect, useState} from "react";
import {getDevicesInfo, IDevicesInfo} from "../utils/device-testing";

const useDevicesHook = (isCheckDevices:boolean)=>{
    const [devicesInfo,setDevicesInfo] = useState<IDevicesInfo|null>(null)

    useEffect(()=>{
        getDevicesInfo().then((result)=>{
            setDevicesInfo(result)
        })
    },[])
    useEffect(()=>{
        if(isCheckDevices){
            getDevicesInfo().then((result)=>{
                setDevicesInfo(result)
            })
        }
        console.log(isCheckDevices)
    },[isCheckDevices])

    return devicesInfo
}

export  default  useDevicesHook