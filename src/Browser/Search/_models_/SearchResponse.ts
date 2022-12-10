
interface Intent {
    id: number; 
    value: string; 
    nlpIntentId: number; 
    searchId: number;
}


interface Entity {
    id: number; 
    values: string[];
    nlpEntityId: number;
    searchId: number;
}


export interface SearchResponse {
    id: number; 
    createdAt: string; 
    query: string;
    profileId: number; 
    intents: Intent[];
    entities: Entity[]
}