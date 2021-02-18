/// <reference types="react-scripts" />




interface IAction {
    type:string
    data?:any
}

interface IRtcCLientOption {
    sdkAppId:number
    userId :string
    userSig:string
    roomId:string
    privateMapKey?:string

}
interface IUserInfo {
    config:IRtcCLientOption
}
