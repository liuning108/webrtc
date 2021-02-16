import  {
    getCameras,
    getMicrophones,
    getSpeakers
} from 'trtc-js-sdk';


export interface  IDevicesInfo  {
    //摄像头
    cameras:MediaDeviceInfo[],
    //麦克风
    mics:MediaDeviceInfo[],
    //扬声器
    voices:MediaDeviceInfo[],

    isHasALL:boolean

}

/**
 *  获取设备信息及网络连接信息
 */
const  getDevicesInfo = async ():Promise<IDevicesInfo>=>{
    let cameraList = await getCameras();
    let micList = await  getMicrophones();
    let voiceList = await getSpeakers();
    console.log("摄像头",cameraList)
    console.log("麦克风",micList)
    console.log("扬声器",voiceList)
    let isHasCameras = cameraList.length>0;
    let isHasMics= micList.length>0;
    let isHasVoices= voiceList.length>0
    return {
        cameras:cameraList,
        mics:micList,
        voices:voiceList,
        isHasALL: isHasCameras&&isHasMics&&isHasVoices
    }

}

export  {
    getDevicesInfo
}
