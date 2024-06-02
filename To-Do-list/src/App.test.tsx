import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import the matchers

import App from './App';

test('renders To-Do List header', () => {
  render(<App />);
  const headerElement = screen.getByText(/to-do list/i);
  expect(headerElement).toBeInTheDocument(); // Now TypeScript should recognize toBeInTheDocument
});

test('adds a new task', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/enter your task/i);
  const addButton = screen.getByText(/add task/i);

  fireEvent.change(inputElement, { target: { value: 'Test Task' } });
  fireEvent.click(addButton);

  const taskElement = screen.getByText(/Test Task/i);
  expect(taskElement).toBeInTheDocument();
});

test('toggles task completion', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/enter your task/i);
  const addButton = screen.getByText(/add task/i);

  fireEvent.change(inputElement, { target: { value: 'Test Task' } });
  fireEvent.click(addButton);

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  const taskElement = screen.getByText(/Test Task/i);
  expect(taskElement).toHaveStyle('text-decoration: line-through');
});
