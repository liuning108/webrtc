
import React from 'react'

export  default class WebSocketDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '12312321'};
    }

    componentDidMount() {
        let url = 'ws://123.207.210.13/ws';
        let  c = new WebSocket(url);
        let send = (data)=>{
            let v = (new Date())+ " ==> "+data+"\n";
            this.value+=v;
            this.setState({value:this.value})
            c.send(data)

        }

        c.onmessage = (msg)=>{
            let v =(new Date())+ " <== "+msg.data+"\n"
            this.value+=v;
            this.setState({value:this.value})
        }

        c.onopen = function(){
            setInterval(function(){ send("ping") } , 1000 )
        }
    }



    render() {


         return (
             <div className={"container"}>
                 <h1>
                     <span>WebSocket Demo22</span>
                 </h1>
                 <pre>
                     {this.state.value}
                 </pre>
             </div>

         )
     }
}