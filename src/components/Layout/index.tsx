import { ReactElement } from 'react'
import { NavBar } from '../Navbar';
import styles from './Layout.module.css'

type Props = {
    children: ReactElement;
}

export const Layout = ({ children }: Props) => {
    return (
        <div className={styles.container}>

            <header className={styles.header}>
                <h1>Meu próprio projeto</h1>
            </header>
            <NavBar />
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                Todos os direitos reservados.
            </footer>

        </div>
    )
}