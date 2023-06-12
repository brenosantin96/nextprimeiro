import { useRouter } from 'next/router'


const SobreItem = () => {

    const router = useRouter();

    const {slug} = router.query;

    return (
        <div>
            <h1>Pagina de {slug}</h1>
            <p>Pathname: {router.pathname}</p>
        </div>
    )
}

export default SobreItem;