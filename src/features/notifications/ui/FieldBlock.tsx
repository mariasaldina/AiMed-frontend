import { Flex, Text } from "@mantine/core"
import type { ReactNode } from "react";

interface FieldBlockProps {
    label: string;
    value?: string | null;
    children?: ReactNode;
}

const FieldBlock: React.FC<FieldBlockProps> = ({ label, value, children }) => {
    return (
        <Flex
            gap={{ base: 2, sm: 20 }}
            align={{ base: 'start', sm: 'center'}}
            direction={{ base: 'column', 'sm': 'row'}}
        >
            <Text size="sm" c="dark" style={{ minWidth: 150 }}>
                {label}
            </Text>

            {value && <Text size="sm">{value}</Text>}
            {children}

            {!value && !children && <Text size="sm" c="grey" style={{ minWidth: 150 }}>
                пусто
            </Text>}  
        </Flex>
    )
}

export default FieldBlock