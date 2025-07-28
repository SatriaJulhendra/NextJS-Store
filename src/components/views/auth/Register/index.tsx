import Link from "next/link";
import styles from "./Register.module.scss";
import hendler from "@/pages/api/user/register";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";


const RegisterView = () => {
    
    const { push } = useRouter();
    const [isLoding, setIsLoding] = useState(false);
    const [isError, setIsError] = useState('');

    const hendlerSumit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoding(true);
        setIsError('');

        const form = event.target as HTMLFormElement;
        const data = {
            email: form.email.value,
            fullName: form.fullname.value,
            phone: form.phone.value,
            password: form.password.value
        }

        const result = await fetch('/api/user/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if(result.status === 200) {
            form.reset();
            setIsLoding(false)
            push('/auth/login');
        }else{
            setIsLoding(false);
            setIsError('Email already registered');
        }
    }

    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Register</h1>
            {isError && <p className={styles.register__error}>{isError}</p>}
            <div className={styles.register__form}>
                <form onSubmit={hendlerSumit}>
                    <div className={styles.register__form__item}>
                        <label htmlFor="email">Email</label>
                        <input name = "email" id="email" className={styles.register__form__item__input}  type="text" />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="fullname">Fullname</label>
                        <input name = "fullname" id="fullname" className={styles.register__form__item__input}  type="text" />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="phone">Phone</label>
                        <input name = "phone" id="phone" className={styles.register__form__item__input}  type="text" />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="password">Password</label>
                        <input name = "password" id="password" className={styles.register__form__item__input}  type="password" />
                    </div>
                    <button type="submit" className={styles.register__form__button}>
                        {isLoding ? 'Loading...' : 'Register'}
                    </button>
                </form>
            </div>
            <p className={styles.register__link}>have an account sign in <Link href="/auth/login">here</Link> </p>
        </div>
    )
}

export default RegisterView; 