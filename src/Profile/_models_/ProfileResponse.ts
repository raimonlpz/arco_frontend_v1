import { ProfileDTO } from "./ProfileDTO";

export interface ProfileResponse extends ProfileDTO {
    updatedAt: string;
    userId: number;
}