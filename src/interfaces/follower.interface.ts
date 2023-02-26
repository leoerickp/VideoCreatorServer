export interface inputNewFollower {
    userId: string;
}

export interface IFollower extends inputNewFollower {
    userId: string;
    followerId: string;
}