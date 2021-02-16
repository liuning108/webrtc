
import  {Result,Button} from  'antd'
import {useHistory} from "react-router-dom";
import {FC} from "react";
const  NoMatch:FC= ()=>{
    const history = useHistory()
    const goBack = ()=>{
        history.goBack()
    }
    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="非常抱歉，您访问的页面不存在."
                extra={<Button type="primary" onClick={goBack}>返回</Button>}
            />,
        </>
    )
}

export default NoMatch