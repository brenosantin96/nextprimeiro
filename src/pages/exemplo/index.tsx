import { Layout } from '@/components/Layout';
import styles from '../../styles/Exemplo.module.css'

const exemplo = () => {
    return (
        <Layout>


            <div className={styles.divExemplo}>
                <h2>Página de exemplo</h2>
            </div>
        </Layout>
    )
}

export default exemplo;