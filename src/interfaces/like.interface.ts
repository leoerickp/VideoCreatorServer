export interface inputNewLike {
    videoId: string;
}

export interface ILike extends inputNewLike {
    userId: string;
    videoId: string;
}