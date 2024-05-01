import styles from "./ArticlesPage.module.scss";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import Header from "../../components/Header/Header";
export default function ArticlesPage() {
  const { data, error, loading } = useFetch("/api/titles");
  console.log(data, error, loading);

  return (
    <div className={styles.articlesPage}>
      <Header></Header>
      {loading && <p>Loading</p>}
      {data &&
        data.titles.map((t) => {
          return (
            <ArticleCard title={t.title} id={t._id} key={t._id}></ArticleCard>
          );
        })}
      {/* {data && <p>Data</p>} */}
      {error && <p>Error</p>}
    </div>
  );
}
