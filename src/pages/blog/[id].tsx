import { GetStaticProps } from "next";
import { Post } from "@/types/Post";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import { Layout } from "@/components/Layout";

type Props = {
    post: Post
}

const BlogItem = ({ post }: Props) => {
    return (
        <Layout>
            <div>
                <Head>
                    <title>Next muito Louco.</title>
                    <meta name="title" content={post.title} />
                    <meta name="description" content={post.body} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`http://localhost:3000/blog/${post.id}`} />
                    <meta property="og:title" content={post.title} />
                    <meta property="og:description" content={post.body} />
                    <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h1>Blog</h1>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
        </Layout>
    )
}

export default BlogItem;

//pegar lista de caminhos, neste caso lista de IDS
export const getStaticPaths = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts: Post[] = await res.json();


    //Criando lista de paths
    const paths = posts.map(post => ({
        params: {
            id: post.id.toString()
        }
    }))
    return { paths, fallback: false }

}


interface IParams extends ParsedUrlQuery {
    id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {

    const { id } = context.params as IParams;

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post: Post = await res.json();

    return {
        props: {
            post
        }
    }

}