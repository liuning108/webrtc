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
    return {
        cameras:cameraList,
        mics:micList,
        voices:voiceList
    }

}

export  {
    getDevicesInfo
}
