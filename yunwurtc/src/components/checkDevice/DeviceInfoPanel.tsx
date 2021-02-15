import {FC} from "react";
import {Row,Col} from 'antd'
import {
    VideoCameraOutlined,
    AudioOutlined,
    CheckOutlined,
    FilterOutlined,
    CloseOutlined
} from '@ant-design/icons'
import {IDevicesInfo} from "../../utils/device-testing";
import IsHasIcon from "./IsHasIcon";

export interface IDeviceInfoPanel  {
    data:IDevicesInfo
}


const DeviceInfoPanel:FC<IDeviceInfoPanel> = (props)=>{

    let {cameras,mics,voices} = props.data
    let isHasCameras = cameras.length>0;
    let isHasMics= mics.length>0;
    let isHasVoices= voices.length>0

    return (
     <>
         <Row justify={"center"} align={"middle"}>
             <Col  span={8}>
                 <Row justify={"center"} align={"middle"}>
                     <Row>
                         <Col span={24}>
                             <VideoCameraOutlined style={ {fontSize:'24px'} }/>
                         </Col>
                         <Col span={24}>
                             <IsHasIcon isHas={isHasCameras} />
                         </Col>
                     </Row>

                 </Row>
             </Col>
             <Col span={8}>
                 <Row justify={"center"} align={"middle"}>
                     <Row>
                         <Col span={24}>
                             <AudioOutlined style={ {fontSize:'24px'}}/>
                         </Col>
                         <Col span={24}>
                             <IsHasIcon isHas={isHasMics} />
                         </Col>
                     </Row>
                 </Row>

             </Col>
             <Col span={8}>
                 <Row justify={"center"} align={"middle"}>
                     <Row>
                         <Col span={24}>
                             <FilterOutlined rotate={90} style={ {fontSize:'24px'} } />
                         </Col>
                         <Col span={24}>
                             <IsHasIcon isHas={isHasVoices} />
                         </Col>
                     </Row>
                 </Row>
             </Col>
         </Row>

     </>
    )

}
export  default  DeviceInfoPanel