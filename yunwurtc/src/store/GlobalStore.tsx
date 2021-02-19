import {createContext, Dispatch, FC, useContext, useReducer} from "react";
import genTestUserSig from '../utils/genTestUserSig'
import RtcClient from "../utils/RtcClient";

interface  IGlobalState{
    user: IUserInfo|null
}
interface IGlobalProvider {
    state:IGlobalState,
    dispatch?:Dispatch<IAction>
}

const initState:IGlobalState={
   user:null
}


const reducer = (state:IGlobalState,action:IAction)=>{
    switch (action.type){
        case 'login':
          return  {
              user:action.data
          }
        default:
            return state
    }
}

const GlobalContext = createContext<IGlobalProvider>({state:initState})
const GlobalStore:FC =({children})=>{
     let [state,dispatch] = useReducer(reducer,initState)
    return (
        <GlobalContext.Provider value={{state,dispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}
const useGlobalCtxHook=()=>{
    let {state,dispatch} = useContext(GlobalContext)
    const login =async (values:any)=>{
        let {username,roomId} = values


       return  new Promise( (resolve)=>{
           setTimeout(async ()=>{
               let {sdkAppId,userSig} =await genTestUserSig(username)
               let config:IRtcCLientOption ={
                   userSig:userSig,
                   userId:username,
                   sdkAppId,
                   roomId
               }

               if (dispatch) {
                   dispatch({type: 'login', data: {config}})
               }
               resolve(true)
           },200)
        })
    }

    return {
        state,
        login
    }
}

export  {
    useGlobalCtxHook
}

export default  GlobalStore