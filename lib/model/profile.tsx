export class GetProfileResponse{
    id: string;
    name: string;
    username: string;
    isPublic: boolean;
    isSetup: boolean;

    meta?: {
        posts: number;
        recipes: number;
        followers: number;
        following: number;
    }

    photo?: {
        thumb: string;
        full: string;
    }

    relational?: {
        ifbu: boolean; // Is the logged in user following this profile
        ifu: boolean; // is this profile following the logged in user
        isu: boolean; // Is this the logged in user's profile
    }

    constructor() {
        this.id = ""
        this.name = ""
        this.isPublic = false
        this.isSetup = false
        this.username = ""
        this.meta = {
            posts: 0,
            recipes: 0,
            followers: 0,
            following: 0,
        }
        this.photo = {
            thumb: "",
            full: "",
        }
        this.relational = {
            ifbu: false,
            ifu: false,
            isu: false,
        }
    }
}