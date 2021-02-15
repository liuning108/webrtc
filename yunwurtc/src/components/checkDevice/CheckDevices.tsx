import React, {FC, useState} from "react";
import {Button, Modal, Spin} from "antd";
import useDevicesHook from "../../hooks/useDevicesHook";
import DeviceInfoPanel from "./DeviceInfoPanel";
const CheckDevices: FC = () => {
    const [isCheckDevices, setIsModalVisible] = useState(false);
    let devicesInfo = useDevicesHook(isCheckDevices)
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                设备检测
            </Button>

            <Modal title="设备检测" visible={isCheckDevices} centered footer={null} onCancel={handleCancel}>
                {devicesInfo ? <DeviceInfoPanel data={devicesInfo}/> : <Spin size="large"/>}
            </Modal>
        </>
    )
}

export default CheckDevices