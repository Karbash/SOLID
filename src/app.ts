import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";

import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { usersRoutes } from "./http/controllers/users/routes";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { chekInsRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '10m',
    },
});

app.register(fastifyCookie)

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(chekInsRoutes);


app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: "Validation Error.", issues: error.format() })
    }

    if (env.NODE_ENV !== "production") {
        console.error(error)
    }
    else {
        //TODO : Here we should log to external tool like a Datadog/Sentry/NewRelic
    }
})

