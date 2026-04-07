import { Flex, Text } from "@mantine/core"
import type { ReactNode } from "react";

interface FieldBlockProps {
    label: string;
    children: ReactNode;
}

const FieldBlock: React.FC<FieldBlockProps> = ({ label, children }) => {
    return (
        <Flex gap={20} align={'center'}>
            <Text size="sm" c="dark" style={{ minWidth: 150 }}>
                {label}
            </Text>

            <Text size="sm">
                {children}
            </Text>        
        </Flex>
    )
}

export default FieldBlock