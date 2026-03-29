import { Button, Flex, Input, Textarea } from "@mantine/core"

interface MessageInputProps {
    value: string,
    onChange: (newValue: string) => void,
    onSend: () => void,
    findDoctors: () => void,
    disabled: boolean
}

const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, onSend, findDoctors, disabled }) => {
    return (
        <form onSubmit={e => { e.preventDefault(); onSend(); }}>
            <Flex
                align={'stretch'}
                gap={{ base: 'md', sm: 'lg' }}
                px={{ base: 'md', sm: 'xl' }}
                py={{ base: 'md', sm: 'lg' }}
            >
                <Textarea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder="Опишите свои симптомы"
                    disabled={disabled}
                    flex={1}
                    minRows={3}
                    maxRows={5}
                    autosize
                />
                <Flex
                    direction={'column'}
                    gap={{ base: 'md', sm: 'sm' }}
                >
                    <Button type="submit" disabled={disabled} style={{ flexShrink: 0 }}>
                        Отправить
                    </Button>
                    <Button
                        type="button"
                        onClick={findDoctors}
                        disabled={disabled}
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