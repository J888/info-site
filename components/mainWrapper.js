// import { Button } from "bootstrap";
import Head from "next/head";
import { Block } from "react-bulma-components";
import Nav from "./navbar";

import styles from "../styles/Home.module.css";

export default function MainWrapper(props) {

  return (
    <div>
      <Head>
        <title>{props.pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />{" "}
        {/* needed for react bootstrap responsiveness */}
      </Head>

      <Nav/>
      <Block/>
      <main>
        {props.children}
      </main>

      <footer className={styles.footer}>
        © 2021
      </footer>
    </div>
  );
}
