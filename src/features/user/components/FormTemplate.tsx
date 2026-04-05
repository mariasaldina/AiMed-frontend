import { Box, Button, ScrollArea, Stack } from "@mantine/core"
import { useEffect, type ReactNode } from "react"

interface FormTemplateProps {
    isEditing: boolean,
    onCancel: () => void,
    resetForm: () => void,
    onSubmit: () => void,
    children: ReactNode
}

const FormTemplate: React.FC<FormTemplateProps> = ({ isEditing, onCancel, resetForm, onSubmit, children }) => {
    useEffect(() => {
        resetForm()
    }, [])

    return (
        <form onSubmit={onSubmit} style={{ height: '100%' }}>
            <Stack h={'100%'}>
                <Box flex={1} mih={0}>
                    <ScrollArea
                        h={"100%"}
                        type="auto"
                        offsetScrollbars
                    >
                        {children}
                    </ScrollArea>
                </Box>

                {isEditing ?
                    <Stack>
                        <Button type="submit">
                            Сохранить
                        </Button>
                        <Button type="button" variant='light' onClick={() => { resetForm(); onCancel() }}>
                            Отменить
                        </Button>
                    </Stack>
                    : null}
            </Stack>
        </form>
    )
}

export default FormTemplate