import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";

import dataReducer, {
  DataState,
  deleteItem,
  fetchGetItems,
  incrementPage,
  updateItem,
} from "../../redux/dataSlice";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const createTestStore = () =>
  configureStore({
    reducer: { data: dataReducer },
  });

describe("dataSlice", () => {
  let store = createTestStore();

  beforeEach(() => {
    store = createTestStore();
  });

  it("should load data into the store upon fetchGetItems dispatch", async () => {
    const mockData = [
      {
        albumId: 1,
        id: 1,
        title: "Test Title",
        url: "https://via.placeholder.com/600/1fe46f",
        thumbnailUrl: "https://via.placeholder.com/150/1fe46f",
      },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    await store.dispatch(fetchGetItems(1));

    const state: DataState = store.getState().data;
    expect(state.data).toEqual(mockData);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull(); // проверяем что в store приходят элементы
  });

  it("should set loading to true while fetching", () => {
    store.dispatch(fetchGetItems(1));
    const state: DataState = store.getState().data;
    expect(state.loading).toBe(true);
  });

  it("should increment currentPage by 1", () => {
    const initialPage = store.getState().data.currentPage;
    store.dispatch(incrementPage());

    const state: DataState = store.getState().data;
    expect(state.currentPage).toBe(initialPage + 1);
  });

  it("should update item", () => {
    const initialData = [
      {
        albumId: 1,
        id: 1,
        title: "Initial Title",
        url: "https://via.placeholder.com/600/1fe46f",
        thumbnailUrl: "https://via.placeholder.com/150/1fe46f",
      },
      {
        albumId: 1,
        id: 2,
        title: "Second Title",
        url: "https://via.placeholder.com/600/1fe46f",
        thumbnailUrl: "https://via.placeholder.com/150/1fe46f",
      },
    ];
    store.dispatch({
      type: "data/fetchGetItems/fulfilled",
      payload: initialData,
    });

    const updatedData = { id: 1, title: "Updated Title" };
    store.dispatch(updateItem(updatedData));

    const state: DataState = store.getState().data;
    expect(state.data[0].title).toBe("Updated Title");
  });

  it("should delete item from data", () => {
    const initialData = [
      {
        albumId: 1,
        id: 1,
        title: "Initial Title",
        url: "https://via.placeholder.com/600/1fe46f",
        thumbnailUrl: "https://via.placeholder.com/150/1fe46f",
      },
      {
        albumId: 1,
        id: 2,
        title: "Second Title",
        url: "https://via.placeholder.com/600/1fe46f",
        thumbnailUrl: "https://via.placeholder.com/150/1fe46f",
      },
    ];
    store.dispatch({
      type: "data/fetchGetItems/fulfilled",
      payload: initialData,
    });

    store.dispatch(deleteItem(1));

    const state: DataState = store.getState().data;
    expect(state.data.find((item) => item.id === 1)).toBeUndefined(); // проверяем что элемент с id 1 удален
    expect(state.data).toHaveLength(1);
  });
});
