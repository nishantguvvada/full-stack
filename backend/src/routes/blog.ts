import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { updatePostInput, createPostInput } from '../../node_modules/@fastscholar/common-traveliq/dist/zod'

const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()

blogRouter.use("/*", async (c, next) => {

    const authHeader = c.req.header('Authorization') || "";
    if (!authHeader) {
        c.status(401)
        return c.json({ error: "unauthorized" })
    }

    const token = authHeader.split(' ')[1];
    
    const id = await verify(token, c.env.JWT_SECRET);

    c.set('userId', String(id.id));
    await next();

});

blogRouter.post('/', async (c) => {

    const userId = c.get('userId');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const response = createPostInput.safeParse(body);
    if(!response.success){
        return c.json({error: "Invalid inputs!"})
    }

    try{
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: parseInt(userId)
            }
        })

        c.status(200);
        return c.json({message:"Post created!", blogid: blog.id});

    } catch(err){

        c.status(403);
        return c.json({error: err})

    }

})

blogRouter.put("/", async (c) => {
    const userId = c.get('userId');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const response = updatePostInput.safeParse(body);
    if(!response.success){
        return c.json({error: "Invalid inputs!"})
    }

    try{

        const blog = await prisma.post.update({
            where:{
                authorId: parseInt(userId),
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        c.status(200);
        return c.json({message: "Post updated!"});

    } catch(err) {

        c.status(400);
        return c.json({error: err});
    }
})

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{

        const blogs = await prisma.post.findMany({});
        c.status(200)
        return c.json({blogs: blogs});

    } catch(err){

        c.status(403);
        return c.json({error: err});

    }
    
})

blogRouter.get("/:id", async (c) => {

    const id = c.req.param('id');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{

        const blog = await prisma.post.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        c.status(200)
        return c.json({blog: blog});

    } catch(err){

        c.status(403);
        return c.json({error: err});

    }
    
})

export default blogRouter