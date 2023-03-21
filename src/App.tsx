import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { BiTrash } from "react-icons/bi";
import "./App.css";

export interface ITodos { todo: string; key: string; checked: boolean }

function App() {
	let [todos, setTodos] = useState<ITodos[]>([]);
	let [current, setCurrent] = useState<string>("");

	useEffect(() => {
		const todosFromLocalStorage:string|null = localStorage.getItem("todos");
		if (todosFromLocalStorage) {
			setTodos(JSON.parse(todosFromLocalStorage));
		}
	}, []);


 

	function handleChange(e: React.ChangeEvent<HTMLInputElement>):void {
		e.preventDefault();
		setCurrent(e.target.value);
	}

	function updateTodos(e: React.MouseEvent<HTMLButtonElement, MouseEvent>):void {
		e.preventDefault();

    let newTodo:ITodos = { todo: current, key: nanoid(), checked: false }

    setTodos((prev: ITodos[]) => {
      return [...prev, newTodo];
    });

// 		useEffect(() => {
  // localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
  setCurrent(" ");

// }, [todos]);

	}

	function deleteTodo(key:string) {
		console.log(todos);

		setTodos((prev) => {
			return prev.filter((todo) => todo.key !== key);
		});

		// setLocalStorage(JSON.stringify(todos.filter((todo)=> todo.key !== key)))

    // useEffect(() => {
    //   localStorage.setItem("todos", JSON.stringify(todos));
    // }, [todos]);


		localStorage.setItem(
			"todos",
			JSON.stringify(todos.filter((todo) => todo.key !== key))
		);
	}

	function checkTodo(key:string) {
		setTodos((prevTodos) => {
			return prevTodos.map((todo) => {
				return {
					...todo,
					checked: todo.key == key ? !todo.checked : todo.checked,
				};
			});
		});

    // useEffect(() => {
    //   localStorage.setItem("todos", JSON.stringify(todos));
    // }, [todos]);

		localStorage.setItem(
			"todos",
			JSON.stringify(
				todos.map((todo) => {
					return {
						...todo,
						checked: todo.key == key ? !todo.checked : todo.checked,
					};
				})
			)

      
		);
	}

	let todoElements =
		todos.length > 0
			? todos.map((todo) => (
					<li key={todo.key}>
						<div>
							<input
								type="checkbox"
								checked={todo.checked}
								name=""
								id=""
								onClick={() => checkTodo(todo.key)}
								className="checkbox"
							/>

							<p
								style={{
									textDecoration: todo.checked
										? "line-through"
										: "none",
									color: todo.checked
										? "var(--darkGrey)"
										: "var(--black)",
								}}
							>
								{todo.todo}
							</p>
						</div>

						<span>
							<button
								className="delete"
								onClick={() => deleteTodo(todo.key)}
							>
								<BiTrash className="trash" />
							</button>
						</span>
					</li>
			  ))
			: null;

	return (
		<main className="app">
			<h1>Todo App</h1>
			<div className="container">
				<form>
					<input
						type="text"
						placeholder="Enter Todo"
						onChange={handleChange}
						value={current}
						name="todo"
					/>

					<button className="enter" onClick={updateTodos}>
						+
					</button>
				</form>
				<ul>{todoElements}</ul>
			</div>
		</main>
	);
}

export default App;
