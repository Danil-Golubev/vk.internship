import style from "./style.module.css";
import { card } from "../../types";

interface CardBlockProps extends card {
  onEdit: () => void;
  onDelete: () => void;
}

export const CardBlock = ({
  albumId,
  id,
  url,
  thumbnailUrl,
  onEdit,
  onDelete,
}: CardBlockProps) => {
  return (
    <div className={style.mainBlock}>
      <div className={style.content}>
        <p>albumId: {albumId}</p>
        <p>id: {id}</p>

        <a target="_blank" rel="noopener noreferrer" href={url}>
          {url}
        </a>
        <a target="_blank" rel="noopener noreferrer" href={thumbnailUrl}>
          {thumbnailUrl}
        </a>
        <div className={style.buttons}>
          <button className={style.button} onClick={onEdit}>
            Edit
          </button>
          <button className={style.button} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
