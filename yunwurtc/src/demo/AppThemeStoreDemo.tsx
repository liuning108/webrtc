import {FC,  useContext,} from "react";
import ThemeStore, {useThemeHook} from "../store/ThemeStore";


const AppThemeStoreDemo:FC = ()=>{
    return (
        <ThemeStore>
            <Toolbar/>
        </ThemeStore>
    )
}
function Toolbar() {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}


function ThemedButton() {

    const context = useThemeHook()
    let { state,dispatch} = context

    console.log(state);
    console.log(dispatch);

    return (

        <>
            <button style={{ background: state.background, color: state.foreground }}>
                I am styled by theme context!
            </button>
            <button onClick={()=>{ dispatch({type:'light'})}}>
                light
            </button>

            <button onClick={()=>{ dispatch({type:'dark'})}}>
                dark
            </button>

        </>
    );
}

export default AppThemeStoreDemo

