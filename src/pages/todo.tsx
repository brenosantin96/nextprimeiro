import { Todo } from "@/types/Todo";
import { useEffect, useState } from "react";



const Todo = () => {

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        loadTodos();
    }, [])

    const loadTodos = async () => {
        setLoading(true);
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
        const list : Todo[] = await res.json();
        setTodoList(list);
        setLoading(false);
    }

    return(
        <div>
            <h1>Lista de tarefas</h1>

            {loading && <div>Carregando...</div>}

            <ul>
                {todoList.map((todo, index) => (
                    <li key={index}>{todo.title} - Tarefa feita: {todo.completed.toString()}</li>
                ))}
            </ul>
        </div>
    )
}

export default Todo;



/* export const getServerSideProps = async () => {

    // Faz uma requisição à API ou banco de dados para obter os dados
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const todoList: Todo[] = await res.json();

  // Retorna os dados como props
  return { props: { todo : todoList } };

} */