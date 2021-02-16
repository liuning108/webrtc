import {createContext, Dispatch, FC, useContext, useReducer} from "react";


interface IThemeState {
    foreground: string
    background: string
}

interface IThemeDispatch {
    type: string
    data?: any
}

interface IThemeProvider {
    state: IThemeState,
    dispatch: Dispatch<IThemeDispatch>
}

const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    },
};

const reducer = (state: IThemeState, action: IThemeDispatch) => {
    switch (action.type) {
        case 'light':
            const newState = themes.light
            return newState
        case 'dark':
            return themes.dark
        default:
            return state
    }
}
const ThememContext = createContext<IThemeProvider>({
    state: themes.light, dispatch: () => {
    }
})
const ThemeStore: FC = ({children}) => {

    const [state, dispatch] = useReducer(reducer, themes.dark);
    return (
        <ThememContext.Provider value={{state, dispatch}}>
            {children}
        </ThememContext.Provider>
    )
}
const useThemeHook = ()=>{
    return useContext(ThememContext)
}
export  {
    useThemeHook
}
export default ThemeStore