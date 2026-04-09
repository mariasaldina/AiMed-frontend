import { createTheme } from "@mantine/core";

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
    },
    fontFamily: 'Manrope, sans-serif',
    fontFamilyMonospace: 'IBM Plex Mono, monospace',
    headings: {
        fontFamily: 'Manrope, sans-serif',
        sizes: {
            h1: { fontSize: '32px', lineHeight: '1.3' },
            h2: { fontSize: '24px', lineHeight: '1.35' },
            h3: { fontSize: '20px', lineHeight: '1.4' }
        }
    },
    primaryColor: 'indigo'
})

export default theme