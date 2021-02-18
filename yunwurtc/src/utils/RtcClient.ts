import TRTC, {
    Callback,
    Client, ClientEventMap, LocalStream, RemoteStream,
} from 'trtc-js-sdk';

export  interface IRtcClient {
    join():void
    on<K extends keyof ClientEventMap>(event: K, handler: Callback<ClientEventMap[K]>): void;

}

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

    private localStream:LocalStream|null = null
    private remoteStreams:Array<RemoteStream> =[];

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
            userSig:this.userSig,
            useStringRoomId:true
        })
        console.log('client',this.client,{
            mode:"rtc",
            sdkAppId:this.sdkAppId,
            userId:this.userId,
            userSig:this.userSig
        })
        this.handleEvent()
    }
    handleEvent(){
        if(this.client===null)return
        let client =this.client
        client.on('stream-added',evt=>{
            const remoteStream = evt.stream;
            const id = remoteStream.getId();
            const userId = remoteStream.getUserId();
            this.members.set(userId, remoteStream);
            client.subscribe(remoteStream)
        })

        client.on('stream-subscribed',evt=>{
            const remoteStream = evt.stream;
            this.remoteStreams.push(remoteStream)
            remoteStream.play("remote-video")
        })
    }


    async join() :Promise<LocalStream|null> {
        if (this.client === null || this.isJoined) {
            return null;
        }
        try {
            await this.client.join({
                roomId:this.roomId.toString(),
            })
            this.isJoined= true

            this.localStream = TRTC.createStream({
                audio: true,
                video: true,
                userId: this.userId,
                mirror: true
            });
            await this.localStream.initialize()
            this.localStream.on("player-state-changed",evt=>{
                console.log(`local stream ${evt.type} player is ${evt.state}`);
            })
            await  this.publish()









        }catch (e){
            alert('error')
            console.log(e)
        }
        return this.localStream



    }

    async publish() {
        if(this.client===null || this.localStream===null){
            return
        }
        if (!this.isJoined) {
            console.warn('publish() - please join() firstly');
            return;
        }
        if (this.isPublished) {
            console.warn('duplicate RtcClient.publish() observed');
            return;
        }
        try {
            await this.client.publish(this.localStream);
        } catch (e) {
            console.error('failed to publish local stream ' + e);
            this.isPublished = false;
        }

        this.isPublished = true;
    }

    on<K extends keyof ClientEventMap>(event: K, handler: Callback<ClientEventMap[K]>): void {
        if(this.client===null){
            return;
        }
        this.client.on(event,handler)
    }

}

export default RtcClient