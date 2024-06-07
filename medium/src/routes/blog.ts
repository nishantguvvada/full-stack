import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use('/*', async (c, next) => {
    
    const authHeader = c.req.header("authorization") || "";

    const token = authHeader.split(' ')[1];

    const response = await verify(token, "secret");

    console.log(response);

    if(response){

        c.set('userId', String(response.id));
        await next();

    } else {

        c.status(403)
        return c.json({error: "unauthorizated"});

    }
})
  
blogRouter.post('/', async (c) => {

    const body = await c.req.json();
    const authorId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: String(authorId)
        }
    })

    return c.json({id: blog.id})
});

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({id: blog.id});
});

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    const blogs = await prisma.post.findMany();

    return c.json({blogs: blogs})
});

blogRouter.get('/', async (c) => {

    const body = await c.req.json();
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.post.findFirst({
        where: {
            id: body.id
        }
    })

    return c.json({blog: blog})
});