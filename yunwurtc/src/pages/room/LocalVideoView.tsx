
import React from 'react'

const  LocalVideoView  =()=> {

        //本地小视频样式
        const small: React.CSSProperties = {
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center',
            //绝对定位
            position: 'absolute',
            //指定宽
            width: '192px',
            //指定高
            height: '108px',
            //底部
            bottom: '60px',
            //右侧
            right: '10px',
            //边框宽度
            borderWidth: '2px',
            //边框样式
            borderStyle: 'solid',
            //边框颜色
            borderColor: '#ffffff',
            //溢出隐藏
            overflow: 'hidden',
            //设置此属性可以使得视频在最上层
            zIndex: 99,
            //边框弧度
            borderRadius: '4px',
        };
        return (
            <div id={"local-video"} style={small}>

            </div>
        )
}
export default LocalVideoView