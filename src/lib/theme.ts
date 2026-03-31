import { createTheme, InputWrapper } from "@mantine/core";

const theme = createTheme({
    components: {
            InputWrapper: {
                defaultProps: {
                },
                styles: {
                    error: {
                        position: 'absolute',
                    },
                    root: {
                        position: 'relative',
                        minHeight: '100px'
                    }
                },
            },
        }
    })

export default theme