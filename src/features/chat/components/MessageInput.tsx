import { useAppSelector } from "@/hooks/redux"
import { Button, Flex, Textarea } from "@mantine/core"
import useMessageInput from "../hooks/useMessageInput"
import { useParams } from "react-router-dom"

const MessageInput = () => {
    const { chatId } = useParams()
    const parsedChatId = chatId ? Number(chatId) : null

    const loading = useAppSelector(state => state.settingsReducer.loading)
    const sending = loading['chatMessages/sendMessage'] || loading['chatMessages/findDoctors']
    const {
        content,
        setContent,
        handleSend,
        findDoctors
    } = useMessageInput(parsedChatId)

    return (
        <form onSubmit={e => { e.preventDefault(); handleSend(); }} style={{ width: '100%'}}>
            <Flex
                align={'stretch'}
                gap={{ base: 'sm', sm: 'md' }}
                p={{ base: 'lg', sm: 'xl' }}
                direction={{ base: 'column' , sm: 'row' }}
                w={'100%'}
            >
                <Textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Опишите свои симптомы"
                    disabled={sending}
                    flex={1}
                    minRows={3}
                    maxRows={5}
                    autosize
                />
                <Flex
                    direction={'column'}
                    gap={{ base: 'sm' }}
                >
                    <Button type="submit" disabled={sending} style={{ flexShrink: 0 }}>
                        Отправить
                    </Button>
                    <Button
                        type="button"
                        onClick={findDoctors}
                        disabled={sending}
                        style={{ flexShrink: 0 }}
                    >
                        Найти специалиста
                    </Button>
                </Flex>
            </Flex>
        </form>
    )
}

export default MessageInput