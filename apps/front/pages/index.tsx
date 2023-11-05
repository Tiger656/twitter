import React from 'react'
import Layout from 'components/Layout'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { User } from 'pages/api/user'

import { InferGetServerSidePropsType } from 'next'
import Post from 'components/post/Post'
import { CreatePostDto } from 'types'

//SsrProfile
export default function Index({
  user, posts
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      {user?.isLoggedIn && (
        <>
          {posts && posts.map((value) => (
              <Post post={value}></Post>
            )
            )
          }    
        </>
      )}
    </Layout>
  )
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}): Promise<{props: { user: User; posts: CreatePostDto[] }}> {
  const user = req.session.user as User

  if (user === undefined) {
    res.setHeader('location', '/login')
    res.statusCode = 302
    res.end()
    return  { props:
      {user: {...user,  isLoggedIn: false, accessToken: "" },
      posts: []
      }
    }
  }

  const posts = (await (await fetch("http://localhost:3000/post?populatedFields=author", {
    headers: {Authorization: 'Bearer ' + user.accessToken}
  })).json()) as CreatePostDto

  user === undefined ? { props: { user: req.session.user, posts: []}} : {props: { user: req.session.user, posts: posts }}}
,
sessionOptions)