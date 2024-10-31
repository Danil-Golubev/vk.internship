import React, { useState } from "react";

import style from "./style.module.css";
import { card } from "../../types";
interface EditModalProps {
  item: card;
  onClose: () => void;
  onSave: (updatedItem: card) => void;
}

export const EditModal = ({ item, onClose, onSave }: EditModalProps) => {
  const [updatedItem, setUpdatedItem] = useState<card>({ ...item });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(updatedItem);
    onClose();
  };

  return (
    <div className={style.modalBackdrop}>
      <div className={style.modal}>
        <h2>Edit Item</h2>

        <label>
          Album ID:
          <input
            className={style.input}
            type="number"
            name="albumId"
            value={updatedItem.albumId}
            onChange={handleChange}
          />
        </label>
        <label>
          Title:
          <input
            className={style.input}
            type="text"
            name="title"
            value={updatedItem.title}
            onChange={handleChange}
          />
        </label>
        <label>
          URL:
          <input
            className={style.input}
            type="text"
            name="url"
            value={updatedItem.url}
            onChange={handleChange}
          />
        </label>
        <label>
          Thumbnail URL:
          <input
            className={style.input}
            type="text"
            name="thumbnailUrl"
            value={updatedItem.thumbnailUrl}
            onChange={handleChange}
          />
        </label>

        <div className={style.buttons}>
          <button className={style.buttonSave} onClick={handleSave}>
            Save
          </button>
          <button className={style.buttonCancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
