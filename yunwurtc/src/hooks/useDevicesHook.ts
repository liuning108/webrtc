import {Dispatch, useEffect, useState} from "react";
import {getDevicesInfo, IDevicesInfo} from "../utils/device-testing";

const useDevicesHook = ():[ (IDevicesInfo|null),boolean,Dispatch<boolean>]=>{
    const [devicesInfo,setDevicesInfo] = useState<IDevicesInfo|null>(null)
    const [isCheckDevices, setIsModalVisible] = useState(false);
    useEffect(()=>{
        getDevicesInfo().then((result)=>{
            setDevicesInfo(result)
            if(!result.isHasALL){
                setIsModalVisible(true)
            }
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

    return [devicesInfo,isCheckDevices,setIsModalVisible]
}

export  default  useDevicesHook