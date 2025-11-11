import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(req, res) {
    const { title, content } = req.body

    const session = await getServerSession(req, res, authOptions)

    const userEmail = session.user.email;

    const result = await prisma.post.create({
        data: {
            title: title,
            content: content,
            author: { connect: { email: userEmail } }
        }
    })

    res.json(result)
}