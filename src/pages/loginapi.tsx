import { Layout } from "@/components/Layout"
import axios from "axios";
import { signIn } from "next-auth/react";
import Head from "next/head"
import { useRouter } from "next/router";
import { useState } from "react"

const LoginApi = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const login = async (email: string, password : string) => {
        //pegar o csrf token
        //validar as credentials
        //retornar dados do session, verificar o session

        const csrfReq = await axios.get('/api/auth/csrf');
        if (csrfReq.data.csrfToken) {
            const authReq = await axios.post('/api/auth/callback/credentials', {
                json: true,
                csrfToken: csrfReq.data.csrfToken,
                email,
                password
            });

            if(authReq.status === 200) {
                const userData = await axios.get('/api/auth/session');
                if(userData.data.user) {
                    return true;
                }
            }
        }

        return false;
    }

    const handleSubmit = async () => {

        if(!email || !password) {
            setErrorText("Preencha todos os campos!");
            return;
        }

        setErrorText("");
        setLoading(true);
        
        //processo login
        const logged = await login(email, password);
        setLoading(false);

        if(logged) {
            window.location.href = '/';
        } else {
            setErrorText("Acesso negado");
        }

        

    }

    return (
        <Layout>
            <div>
                <Head>
                    <title>Login API</title>
                </Head>

                <h1>Login Via API</h1>

                <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />

                <button onClick={handleSubmit} disabled={loading}>Entrar</button>

                {errorText}
                {loading && "Carregando..."}

            </div>
        </Layout>
    )

}

export default LoginApi;