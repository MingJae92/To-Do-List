import { useState, ChangeEvent, FormEvent } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  InputGroup,
} from "react-bootstrap";

interface Task {
  text: string;
  completed: boolean;
}

function App() {
  const [taskInput, setTaskInput] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const toggleTaskCompletion = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="6">
          <h1 className="text-center">To-Do List</h1>
          <Form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleAddTask();
            }}
          >
            <Form.Group controlId="formTask">
              <InputGroup>
                <Form.Control
                  placeholder="Enter your task"
                  value={taskInput}
                  onChange={handleInputChange}
                />
                <Button variant="primary" onClick={handleAddTask}>
                  Add Task
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
          <ListGroup className="mt-3">
            {tasks.map((task, index) => (
              <ListGroup.Item key={index}>
                <InputGroup>
                  <InputGroup.Checkbox
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(index)}
                  />
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </span>
                </InputGroup>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
