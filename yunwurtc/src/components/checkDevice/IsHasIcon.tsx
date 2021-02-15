import {FC} from "react";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

export interface  IIsHasIcon {
    isHas:boolean
}
const IsHasIcon:FC<IIsHasIcon> = (props)=>{
    let {isHas} =  props
    return (
        <>
            {isHas?<CheckOutlined style={ {fontSize:'24px',color:"green"} } />: <CloseOutlined style={ {fontSize:'24px',color:"red"} } />}
        </>
    )
}

export default  IsHasIcon