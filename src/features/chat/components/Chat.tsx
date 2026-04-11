import { useEffect, useRef } from "react"
import MessageList from "./MessageList"
import MessageInput from "./MessageInput"
import TypingIndicator from "@/ui/TypingIndicator"
import { Box, Center, Flex, Loader, ScrollArea } from "@mantine/core"
import { useScrollIntoView } from "@mantine/hooks"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { useChatMessages } from "../hooks/useChatMessages"
import { loadMessagesThunk, resetMessages, setMessages } from "../lib/chatMessagesSlice"
import axios from "axios"

const Chat = () => {
    const { messages, hasMore } = useAppSelector(state => state.chatMessagesReducer)
    const loading = useAppSelector(state => state.settingsReducer.loading)
    const sending =
        loading['chatMessages/sendMessage'] ||
        loading['chatMessages/findDoctors'] ||
        loading['chatMessages/inviteDoctor']

    const { chatId } = useParams()
    const parsedChatId = chatId ? Number(chatId) : null

    const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<HTMLDivElement>({
        offset: 0,
        duration: 0
    });

    // useEffect(() => {
    //     scrollIntoView({ alignment: 'end' })
    // }, [messages])


    const dispatch = useAppDispatch()
    const topRef = useRef(null)

    const hasMoreRef = useRef(hasMore)

    useEffect(() => {
        hasMoreRef.current = hasMore
    }, [hasMore])

    useEffect(() => {
        if (!parsedChatId) return

        const root = scrollableRef.current
        const target = topRef.current

        if (!root || !target) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                if (loading['chatMessages/loadMessages'] || !hasMoreRef.current) return
                dispatch(loadMessagesThunk({ chatId: parsedChatId }))
            }
        }, {
            root,
            rootMargin: '200px',
            threshold: 0
        })

        observer.observe(target)

        return () => observer.disconnect()
    }, [parsedChatId])

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(resetMessages())

        if (!parsedChatId) {
            return
        }

        const loadMessages = async () => {
            dispatch(loadMessagesThunk({ chatId: parsedChatId }))
                .unwrap()
                .catch(err => {
                    if (axios.isAxiosError(err) && err.response?.status === 404) {
                        navigate('/chats')
                    }
                })
        }

        loadMessages()
    }, [parsedChatId])

    return (
        <Flex
            h={"100%"}
            direction={"column"}
            align={'center'}
            px={{ base: 'lg', sm: '10dvh' }}
        >
            {/* {loading['chatMessages/loadMessages'] ? */}
                {/* <Center h={'100%'}><Loader /></Center> : */}
                <Box flex={1} mih={0} w='100%'>
                    <ScrollArea
                        h={"100%"}
                        type="auto"
                        viewportRef={scrollableRef}
                        offsetScrollbars
                    >
                        <div ref={topRef} style={{ height: 1 }} />

                        {loading['chatMessages/loadMessages'] && <Center h={'100%'}><Loader /></Center>}
                        <MessageList />
                        {sending ? <Box p={{ base: 'md', sm: 'xl' }}><TypingIndicator /></Box> : <></>}

                        <div ref={targetRef} style={{ height: 1 }} />
                    </ScrollArea>
                </Box>
            {/* } */}
            {parsedChatId && <MessageInput />}
        </Flex>
    )
}

export default Chat