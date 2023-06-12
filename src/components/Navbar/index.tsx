import Link from 'next/link'
import { useRouter } from 'next/router'
import { navigationLinks } from '../../utils/data'
import styles from './Navbar.module.css'

export const NavBar = () => {

    const router = useRouter();

    const verifyActiveLink = (loopPath: string) => { //aqui ta recebendo string da rota

        if(loopPath === '/' && router.pathname !== '/'){
            return null
        }
        if (router.pathname.indexOf(loopPath) === 0) { //indexOf é usado para retornar se existe aquele item na posicao
            return styles.linkActive;
        } else {

        }
        return null;
    }


    return (
        <ul className={styles.container}>
            {navigationLinks.map((link, index) => (
                <li key={index} className={[styles.linkItem, verifyActiveLink(link.path)].join(' ')}>
                    <Link href={link.path}>{link.label}</Link>
                </li>
            ))}
            <li>{router.pathname}</li>
        </ul>
    )
}