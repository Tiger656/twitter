import { ForbiddenException, Inject, Injectable } from "@nestjs/common"
import { PostService } from "../post.service"

@Injectable()
export class AccessValidator {
    constructor(private readonly postService: PostService){}

    async validateUserOwnPost(postId: string, userId: string) {
        const post = (await this.postService.findOne(postId));
        if (post.author.toString() !== userId) {
            console.log("You cannot make action on not yours post");
            throw new ForbiddenException("You cannot make action on not yours post");
        }
    }
}