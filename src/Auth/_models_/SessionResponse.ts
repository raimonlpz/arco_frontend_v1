import { ProfileResponse } from "../../Profile/_models_";

export interface SessionResponse extends ProfileResponse {
    id: number;
    createdAt: string;
    email: string;
}