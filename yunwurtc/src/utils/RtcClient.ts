import TRTC,{
    Client,
} from 'trtc-js-sdk';


class RtcClient implements IRtcClient{
    private sdkAppId:number=0
    private userSig:string =''
    private userId:string=''
    private roomId:string =''
    private privateMapKey?:string

    private isJoined:boolean=false
    private isPublished:boolean =false

    public isAudioMuted:boolean=false
    public isVideoMuted:boolean=false

    private localStream:any = null
    private remoteStreams:any=[]

    private members = new Map();
    private volumeIntervalMap = new Map()
    private volumeLevelMap = new Map()

    private client:Client|null =null

    constructor(options :IRtcCLientOption) {
        this.sdkAppId = options.sdkAppId
        this.userId= options.userId
        this.userSig =options.userSig
        this.roomId = options.roomId
        this.privateMapKey= options.privateMapKey
        this.client =TRTC.createClient({
            mode:"rtc",
            sdkAppId:this.sdkAppId,
            userId:this.userId,
            userSig:this.userSig
        })
        console.log('client',this.client,{
            mode:"rtc",
            sdkAppId:this.sdkAppId,
            userId:this.userId,
            userSig:this.userSig
        })

        this.handleEvents()
    }

    handleEvents() {
        if (this.client === null) {
            return;
        }
        this.client.on("error", err => {
            window.location.reload()
        })

        this.client.on('client-banned', err => {
            alert('您已被踢出房间');
            window.location.reload();
        })

        this.client.on('peer-join', evt => {
          console.log("-----------")
        })

        this.client.on('peer-leave', evt => {
            alert('远端用户退房通知' + evt.userId);
        })
    }

    async join() {
        if (this.client === null || this.isJoined) {
            return;
        }
        try {
            await this.client.join({
                roomId:1000,
            })
        }catch (e){
            alert('error')
            console.log(e)
        }
        return true



    }

}

export default RtcClient