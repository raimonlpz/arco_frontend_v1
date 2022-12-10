import { ProfileDTO } from "./ProfileDTO";

interface FollowRel {
    followerId: number, // profileId
    followingId: number // profileId
}

export interface ProfileResponse extends ProfileDTO {
    userId?: number;
    profileId?: number;
    updatedAt?: string;
    followedBy?: FollowRel [];
    following?: FollowRel[];
}