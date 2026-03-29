import { useEffect, useRef } from "react"
import type { Message } from "../types/message"
import AssistantMessage from "./AssitantMessage"
import UserMessage from "./UserMessage"
import DoctorSuggestions from "./doctorSuggestions/DoctorSuggestions"
import ContactsMessage from "./contactsMessage/ContactsMessage"
import { uuidv4 } from "zod"
import { Flex } from "@mantine/core"

interface MessageListProps {
    messages: Message[],
    className?: string,
    getContacts: (doctorId: number) => void
}

const MessageList: React.FC<MessageListProps> = ({ messages, className, getContacts }) => {

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
                : m.kind === "contacts"
                ? <ContactsMessage key={m.id} contacts={m.content}/>
                : <div key={String(uuidv4())}/>
            )}
        </Flex>
    )
}

export default MessageList