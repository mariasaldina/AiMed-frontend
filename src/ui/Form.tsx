import React, { type FormHTMLAttributes } from "react";
import { Flex, Paper, Title } from "@mantine/core";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    title?: string;
    children: React.ReactNode;
    onSubmit?: React.SubmitEventHandler<HTMLFormElement>;
    className?: string;
}

const Form: React.FC<FormProps> = ({
    title,
    children,
    onSubmit,
    className = "",
    ...props
}) => {
    return (
        <Paper
            p={{ base: 'xl' }}
            shadow="0 20px 50px rgba(0, 0, 0, 0.27)"
            radius={20}
            mih={400}
            w={{ base: 280, sm: 350}}
        >
            <form onSubmit={onSubmit} {...props}>
                <Flex direction={'column'} align={'center'} gap={20}>
                    {title && <Title size="xl" fw={600}>{title}</Title>}

                    <Flex direction={'column'} gap={20} w='100%'>
                        {children}
                    </Flex>
                </Flex>
            </form>
        </Paper>
    );
};

export default Form;