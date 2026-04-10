import { useEffect } from "react"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"
import TypingIndicator from "@/ui/TypingIndicator"
import { Box, Center, Flex, Loader, ScrollArea } from "@mantine/core"
import { useScrollIntoView } from "@mantine/hooks"
import { useParams } from "react-router-dom"
import { useAppSelector } from "@/hooks/redux"
import { useChatMessages } from "../hooks/useChatMessages"

const Chat = () => {
    const { messages } = useAppSelector(state => state.chatMessagesReducer)
    const loading = useAppSelector(state => state.settingsReducer.loading)
    const sending =
        loading['chatMessages/sendMessage'] ||
        loading['chatMessages/findDoctors'] ||
        loading['chatMessages/inviteDoctor']

    const { chatId } = useParams()
    const parsedChatId = chatId ? Number(chatId) : null

    useChatMessages(parsedChatId)

    const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<HTMLDivElement>({
        offset: 0,
        duration: 2000
    });

    useEffect(() => {
        scrollIntoView({ alignment: 'end' })
    }, [messages, sending])

    return (
        <Flex
            h={"100%"}
            direction={"column"}
            align={'center'}
            px={{ base: 'lg', sm: '10dvh' }}
        >
            {loading['chatMessages/loadMessages'] ?
                <Center h={'100%'}><Loader /></Center> :
                <Box flex={1} mih={0} w='100%'>
                    <ScrollArea
                        h={"100%"}
                        type="auto"
                        viewportRef={scrollableRef}
                        offsetScrollbars
                    >
                        <MessageList />
                        {sending ? <Box p={{ base: 'md', sm: 'xl' }}><TypingIndicator /></Box> : <></>}

                        <div ref={targetRef} style={{ height: 1 }} />
                    </ScrollArea>
                </Box>
            }
            {parsedChatId && <MessageInput />}
        </Flex>
    )
}

export default Chat