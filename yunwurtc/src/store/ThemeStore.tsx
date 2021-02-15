import {createContext, Dispatch, FC, useReducer} from "react";


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
export const ThememContext = createContext<IThemeProvider>({
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

export default ThemeStore