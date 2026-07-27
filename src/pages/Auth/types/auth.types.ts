export interface AuthField {
    id: string;
    type: 'text' | 'email' | 'password';
    name: AuthFieldName;
    placeholder: string;
    label: string;
}

export interface LoginRequest {
    username: string;
    password: string;
    email?: string;
    confirmPassword?: string;
}

export type AuthFieldName = keyof LoginRequest;

export interface AuthFormProps {
    title: string;
    subtitle: string;
    buttonText: string;
    fields: AuthField[];
    transferText: string;
    transferLinkText: string;
    transferLinkPath: string;
    initialValues?: LoginRequest;
    error?: boolean;
    errorMessage?: string | undefined;
    successMessage?: string | undefined;
    isLoading?: boolean;
    onSubmit: (values: LoginRequest) => void | Promise<void>;
}

export interface RegistrationRequest {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}

export interface LoginAuthResponse extends LoginResponse {
    accessToken: string;
    refreshToken: string
}
