import {useEffect, useState} from "react";
import {rtcDetection} from "../utils/rtc-detection";

/**
 * rtc支持度检测
 *    SDK 不支持当前浏览器，就不支持， 不会根据用户设备类型建议用户使用 SDK 支持的浏览器
 */
const useCheckSystemHook = () => {
    let [checkSystem, setCheckSystem] = useState(false)

    useEffect(() => {
        rtcDetection().then(async (result) => {
                setCheckSystem(result)
            }
        )
    }, [])

    return checkSystem

}

export default useCheckSystemHook