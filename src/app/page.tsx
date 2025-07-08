import MainPage from "./main/page";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <a
        className={styles["source-link"]}
        href="https://github.com/hyundotio/nextjs-ts-cesium-example"
        target="_blank"
        rel="noreferrer noopener"
      >
        GitHub Source link
      </a>
      <MainPage />
    </main>
  );
}
