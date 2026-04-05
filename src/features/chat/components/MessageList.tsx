import type { Message } from "../types/message"
import AssistantMessage from "./AssitantMessage"
import UserMessage from "./UserMessage"
import DoctorSuggestions from "./DoctorSuggestions"
import { uuidv4 } from "zod"
import { Flex } from "@mantine/core"

interface MessageListProps {
    messages: Message[],
    getContacts: (doctorId: number) => void
}

const MessageList: React.FC<MessageListProps> = ({ messages, getContacts }) => {

    return (
        <Flex
            direction={'column'}
            style={{ listStyle: 'none' }}
            p={{ base: 'md', sm: 'xl' }}
            gap={{ base: 'md', sm: 'xl' }}
        >
            {messages.map(m =>
                m.kind === "user"
                ? <UserMessage key={m.id} content={m.content} />
                : m.kind === "assistant"
                ? <AssistantMessage
                    key={m.id}
                    possibleCauses={m.possibleCauses}
                    recommendations={m.recommendations}
                    doctors={m.doctors}
                    urgency={m.urgency}
                />
                : m.kind === "doctorSuggestions"
                ? <DoctorSuggestions key={m.id} doctors={m.doctors} getContacts={getContacts}/>
                : <div key={String(uuidv4())}/>
            )}
        </Flex>
    )
}

export default MessageList