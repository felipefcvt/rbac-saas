import { env } from '@saas/env'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/github',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with GitHub',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request: any, reply: any) => {
      const { code } = request.body

      const gitHubOAuth = new URL('https://github.com/login/oauth/access_token')

      gitHubOAuth.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
      gitHubOAuth.searchParams.set(
        'client_secret',
        env.GITHUB_OAUTH_CLIENT_SECRET
      )
      gitHubOAuth.searchParams.set(
        'redirect_uri',
        env.GITHUB_OAUTH_CLIENT_REDIRECT_URI
      )
      gitHubOAuth.searchParams.set('code', code)

      const gitHuAccessTokenResponse = await fetch(gitHubOAuth, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })

      const gitHubAccessTokenData = await gitHuAccessTokenResponse.json()

      const { access_token } = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .parse(gitHubAccessTokenData)

      const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      const githubUserData = await githubUserResponse.json()

      console.log(githubUserData)

      const {
        id: githubId,
        name,
        email,
        avatar_url: avatarUrl,
      } = z
        .object({
          id: z.number().int().transform(String),
          name: z.string().nullable(),
          email: z.string().nullable(),
          avatar_url: z.string().url(),
        })
        .parse(githubUserData)

      if (email === null || email === undefined) {
        throw new BadRequestError(
          'Your GitHub account must have an email to authorize'
        )
      }

      let user = await prisma.user.findFirst({
        where: { email },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name,
            avatarUrl,
          },
        })
      }

      let account = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: 'GITHUB',
            userId: user.id,
          },
        },
      })

      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: 'GITHUB',
            providerAccountId: githubId,
            userId: user.id,
          }
        });
      }

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        }
      )

      return reply.status(201).send({ token })

    }
  )
}
