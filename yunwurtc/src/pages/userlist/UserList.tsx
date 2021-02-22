import {FC, useEffect, useReducer, useState} from "react";
import {useGlobalCtxHook} from "../../store/GlobalStore";
import {List,Button} from 'antd'
import {
    PhoneOutlined
} from '@ant-design/icons';
import Room from "../room/Room";
interface IUser{
    name:string
    id:string
    roomId:string
}
const UserList :FC = ()=>{
    const {state} =useGlobalCtxHook();
    const {config} = state.user  as IUserInfo
    console.log(state)
    const [userlist,setUserList]=useState<IUser[]>([])
    const [room,setRoom] = useState<IRtcCLientOption|null>(null)
    useEffect(()=>{
        if(state.webClient){
            state.webClient.getClient().onmessage=(evt)=>{
                try {
                    let result = JSON.parse(evt.data)
                    if(result.type==='updateAllUserList'){
                      console.log([...result.data])
                      setUserList([...result.data])
                    }
                    if(result.type==='joinRoom'){
                        console.log(result)
                        let room ={...config}
                        setRoom(room)
                    }

                }catch (e){
                    console.log("error",e)

                }

            }
        }
    },[])

    let call=(toUser:IUser)=>{
        let option ={
           from:config.userId,
           to: toUser.id,
           roomId:toUser.roomId,
           type:"joinRoom",
        }
        if(state.webClient){
            if(config){
            state.webClient.getClient().send(JSON.stringify(option))
                let room ={...config}
                room.roomId = toUser.roomId
                setRoom(room)
            }

        }
    }






    return (
        <div>
            {room?<Room sdkAppId={room.sdkAppId} userId={room.userId} userSig={room.userSig} roomId={room.roomId}/>:
                <List bordered header={""} footer={""}>
                {
                    //迭代所有的用户
                    userlist.map((user, i) => {
                        return (
                            <List.Item key={user.id}>
                                <div className="list-item">
                                    {user.name}
                                    {user.id !== config.userId &&

                                        <Button type="link" onClick={()=>{ call(user) }}>
                                            <PhoneOutlined/>
                                        </Button>

                                    }
                                </div>
                            </List.Item>
                        )
                    })
                }
            </List>
            }
            </div>
    )
}


export default  UserList