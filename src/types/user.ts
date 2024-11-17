export type UserDTO = {
    id: string; // Assuming there's an id field for unique identification
    name: string;
    email: string;
    roles: string;
    permissions: string[];
    isAccountEnabled: string;
    isAccountNonLocked: string;
    createdDate: string;
    gender: string;
};