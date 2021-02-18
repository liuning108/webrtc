import React, { FC } from 'react'
/**
 * 远端视频组件
 */
const RemoteVideoView:FC =()=> {

    //视频容器样式
    const style: React.CSSProperties = {
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
        <div id={'remote-video'} style={style}>
        </div>
    )
}
export  default RemoteVideoView
