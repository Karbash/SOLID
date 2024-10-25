import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(
    request: FastifyRequest,
    reply: FastifyReply) {

    try {
        await request.jwtVerify()
    } catch (err) {
        const errorMessage = (err as Error).message || "Unauthorized";
        return reply.status(401).send({ error: "Unauthorized", message: errorMessage });
    }

}