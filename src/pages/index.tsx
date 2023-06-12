import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Layout } from '@/components/Layout'

import TenisImage from '../../public/tenis.png';
import { signIn, signOut, useSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const {data: session} = useSession();

  if(session){
    console.log('user: ', session.user);

  }

  return (

    <Layout>
      <>
        <Head>
          <title>Next muito Louco.</title>
          <meta name="title" content="Next muito Louco." />
          <meta name="description" content="Essa é uma descrição muito legal do meu site. lorem ipsum dolor sit amet ixk. Este é meu site em NEXT." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://localhost:3000/" />
          <meta property="og:title" content="Next muito Louco." />
          <meta property="og:description" content="Essa é uma descrição muito legal do meu site. lorem ipsum dolor sit amet ixk. Este é meu site em NEXT." />
          <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />
          <link rel="icon" href="/favicon.ico" />
        </Head>


        <main className={styles.main}>

          {!session &&
            <button onClick={() => signIn()}>Fazer Login</button>
          }
          {session &&
            <>
              Olá {session.user?.name}.
              <button onClick={() => signOut()}>Sair</button>
            </>
          }


          <div className={styles.description}>
            <p>
              Get started by editing&nbsp;
              <code className={styles.code}>src/pages/index.tsx</code>
            </p>
            <div>
              <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                By{' '}
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  className={styles.vercelLogo}
                  width={100}
                  height={24}
                  priority
                />
              </a>
            </div>
          </div>

          <Image src={TenisImage}
            width={300}
            alt={''} />



          <div className={styles.center}>
            <Image
              className={styles.logo}
              src="/next.svg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
            <div className={styles.thirteen}>
              <Image
                src="/thirteen.svg"
                alt="13"
                width={40}
                height={31}
                priority
              />
            </div>
          </div>

          <div className={styles.grid}>
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={inter.className}>
                Docs <span>-&gt;</span>
              </h2>
              <p className={inter.className}>
                Find in-depth information about Next.js features and&nbsp;API.
              </p>
            </a>

            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={inter.className}>
                Learn <span>-&gt;</span>
              </h2>
              <p className={inter.className}>
                Learn about Next.js in an interactive course with&nbsp;quizzes!
              </p>
            </a>

            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={inter.className}>
                Templates <span>-&gt;</span>
              </h2>
              <p className={inter.className}>
                Discover and deploy boilerplate example Next.js&nbsp;projects.
              </p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={inter.className}>
                Deploy <span>-&gt;</span>
              </h2>
              <p className={inter.className}>
                Instantly deploy your Next.js site to a shareable URL
                with&nbsp;Vercel.
              </p>
            </a>
          </div>
        </main>
      </>
    </Layout>

  )
}
