import { get_one_post, get_posts } from "../controllers/posts.js";
import { Router } from "../zghost/app/init.js";

const postsRouter = Router()


postsRouter.get('/',get_posts)
postsRouter.get('/posts/:id', get_one_post)
export {postsRouter}
