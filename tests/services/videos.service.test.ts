import { IUser } from '../../src/interfaces/user.interface';
import { VideosService } from '../../src/services/videos.service';
import { Video } from '../../src/models/video';
describe('VideosService test', () => {
    const result = {
        count: 36,
        videos: [
            {
                id: "d05a96e3-279e-4f43-9a7b-245bd7f6664d",
                title: "Ruvim Miksanskiy",
                description: "Nisi enim enim laboris ut qui sit. Deserunt elit ea proident ex Lorem cillum. Nisi magna voluptate et in veniam proident mollit ea id duis eu. Consectetur ex non incididunt ipsum laboris commodo culpa ipsum laboris sunt dolor veniam. Proident consectetur occaecat ullamco id fugiat esse non tempor consectetur magna mollit labore ea voluptate. Officia ullamco cupidatat consectetur nisi.",
                published: false,
                link: "https://player.vimeo.com/external/296210754.hd.mp4?s=08c03c14c04f15d65901f25b542eb2305090a3d7&profile_id=175&oauth2_token_id=57447761",
                userId: "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
                createdAt: "2023-02-23T16:11:34.202Z",
                updatedAt: "2023-02-23T16:11:34.202Z"
            },
            {
                id: "6513a56d-271a-42ae-92ac-953dc8273343",
                title: "Tom Fisk",
                description: "Nisi enim enim laboris ut qui sit. Deserunt elit ea proident ex Lorem cillum. Nisi magna voluptate et in veniam proident mollit ea id duis eu. Consectetur ex non incididunt ipsum laboris commodo culpa ipsum laboris sunt dolor veniam. Proident consectetur occaecat ullamco id fugiat esse non tempor consectetur magna mollit labore ea voluptate. Officia ullamco cupidatat consectetur nisi.",
                published: false,
                link: "https://player.vimeo.com/external/330412624.hd.mp4?s=9a9c77ce40f703dcb023eca64c85e258195efa28&profile_id=174&oauth2_token_id=57447761",
                userId: "455d6998-13dc-4fb5-ab4d-3961d4dd1f9a",
                createdAt: "2023-02-23T16:11:34.339Z",
                updatedAt: "2023-02-23T16:11:34.339Z"
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
    const videosService = new VideosService();
    test('should be list count and videos', async () => {
        jest.spyOn(Video, 'findAndCountAll').mockImplementation(() => ({ count: result.count, rows: result.videos } as any));
        expect(await videosService.getAll(user, {})).toEqual(result)
    })
    test('should find one video record', async () => {
        jest.spyOn(Video, 'findByPk').mockImplementation(() => result.videos[0] as any);
        expect(await videosService.getOneById("d05a96e3-279e-4f43-9a7b-245bd7f6664d")).toEqual(result.videos[0])
    })
    test('should update one video record', async () => {

        const modifiedField = { published: true }
        const updatedVideo = { ...result.videos[0], ...modifiedField }
        const video = {
            update() {
                return { ...result.videos[0], ...modifiedField }
            }
        }
        jest.spyOn(videosService, 'getOneById').mockImplementation(() => video as any);
        expect(await videosService.update("d05a96e3-279e-4f43-9a7b-245bd7f6664d", { published: true })).toEqual({ ...result.videos[0], published: true })
    })
    test('should remove one video record', async () => {

        const video = {
            destroy() {
                return result.videos[0];
            }
        }
        jest.spyOn(videosService, 'getOneById').mockImplementation(() => video as any);
        expect(await videosService.remove("d05a96e3-279e-4f43-9a7b-245bd7f6664d")).toEqual(result.videos[0])
    })
})