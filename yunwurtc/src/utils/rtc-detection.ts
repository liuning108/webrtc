import  {checkSystemRequirements} from 'trtc-js-sdk';


/**
 * rtc支持度检测
 *    SDK 不支持当前浏览器，就不支持， 不会根据用户设备类型建议用户使用 SDK 支持的浏览器
 */
const rtcDetection  = async  ()=>{
    let checkResult =  await checkSystemRequirements()
    console.log('checkResult', checkResult.result, 'checkDetail', checkResult.detail);
    return checkResult.result
}

export  {
    rtcDetection
}