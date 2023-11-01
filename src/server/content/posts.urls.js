import { postDAL }  from "./posts.dal.js"
import {PostsController} from "./posts.controllers.js";
import { Router, uploadSingleFile } from "../../zghost/app/init.js";
import { 
    comment_validators, 
    post_validators 
} from "../../utils/validators.js"

const postsRouter = Router()
const controller = new PostsController(postDAL)

postsRouter.get('/', controller.get_posts)
postsRouter.post('/',
    ...post_validators, 
    uploadSingleFile('post'), 
    controller.create_post
)
postsRouter.get('/:id', controller.get_one_post)
postsRouter.post('/:id/comment',
    ...comment_validators, controller.add_new_comment
)
postsRouter.get('/:id/likes', controller.change_likes)
postsRouter.get('/:id/reposts', controller.repost)

export {postsRouter}
