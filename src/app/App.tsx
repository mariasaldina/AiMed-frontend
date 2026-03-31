import { BrowserRouter } from "react-router-dom"
import UserInitializer from "./UserInitializer"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import CommonWrapper from "./CommonWrapper"
import AppRouter from "./AppRouter"
import { MantineProvider } from "@mantine/core"
import theme from "@/lib/theme"
import AuthWrapper from "./AuthWrapper"

const App = () => {
    return (
        <Provider store={store}>
            <MantineProvider theme={theme}>
                <BrowserRouter>
                    <UserInitializer>
                        <CommonWrapper>
                            <AuthWrapper>
                                <AppRouter />
                            </AuthWrapper>
                        </CommonWrapper>
                    </UserInitializer>
                </BrowserRouter>
            </MantineProvider>
        </Provider>
    )
}

export default App