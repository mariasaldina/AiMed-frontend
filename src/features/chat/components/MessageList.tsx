import { useEffect, useRef } from "react"
import type { Message } from "../types/message"
import AssistantMessage from "./assistantMessage/AssitantMessage"
import UserMessage from "./userMessage/UserMessage"
import DoctorSuggestions from "./doctorSuggestions/DoctorSuggestions"
import ContactsMessage from "./contactsMessage/ContactsMessage"
import { uuidv4 } from "zod"

interface MessageListProps {
    messages: Message[],
    className?: string,
    getContacts: (doctorId: number) => void
}

const MessageList: React.FC<MessageListProps> = ({ messages, className, getContacts }) => {
    const bottomRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <ul className={className}>
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
            <div ref={bottomRef} />
        </ul>
    )
}

export default MessageList