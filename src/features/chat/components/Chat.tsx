import { useEffect } from "react"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"
import Loader from "@/ui/loader/Loader"
import TypingIndicator from "@/ui/typingIndicator/TypingIndicator"
import { Box, Center, Flex, ScrollArea } from "@mantine/core"
import useChat from "../hooks/useChat"
import { useScrollIntoView } from "@mantine/hooks"

interface ChatProps {
    chatId: number
}

const Chat: React.FC<ChatProps> = ({ chatId }) => {
    const {
        messages,
        messageListLoading,
        messageSending,
        inputValue,
        setInputValue,
        handleSend,
        findDoctors,
        getContacts
    } = useChat(chatId)

    const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<HTMLDivElement>({
        offset: 0,
        duration: 2000
    });

    useEffect(() => {
        scrollIntoView({ alignment: 'end' })
    }, [messages, messageSending])

    return (
        <Flex h={"100%"} direction={"column"}>
            {messageListLoading ?
                <Center><Loader size={50} /></Center> :
                <Box flex={1} mih={0}>
                    <ScrollArea
                        h={"100%"}
                        type="auto"
                        viewportRef={scrollableRef}
                        offsetScrollbars
                    >
                        <MessageList
                            messages={messages}
                            getContacts={getContacts}
                        />
                        {messageSending ? <TypingIndicator /> : <></>}

                        <div ref={targetRef} style={{ height: 1 }} />
                    </ScrollArea>
                </Box>
            }
            <Box>
                <MessageInput
                    value={inputValue}
                    onChange={setInputValue}
                    onSend={handleSend}
                    findDoctors={findDoctors}
                    disabled={messageSending}
                />
            </Box>
        </Flex>
    )
}

export default Chat