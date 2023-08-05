
// App.js
import { Provider } from "react-redux";
import { createStore } from "redux";
import todoReducer from "./redux/reducers";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";


const store = createStore(todoReducer);

const App = () => {
  return (
    <Provider store={store}>
      <div className="container mt-4 my-5">
        <h1 className="mb-4">Todo App</h1>
        <TodoForm />
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
