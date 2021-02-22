

export interface IWebClient {
    getClient():WebSocket
    getOptions():IRtcCLientOption
}


class WebClient  implements IWebClient{
    private options:IRtcCLientOption
    private client :WebSocket
    public url :string=""
    constructor(options:IRtcCLientOption) {
        this.options = options;
        this.url=`ws://localhost/ws?userId=${options.userId}&roomId=${options.roomId}`
        this.client =new WebSocket(this.url)
        this.client.onmessage=()=>{
            console.log('3749832789')
        }
    }

    getClient():WebSocket{
        return  this.client
    }

    getOptions():IRtcCLientOption {
        return  this.options
    }



}
export default WebClient