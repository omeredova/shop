export interface AuthField {
    id: string;
    type: 'text' | 'email' | 'password';
    name: string;
    placeholder: string;
    label: string;
}

export interface AuthFormProps {
    title: string;
    subtitle: string;
    buttonText: string;
    fields: AuthField[];
    transferText: string;
    transferLinkText: string;
    transferLinkPath: string;
}