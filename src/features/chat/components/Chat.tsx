import { useRef } from "react"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"
import TypingIndicator from "@/ui/TypingIndicator"
import { Box, Center, Flex, Loader, ScrollArea } from "@mantine/core"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { loadMessagesThunk } from "../lib/chatMessagesSlice"
import { useChatMessages } from "../hooks/useChatMessages"
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll"

const Chat = () => {
    const { chatId } = useParams()
    const parsedChatId = chatId ? Number(chatId) : null

    const dispatch = useAppDispatch()
    const { hasMore } = useAppSelector(state => state.chatMessagesReducer)
    const loading = useAppSelector(state => state.settingsReducer.loading)
    const sending =
        loading['chatMessages/sendMessage'] ||
        loading['chatMessages/findDoctors'] ||
        loading['chatMessages/inviteDoctor']

    const scrollableRef = useRef<HTMLDivElement | null>(null)

    useChatMessages(parsedChatId, scrollableRef, sending)

    const { onScroll } = useInfiniteScroll(
        scrollableRef,
        Boolean(!parsedChatId || !hasMore),
        () => dispatch(loadMessagesThunk({ chatId: parsedChatId })),
        loading['chatMessages/loadMessages']
    )

    return (
        <Flex
            h={"100%"}
            direction={"column"}
            align={'center'}
            px={{ base: 'lg', sm: '10dvh' }}
        >
            <Box flex={1} mih={0} w='100%'>
                <ScrollArea
                    h={"100%"}
                    type="auto"
                    viewportRef={scrollableRef}
                    offsetScrollbars
                    onScrollCapture={onScroll}
                >
                    <div style={{ height: 1 }} />

                    {loading['chatMessages/loadMessages'] &&
                        <Box
                            pos="absolute"
                            top={10}
                            left={0}
                            right={0}
                            display="flex"
                            w="100%"
                        >
                            <Center w="100%"><Loader size="sm" /></Center>
                        </Box>}
                    <MessageList />
                    {sending ? <Box p={{ base: 'md', sm: 'xl' }}><TypingIndicator /></Box> : <></>}

                </ScrollArea>
            </Box>
            {parsedChatId && <MessageInput />}
        </Flex>
    )
}

export default Chat