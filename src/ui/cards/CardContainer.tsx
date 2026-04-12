import { Center, Flex, Loader, ScrollArea } from "@mantine/core"
import type { ReactNode } from "react"
import ColoredCard from "./ColoredCard"

interface Item {
    id: number | string
    status: 'APPROVED' | 'REJECTED' | 'PENDING' | 'CANCELLED'
    createdAt: string
}

interface CardContainerProps<T extends Item> {
    data: T[],
    elementHandler: (el: T) => ReactNode,
    loading: boolean
}

function CardContainer<T extends Item>({ data, elementHandler, loading }: CardContainerProps<T>) {
    return (
        <ScrollArea
            h={"100%"}
            type="auto"
            offsetScrollbars
        >
            <Flex
                direction={'column'}
                gap={{ base: 'md', sm: 'xl' }}
                w='100%'
            >
                {loading
                    ? <Center h={'100dvh'}><Loader /></Center>
                    : data.map(el => (
                        <ColoredCard
                            status={el.status}
                            createdAt={el.createdAt}
                            key={el.id}
                        >
                            {elementHandler(el)}
                        </ColoredCard>
                    ))
                }
            </Flex>
        </ScrollArea>
    )
}

export default CardContainer