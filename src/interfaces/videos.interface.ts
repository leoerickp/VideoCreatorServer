export interface inputNewVideo {
    title: string;
    description?: string;
    published?: boolean;
    link: string;
}

type partialVideo = Partial<inputNewVideo>

export interface inputUpdatedVideo extends partialVideo {
    //id: string;
}

export interface IVideo extends inputNewVideo {
    id: string;
    userId: string;
}