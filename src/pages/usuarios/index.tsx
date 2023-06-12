import { Layout } from "@/components/Layout";
import Head from "next/head";
import styles from '../../styles/Usuarios.module.css'
import api from "@/libs/api";
import { User } from "@/types/User";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { GetServerSideProps } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { AuthUser } from "@/types/AuthUser";

type Props = {
    users: User[];
    loggedUser : AuthUser
}

const Usuarios = ({ users, loggedUser }: Props) => {

    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [userList, setUserList] = useState<User[]>(users)
    const [isDisabled, setIsDisabled] = useState(false);

    const handleLoadMore = async () => {

        if (!loading) { //se nn tiver carregando, vai fazer o processo
            setLoading(true);
           
            const json = await axios.get(`/api/users?page=${pageCount + 1}`)

            if (json.data.status) {
                
                if (json.data.users.length === 0) {
                    setIsDisabled(true);
                }
                
                setUserList([...userList, ...json.data.users]) // permite espalhar os elementos de um objeto iterável (como um array) como argumentos individuais em um novo objeto ou array.
            }


            setLoading(false);
            setPageCount(pageCount + 1); //primeiro faz a requisicao, dps aumenta o pageCount
        }

    }

    return (
        <Layout>
            <div>
                <Head>
                    <title>Usuarios</title>
                </Head>
                <h1>Página Usuários</h1>

                <div>Olá {loggedUser.name}. Tipo: {loggedUser.role}</div>

                <Link href={'/usuarios/novo'}>Novo usuario</Link>

                <ul>
                    {userList.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>

                <button onClick={handleLoadMore} disabled={isDisabled}>{isDisabled ? 'Não é possível exibir mais resultados' : 'Carregar mais'}</button>

            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    //é como se fosse a versao do useSession para server side
    if(!session){
        return { redirect: { destination: '/', permanent: true } }
    }

   
    const users = await api.getAllUsers(0);

    return {
        props: {
            loggedUser: session.user,
            users
        }
    }
}

export default Usuarios;


/* Para usar API do lado do servidor, tem que usar o getServerSideProps, detalhe: SE API for propia, nao se pode fazer requisicao soltando um fetch da vida
se tem que utilizar o codigo aqui, por isso requer o conceito do DRY, onde criamos um terceiro documento */

/* Quando a API é externa, se utiliza o FETCH por dentro do getServerSideProps */