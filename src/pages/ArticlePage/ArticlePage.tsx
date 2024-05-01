import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./ArticlePage.module.scss";
import Header from "../../components/Header/Header";
import { DateTime } from "luxon";

export default function ArticlePage() {
  const { id } = useParams();
  const { data, error, loading } = useFetch(`/api/articles/${id}`); //data={article={body,title,author}}

  return (
    <main className={styles.ArticlePage}>
      <Header></Header>
      {loading && <p>Loading</p>}
      {error && <p>Errors</p>}
      {data && (
        <>
          <h1>{data.article.title}</h1>
          <div className={styles.info}>
            <span className={styles.author}>{data.article.author},</span>
            <span className={styles.date}>
              {DateTime.fromISO(data.article.created).toLocaleString(
                DateTime.DATE_MED
              )}
            </span>
          </div>
          <article>{data.article.body}</article>
        </>
      )}
    </main>
  );
}
