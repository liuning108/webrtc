import React, { Component } from 'react'
/**
 * 远端视频组件
 */
export default class RemoteVideoView extends Component {
    //组件加载完成
    myVideo = React.createRef()
    componentDidMount = () => {
        //获取到视频对象
        let video = this.myVideo.current
        //指定视频的源为stream
        video.srcObject = this.props.stream;
        //当获取到MetaData数据后开始播放
        video.onloadedmetadata = (e) => {
            video.play();
        };
    }

    render() {
        //视频容器样式
        const style = {
            //绝对定位
            position: 'absolute',
            //上下左右为0px表示撑满整个容器
            left: '0px',
            right: '0px',
            top:'0px',
            bottom: '0px',
            //背景色
            backgroundColor: '#323232',
            //远端大视频放在底部
            zIndex: 0,
        }

        return (
            <div key={this.props.id} style={style}>
                {/* 设置ref及id值 视频自动播放 */}
                <video ref={this.myVideo} id={this.props.id}
                       autoPlay playsInline
                       style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
        )
    }
}
