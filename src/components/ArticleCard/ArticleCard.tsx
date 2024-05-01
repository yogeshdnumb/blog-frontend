import { useNavigate } from "react-router-dom";
import styles from "./ArticleCard.module.scss";

interface AppProps {
  title: string;
  link: string;
}

export default function ArticleCard({ title, id }: AppProps) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.ArticleCard}
      onClick={() => {
        navigate(`/articles/${id}`);
      }}
    >
      {title}
    </div>
  );
}
