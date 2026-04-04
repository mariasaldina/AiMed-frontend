import { Button, ScrollArea, Stack } from "@mantine/core"
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
        <form onSubmit={onSubmit}>
            <Stack miw={{ base: 280, sm: 500 }}>
                <ScrollArea
                    h={"100%"}
                    type="auto"
                    offsetScrollbars
                >
                    {children}
                </ScrollArea>

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