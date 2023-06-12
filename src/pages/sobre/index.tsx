import { useState } from "react";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import { MyButton } from '../../components/MyButton';
import styles from '../../styles/sobre.module.css'
import { Layout } from "@/components/Layout";

const Sobre = () => {

    const [contador, setContador] = useState(19)

    const handleContadorBtnPlus = () => {
        setContador(contador + 1);
    }

    const handleContadorBtnMinus = () => {
        setContador(contador - 1);
    }

    return (
        <Layout>
            <div>
                <Head>
                   <title>Sobre</title> 
                </Head>
                <h1 className={styles.sobreTitle}>Pagina sobre {contador}</h1>

                <div>Meu nome é {process.env.NEXT_PUBLIC_NOME}</div>

                <div>
                    <ul>
                        <Link href={"/sobre/breno"}>Breno</Link>
                        <li><a href="/sobre/joao">Joao</a></li>
                    </ul>
                </div>

                <MyButton label="Aumentar" onClick={handleContadorBtnPlus} />
                <button onClick={handleContadorBtnPlus} className="btn btn-primary m-2">Aumentar</button>
                <button onClick={handleContadorBtnMinus} className="btn btn-primary m-2">Diminuir</button>

                <Script
                    src="https://google-analytics.com/analytics.js"
                    strategy="afterInteractive"
                    onLoad={() => {
                        console.log('prueba')
                    }}
                />

                <style global jsx>
                    {`
                     
                    `}
                </style>

            </div>
        </Layout>
    )
}

export default Sobre;