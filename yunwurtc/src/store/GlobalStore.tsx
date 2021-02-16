import {createContext, Dispatch, FC, useContext, useReducer} from "react";

interface  IGlobalState{
    user: any
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
          console.log('auth loing',action)
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
    const login =async ()=>{
       return  new Promise((resolve)=>{
           setTimeout(()=>{
               if (dispatch) {
                   dispatch({type: 'login', data: {name: 'lining'}})
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