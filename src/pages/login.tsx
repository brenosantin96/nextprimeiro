import { Layout } from "@/components/Layout"
import { signIn } from "next-auth/react";
import Head from "next/head"
import { useRouter } from "next/router";
import { useState } from "react"

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async () => {

        if(!email || !password) {
            setErrorText("Preencha todos os campos!");
            return;
        }

        setErrorText("");
        setLoading(true);

        const request = await signIn('credentials', {
            redirect: false,
            email, password
        });

        setLoading(false);

        if (request && request.ok) {

            if (router.query.callbackUrl) {
                router.push(router.query.callbackUrl as string);

            } else {
                router.push('/')
            }


        } else {
            setErrorText("Acesso negado")
        }
//ss
    }

    return (
        <Layout>
            <div>
                <Head>
                    <title>Login</title>
                </Head>

                <h1>Login</h1>

                <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />

                <button onClick={handleSubmit} disabled={loading}>Entrar</button>

                {errorText}
                {loading && "Carregando..."}

            </div>
        </Layout>
    )

}

export default Login;