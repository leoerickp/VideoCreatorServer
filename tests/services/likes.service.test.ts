import { LikesService } from "../../src/services/likes.service";
import { Like } from '../../src/models/like';
import { IUser } from "../../src/interfaces/user.interface";

describe('LikesService test', () => {
    const result = {
        "count": 4,
        "likes": [
            {
                "userId": "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
                "videoId": "506f5430-b552-44d6-bcbf-0f76c57e0520",
                "createdAt": "2023-02-26T00:19:59.061Z",
                "updatedAt": "2023-02-26T00:19:59.061Z"
            },
            {
                "userId": "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
                "videoId": "470c9831-043e-463f-9dc0-11bd65d8e653",
                "createdAt": "2023-02-26T00:20:01.155Z",
                "updatedAt": "2023-02-26T00:20:01.155Z"
            },
            {
                "userId": "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
                "videoId": "adfe6a76-2729-4501-86f6-2ca997fe1c90",
                "createdAt": "2023-02-26T17:33:03.849Z",
                "updatedAt": "2023-02-26T17:33:03.849Z"
            },
            {
                "userId": "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
                "videoId": "4731715e-13e0-44d4-a6d0-f1a81047b6fc",
                "createdAt": "2023-02-26T20:45:27.517Z",
                "updatedAt": "2023-02-26T20:45:27.517Z"
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

    const likesService = new LikesService();
    test('should be list count and likes', async () => {
        jest.spyOn(Like, 'findAndCountAll').mockImplementation(() => ({ count: result.count, rows: result.likes } as any));
        expect(await likesService.getAll(user)).toEqual(result)
    })
    test('should find one like', async () => {
        jest.spyOn(Like, 'findOne').mockImplementation(() => result.likes[0] as any);
        expect(await likesService.getOneByPK("d05a96e3-279e-4f43-9a7b-245bd7f6664d", user.id)).toEqual(result.likes[0])
    })

    test('should remove one like', async () => {
        const like = {
            destroy() {
                return { ...result.likes[0] }
            }
        }
        jest.spyOn(likesService, 'getOneByPK').mockImplementation(() => like as any);
        expect(await likesService.remove("d05a96e3-279e-4f43-9a7b-245bd7f6664d", user.id)).toEqual({ ...result.likes[0] })
    })
})