import { Flex, Text } from "@mantine/core"
import type { ReactNode } from "react";

interface FieldBlockProps {
    label: string;
    value?: string;
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

            <Text size="sm">{value}</Text>
            {children}    
        </Flex>
    )
}

export default FieldBlock