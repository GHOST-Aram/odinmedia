import { get_posts } from "../controllers/posts.js";
import { Router } from "../zghost/app/init.js";

const postsRouter = Router()


postsRouter.get('/',get_posts)
export {postsRouter}
