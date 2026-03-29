import type React from "react"
import type { UrgencyStatus } from "../types/message"
import { Divider, Group, List, Paper, Stack, Text } from "@mantine/core"
import { IconAlertHexagonFilled, IconClipboardListFilled, IconStethoscope, IconZoomQuestionFilled } from "@tabler/icons-react"

interface AssistantMessageProps {
    possibleCauses: string[],
    recommendations: string[],
    doctors: string[],
    urgency: UrgencyStatus
}

const AssistantMessage: React.FC<AssistantMessageProps>
    = ({ possibleCauses, recommendations, doctors, urgency }) => {
        return (
            <Paper
                style={{ alignSelf: 'flex-start' }}
                withBorder
                bdrs={30}
                px={{ base: 'md', sm: 'lg' }}
                py={{ base: 'xs', sm: 'md' }}
                maw={{ base: 500, sm: 800 }}
            >
                <Stack>
                    <Stack gap={5}>
                        <Group>
                            <IconAlertHexagonFilled />
                            <Text fw={800} size="lg">Уровень риска</Text>
                        </Group>
                        <Text
                            c={urgency === 'SAFE' ? 'green' : urgency === 'CONCERNING' ? 'orange' : 'red'}
                        >
                            {urgency === 'SAFE' && 'Безопасный'}
                            {urgency === 'CONCERNING' && 'Тревожный'}
                            {urgency === 'CRITICAL' && 'Критический'}
                        </Text>
                    </Stack>

                    <Divider />

                    <Stack>
                        <Group>
                            <IconZoomQuestionFilled />
                            <Text fw={800} size="lg">Возможные причины</Text>
                        </Group>
                        <List>
                            {possibleCauses.map((c, i) => <List.Item key={i}>{c}</List.Item>)}
                        </List>
                    </Stack>

                    <Divider />

                    <Stack>
                        <Group>
                            <IconClipboardListFilled />
                            <Text fw={800} size="lg">Рекомендации</Text>
                        </Group>
                        <List>
                            {recommendations.map((r, i) => <List.Item key={i}>{r}</List.Item>)}
                        </List>
                    </Stack>

                    <Divider />

                    <Stack>
                        <Group>
                            <IconStethoscope />
                            <Text fw={800} size="lg">К каким специалистам обратиться?</Text>
                        </Group>
                        <List>
                            {doctors.map((d, i) => <List.Item key={i}>{d}</List.Item>)}
                        </List>
                    </Stack>
                </Stack>
            </Paper>
        )
    }

export default AssistantMessage