import { FollowersService } from "../../src/services/followers.service";
import { Follower } from '../../src/models/follower';
import { IUser } from "../../src/interfaces/user.interface";

describe('FollowersService test', () => {
    const followers = {
        "count": 1,
        "followers": [
            {
                "userId": "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
                "followerId": "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
                "createdAt": "2023-02-26T23:39:09.974Z",
                "updatedAt": "2023-02-26T23:39:09.974Z"
            }
        ]
    }
    const followeds = {
        "count": 2,
        "followeds": [
            {
                "userId": "a7f6d457-efb4-4ead-bac6-3460ab6bda18",
                "followerId": "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
                "createdAt": "2023-02-26T23:39:07.982Z",
                "updatedAt": "2023-02-26T23:39:07.982Z"
            },
            {
                "userId": "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
                "followerId": "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
                "createdAt": "2023-02-26T23:39:09.974Z",
                "updatedAt": "2023-02-26T23:39:09.974Z"
            }
        ]
    }
    const user: IUser = {
        id: "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
        fullName: "Leo Erick Pereyra Rodriguez",
        email: "leoerickp@gmail.com",
        password: "$2b$10$HcipnYNjlLWjLg6K2iR3Nuuix3D8yzuh0NCnSsbCUz9VnNOJh7bgW",
        isActive: true,
    }

    const followersService = new FollowersService();
    test('should be list count and followers', async () => {
        jest.spyOn(Follower, 'findAndCountAll').mockImplementation(() => ({ count: followers.count, rows: followers.followers } as any));
        expect(await followersService.getAllFollowers(user)).toEqual(followers)
    })
    test('should be list count and followeds', async () => {
        jest.spyOn(Follower, 'findAndCountAll').mockImplementation(() => ({ count: followeds.count, rows: followeds.followeds } as any));
        expect(await followersService.getAllFolloweds(user)).toEqual(followeds)
    })
    test('should find one like', async () => {
        jest.spyOn(Follower, 'findOne').mockImplementation(() => followers.followers[0] as any);
        expect(await followersService.getOneByPK("d05a96e3-279e-4f43-9a7b-245bd7f6664d", user.id)).toEqual(followers.followers[0])
    })

    test('should remove one like', async () => {
        const follower = {
            destroy() {
                return { ...followers.followers[0] }
            }
        }
        jest.spyOn(followersService, 'getOneByPK').mockImplementation(() => follower as any);
        expect(await followersService.remove("455d6998-13dc-4fb5-ab4d-3961d4dd1f9a", user.id)).toEqual({ userId: "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a", followerId: user.id })
    })
})