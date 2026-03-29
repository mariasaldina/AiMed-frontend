import { BrowserRouter } from "react-router-dom"
import UserInitializer from "./UserInitializer"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import CommonWrapper from "./CommonWrapper"
import AppRouter from "./AppRouter"

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <UserInitializer>
                    <CommonWrapper>
                        <AppRouter />
                    </CommonWrapper>
                </UserInitializer>
            </BrowserRouter>
        </Provider>
    )
}

export default App