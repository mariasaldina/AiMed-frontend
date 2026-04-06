import AssistantMessage from "../ui/AssitantMessage"
import UserMessage from "../ui/UserMessage"
import DoctorSuggestions from "../ui/DoctorSuggestions"
import { uuidv4 } from "zod"
import { Flex } from "@mantine/core"
import InvitationMessage from "../ui/InvitationMessage"
import { useAppSelector } from "@/hooks/redux"

const MessageList = () => {
    const { messages } = useAppSelector(state => state.chatMessagesReducer)

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
                ? <DoctorSuggestions key={m.id} doctors={m.doctors} />
                : m.kind === "invitation"
                ? <InvitationMessage key={m.id} content={m.content} />
                : <div key={String(uuidv4())}/>
            )}
        </Flex>
    )
}

export default MessageList