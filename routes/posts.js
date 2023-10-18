import * as posts from "../controllers/posts.js";
import { Router, uploadSingleFile } from "../zghost/app/init.js";


const postsRouter = Router()

postsRouter.get('/', posts.get_posts)
postsRouter.post('/',uploadSingleFile('post'), posts.create_post)
postsRouter.get('/:id', posts.get_one_post)
postsRouter.post('/:id/comment', posts.add_new_comment)
postsRouter.get('/:id/likes', posts.change_likes)
postsRouter.get('/:id/reposts', posts.repost)
export {postsRouter}
