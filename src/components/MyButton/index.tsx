import styles from './Mybutton.module.css'

type Props = {
    label : string;
    onClick :  () => void
}


export const MyButton = ({label, onClick}: Props) => {
    return(

        <button onClick={onClick} className={styles.myBtn}>{label}</button>

    )
}