import { Box, ScrollArea } from "@mantine/core"
import { Outlet } from "react-router-dom"

function PaddedWrapper() {
    return (
        <ScrollArea
            mih={0}
            h={"100%"}
            type="auto"
            offsetScrollbars
        >
            <Box
                px={{ base: 'md', sm: '20%' }}
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0
                }}
                h={'100%'}
            >
                <Outlet />
            </Box>
        </ScrollArea>
    )
}

export default PaddedWrapper