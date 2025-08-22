import Link from "next/link";
import styles from "./Login.module.scss";
import hendler from "@/pages/api/user/register";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";


const LoginView = () => {
    
    const { push, query } = useRouter();
    const [isLoding, setIsLoding] = useState(false);
    const [isError, setIsError] = useState('');

    const callbackUrl : string | string[] = query.callbackUrl || '/';

    const hendlerSumit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoding(true);
        setIsError('');

        const form = event.target as HTMLFormElement;
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: form.email.value,
                password: form.password.value,
                callbackUrl : Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl
            });

            if(!res?.error){
                setIsLoding(false);
                form.reset(); 
                push(callbackUrl as string);
            }else{
                setIsLoding(false);
                setIsError("Email or password is incorrect");
            }

        }catch (error) {
            setIsLoding(false);
            setIsError("Email or password is incorrect");
        }
    }

    return (
        <div className={styles.login}>
            <h1 className={styles.login__title}>Login</h1>
            {isError && <p className={styles.login__error}>{isError}</p>}
            <div className={styles.login__form}>
                <form onSubmit={hendlerSumit}>
                    <div className={styles.login__form__item}>
                        <label htmlFor="email">Email</label>
                        <input name = "email" id="email" className={styles.login__form__item__input}  type="text" />
                    </div>
                    <div className={styles.login__form__item}>
                        <label htmlFor="password">Password</label>
                        <input name = "password" id="password" className={styles.login__form__item__input}  type="password" />
                    </div>
                    <button type="submit" className={styles.login__form__button}>
                        {isLoding ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
            <p className={styles.login__link}>Don{"'"}t have an account? Sign Up<Link href="/auth/register">here</Link> </p>
        </div>
    )
}

export default LoginView; 