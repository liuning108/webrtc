import React, {FC} from "react";
import CheckDevices from "../../components/checkDevice/CheckDevices";
import {useGlobalCtxHook} from "../../store/GlobalStore";
import {useHistory, useLocation} from "react-router-dom";
import {Button, Col, Form, Input, Row} from 'antd'

const LoLoginForm: FC = () => {
    const globalCtx = useGlobalCtxHook();
    const history = useHistory();
    const location = useLocation<any>();
    let {from} = location.state || {from: {pathname: "/"}};
    let login = async () => {
        await globalCtx.login()
        history.replace(from);
    };



    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={'layout-center flex-column mt40'}>
            <div className={'layout-center'}><h1>云雾</h1></div>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{
                    width: "360px",
                    height: "100%",
                }}
            >

                <Form.Item
                    name="username"
                    rules={[{required: true, message: '请输入用户名'}]}
                >
                    <Input placeholder={"请输入用户名"}/>
                </Form.Item>


                <Form.Item

                    name="roomId"
                    rules={[{required: true, message: '请输入房间号'}]}
                    initialValue={1000}
                >
                    <Input placeholder={"请输入房间号"}/>
                </Form.Item>


                <Form.Item >
                    <Button type="primary" htmlType="submit" className={'full-width'}>
                        登录
                    </Button>
                </Form.Item>
                <Form.Item>
                    <CheckDevices/>
                </Form.Item>

            </Form>

        </div>


    )
}
export default LoLoginForm
