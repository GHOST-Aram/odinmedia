import * as posts from "./posts.controllers.js";
import { Router, uploadSingleFile } from "../../zghost/app/init.js";
import { 
    comment_validators, 
    post_validators 
} from "../../utils/validators.js"

const postsRouter = Router()

postsRouter.get('/', posts.get_posts)
postsRouter.post('/',
    ...post_validators, uploadSingleFile('post'), posts.create_post
)
postsRouter.get('/:id', posts.get_one_post)
postsRouter.post('/:id/comment',
    ...comment_validators, posts.add_new_comment
)
postsRouter.get('/:id/likes', posts.change_likes)
postsRouter.get('/:id/reposts', posts.repost)
export {postsRouter}
