import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import styles from "./style.module.css";
import { CardBlock } from "../../components/CardBlock/CardBlock";
import { EditModal } from "../../components/EditModal/EditModal";
import {
  deleteItem,
  fetchGetItems,
  incrementPage,
  updateItem,
} from "../../redux/dataSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { card } from "../../types";

export const MainPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.data);
  const currentPage = useSelector((state: RootState) => state.data.currentPage);
  const isFirstRender = useRef(true);
  const isFetching = useRef(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<card>();

  const handleFetchItems = async () => {
    if (!loading && !isFetching.current) {
      setLoading(true);
      isFetching.current = true;
      try {
        await dispatch(fetchGetItems(currentPage)).unwrap();
        dispatch(incrementPage());
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    }
  };

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target.documentElement;
    if ((scrollTop / (scrollHeight - clientHeight)) * 100 > 70 && !loading) {
      handleFetchItems();
    }
  };

  const handleEdit = (item: card) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteItem(id));
  };
  const handleSave = (updatedItem: card) => {
    dispatch(updateItem(updatedItem));
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [loading]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      handleFetchItems();
    }
  }, []);

  if (!data.length && loading) {
    return <div className={styles.skeleton}>loading...</div>;
  }

  return (
    <div className={styles.container}>
      {data.map((item: card, index) => (
        <CardBlock
          key={`${item.id}-${index}`}
          albumId={item.albumId}
          id={item.id}
          title={item.title}
          url={item.url}
          thumbnailUrl={item.thumbnailUrl}
          onEdit={() => handleEdit(item)}
          onDelete={() => handleDelete(item.id)}
        />
      ))}
      {isModalOpen && selectedItem && (
        <EditModal
          item={selectedItem}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
