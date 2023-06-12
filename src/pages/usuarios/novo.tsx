import { Layout } from "@/components/Layout";
import Head from "next/head";
import styles from '../../styles/UsuariosNovo.module.css'
import api from "@/libs/api";
import { User } from "@/types/User";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";


const UsuariosNovo = () => {

    const router = useRouter();

    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');

    const handleSaveForm = async () => {

        if (nameInput && emailInput) {
            
            const json = await axios.post(`/api/users`, {
                name: nameInput,
                email: emailInput
            });

            if (json.data.status) {
                router.push('/usuarios');
            } else {
                alert(json.data.error);
            }
        }

    }

    return (

        <Layout>
            <div>
                <Head>
                    <title>Usuarios - Novo </title>
                </Head>

                <h1>Página Usuários - Novo</h1>

                <input className={styles.input} type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Digite o nome do usuario" />
                <input className={styles.input} type="text" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Digite o email do usuario" />

                <button onClick={handleSaveForm}>Cadastrar</button>

            </div>
        </Layout>
    );
}



export default UsuariosNovo;


/* Para usar API do lado do servidor, tem que usar o getServerSideProps, detalhe: SE API for propia, nao se pode fazer requisicao soltando um fetch da vida
se tem que utilizar o codigo aqui, por isso requer o conceito do DRY, onde criamos um terceiro documento */

/* Quando a API é externa, se utiliza o FETCH por dentro do getServerSideProps */