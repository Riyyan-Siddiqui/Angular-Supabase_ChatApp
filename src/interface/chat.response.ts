export interface Ichat{
    created_at: string;
    editable: boolean;
    id: string;
    sender: string;
    message: string;
    user: {
        avatar_url: string;
        id: string;
        full_name: string;
    }
}