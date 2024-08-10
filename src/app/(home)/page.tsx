'use client'

import styles from "./page.module.css";
import React, {ChangeEvent, useRef, useState} from "react";
import Link from "next/link";
import emailjs from 'emailjs-com';

export default function Home() {
    const [email, setEmail] = useState<string>("")
    const [submitState, setSubmitState] = useState<string>("");
    const form = useRef<HTMLFormElement>(null);

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        console.log("SUBMIT")
        try {
            if (email !== "" && form.current) {
                emailjs.sendForm('service_bdlg4zj', 'template_f7pr9fz', form.current, 'B_JvpXHj8Wr1_J_Yl')
                    .then((result) => {
                        console.log(result.text);
                        setSubmitState("finished");
                    }, (error) => {
                        console.log(error.text);
                        setSubmitState("error");
                    });
            }
        } catch (e) {
            console.log(e);
        }
    }

    function handleEmail(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <img src="/logo_no_text_no_background.png" alt="Logo" className={styles.logo} />
            </div>
            <main className={styles.content}>
                <div className={styles.bannerSection}>
                    <img
                        src="/Agora_bannier_noBackground.png"
                        alt="Banner"
                        className={styles.banner}
                    />
                    <h1 className={styles.headerText}>
                        Welcome to Agora! Connect with new people over board games!
                    </h1>
                    <button
                        className={styles.downloadBtn}
                        onClick={() => alert("Please come back this August 15th to download")}
                    >
                        <span>Click here to download for Windows & Mac
                            <img alt={""} src={"/download.png"} style={{width: "30px", marginLeft: "20px"}}/>
                        </span>
                    </button>
                </div>

                <div className={styles.videoSection}>
                    <iframe
                        className={styles.video}
                        width="700"
                        height="500"
                        src="https://www.youtube.com/watch?v=mcGO9z2PKfs"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>

                <div className={styles.descriptionSection}>
                    <p className={styles.description}>
                        Description of the platform and its features.  Call to action.  // TODO
                    </p>
                    <div className={styles.followMeSection}>
                        <Link href={"https://www.youtube.com/@Agora_BoardGames"} target="_blank" rel="noopener noreferrer">
                            <img src={"/youtube.png"} alt={"join youtube"} />
                        </Link>
                        <Link href={"https://www.instagram.com/agora_boardgames/"} target="_blank" rel="noopener noreferrer">
                            <img src={"/instagram-logo.png"} alt={"join instagram"} />
                        </Link>
                        <Link href={"https://www.facebook.com/AgoraBoardGames"} target="_blank" rel="noopener noreferrer">
                            <img src={"/facebook.png"} alt={"join facebook"} />
                        </Link>
                    </div>
                    {submitState == "" &&
                        <form ref={form} onSubmit={handleSubmit}>
                            <div className={styles.subscribeBox}>
                                <input
                                    type="email"
                                    name="user_email"
                                    placeholder="Subscribe to stay informed!"
                                    className={styles.subscribeInput}
                                    onChange={handleEmail}
                                    value={email}
                                />
                                <button className={styles.subscribeBtn} type="submit">Subscribe</button>
                            </div>
                        </form>
                    }
                    {submitState === "finished" && <p>Thank you for subscribing!</p>}
                    {submitState === "error" && <p>There was an error. Please try again.</p>}
                </div>
            </main>
            <footer className={styles.footer}>
                <img src="/Agora_bannier_noBackground.png" alt="Logo" className={styles.footerLogo} />
            </footer>
        </div>
    );
}
