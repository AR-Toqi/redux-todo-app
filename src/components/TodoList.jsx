// components/TodoList.js
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo, deleteTodo, editTodo  } from "../redux/actions";
import { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleEditSubmit = (id) => {
    if (editedText.trim() !== "") {
      dispatch(editTodo(id, editedText));
      setEditId(null);
      setEditedText("");
      Swal.fire("Edited!", "Your todo has been edited.", "success");
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTodo(id));
        Swal.fire("Deleted!", "Your todo has been deleted.", "success");
      }
    });
  };

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.completed ? "bg-success text-white" : ""
          }`}
        >
          <div>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            {editId === todo.id ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
            ) : (
              <span className={todo.completed ? "ml-2 text-muted" : "ml-2"}>
                {todo.text}
              </span>
            )}
          </div>
          <div>
            {editId === todo.id ? (
              <button
                onClick={() => handleEditSubmit(todo.id)}
                className="btn btn-success btn-sm mr-2"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditId(todo.id);
                  setEditedText(todo.text); // Initialize editedText with existing text
                }}
                className="btn btn-primary btn-sm mr-2"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => confirmDelete(todo.id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;