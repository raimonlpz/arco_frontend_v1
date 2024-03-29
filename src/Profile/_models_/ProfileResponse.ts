
import { FollowResponse } from "./FollowResponse";
import { ProfileDTO } from "./ProfileDTO";

export interface ProfileResponse extends ProfileDTO {
    userId?: number;
    profileId?: number;
    updatedAt?: string;
    followedBy?: FollowResponse[];
    following?: FollowResponse[];
    user?: {
        email: string;
        id: number;
        createdAt: string;
    };
    subscriptions?: [
        {
            intents: {
                value: string;
            }[],
            entities: {
                values: string[];
            }[]
        }
    ];
    favorites?: [
        {
            intents: {
                value: string;
            }[],
            entities: {
                values: string[];
            }[]
        }
    ]
}