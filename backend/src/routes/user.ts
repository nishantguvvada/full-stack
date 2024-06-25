import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from '../../node_modules/@fastscholar/common-traveliq/dist/zod';

const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const response = signupInput.safeParse(body);
    if(!response.success){
        return c.json({error: "Invalid inputs!"})
    }

    try{
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password
            }
        });

        const token = await sign({id: user.id}, c.env.JWT_SECRET);

        c.status(200);
        return c.json({token: token});
    
    }catch(err){
        c.status(403);
        return c.json({error: "User not created!"})
    }

})

userRouter.post('/signin', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const response = signinInput.safeParse(body);
    if(!response.success){
        return c.json({error: "Invalid inputs!"})
    }

    const user = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

    const token = await sign({id: user.id}, c.env.JWT_SECRET);

    return c.json({token: token, message: "Signed in!"});
})

export default userRouter