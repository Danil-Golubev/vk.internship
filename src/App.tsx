import "./App.css";
import { Provider } from "react-redux";

import { MainPage } from "./pages/MainPage/MainPage";
import store from "./redux/store";

function App() {
  return (
    <div className="main">
      <div className="content">
        <Provider store={store}>
          <MainPage />
        </Provider>
      </div>
    </div>
  );
}

export default App;
