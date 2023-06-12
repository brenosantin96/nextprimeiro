import { Layout } from '@/components/Layout';
import { Post } from '../../types/Post';

type Props = {
    name: string;
    posts: Post[];
}

const Blog = ({ name, posts }: Props) => {
    return (
        <Layout>


            <div>
                <h1>Blog</h1>
                <p>Blog de {name}</p>

                <ul>
                    {posts.map((post, index) => (
                        <li key={index}><a href={`/blog/${post.id}`}>{post.title}</a></li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}

//Funcao que pega props estaticas
export const getStaticProps = async () => {

    //Posso fazer requisicoes aqui tambem
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts: Post[] = await res.json();

    return {
        props: {
            name: 'Breno',
            posts
        },

        revalidate: 10
    }
}

export default Blog;