import * as posts from "../controllers/posts.js";
import { Router } from "../zghost/app/init.js";
import multer from "multer";

const postsRouter = Router()
const upload = multer({ dest: '/uploads'})

postsRouter.get('/', posts.get_posts)
postsRouter.post('/',upload.single('post'), posts.create_post)
postsRouter.get('/:id', posts.get_one_post)
postsRouter.post('/:id/comment', posts.add_new_comment)
postsRouter.get('/:id/likes', posts.change_likes)
postsRouter.get('/:id/reposts', posts.repost)
export {postsRouter}
