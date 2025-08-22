import React, { useState, useEffect } from 'react';
import { TodoItem } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface TodoListProps {
  todos?: TodoItem[];
  onAddTodo?: (todo: Omit<TodoItem, 'id' | 'createdAt'>) => void;
  onToggleTodo?: (id: string) => void;
  onDeleteTodo?: (id: string) => void;
  onEditTodo?: (id: string, text: string) => void;
}

type FilterType = 'all' | 'active' | 'completed';
type DifficultyFilter = {
  low: boolean;
  medium: boolean;
  high: boolean;
};

const TodoList: React.FC<TodoListProps> = ({ 
  todos: propTodos, 
  onAddTodo, 
  onToggleTodo, 
  onDeleteTodo, 
  onEditTodo 
}) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'low' | 'medium' | 'high'>('medium');
  const [filter, setFilter] = useState<FilterType>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>({
    low: true,
    medium: true,
    high: true
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { token } = useAuth();

  // Fetch todos from backend API
  const fetchTodos = async () => {
    if (!token) {
      setError('Please log in to view your todos');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8080/api/todos', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to load todos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Create new todo
  const createTodo = async (title: string, priority: string) => {
    if (!token) {
      setError('Please log in to create todos');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/todos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: '',
          priority: priority.toUpperCase()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      const newTodo = await response.json();
      setTodos(prev => [newTodo, ...prev]);
      setNewTodoText('');
    } catch (err) {
      console.error('Error creating todo:', err);
      setError('Failed to create todo. Please try again.');
    }
  };

  // Toggle todo completion status
  const toggleTodo = async (todoId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:8080/api/todos/${todoId}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      setTodos(prev => prev.map(todo => 
        todo.id === todoId ? updatedTodo : todo
      ));
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo. Please try again.');
    }
  };

  // Update todo
  const updateTodo = async (todoId: string, title: string, priority: string) => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:8080/api/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: '',
          priority: priority.toUpperCase()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      setTodos(prev => prev.map(todo => 
        todo.id === todoId ? updatedTodo : todo
      ));
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo. Please try again.');
    }
  };

  // Delete todo
  const deleteTodo = async (todoId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:8080/api/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos(prev => prev.filter(todo => todo.id !== todoId));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo. Please try again.');
    }
  };

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, [token]);

  // Filter todos based on current filter and difficulty
  const filteredTodos = todos.filter(todo => {
    // First filter by completion status
    let passesCompletionFilter = true;
    switch (filter) {
      case 'active':
        passesCompletionFilter = !todo.completed;
        break;
      case 'completed':
        passesCompletionFilter = todo.completed;
        break;
      default:
        passesCompletionFilter = true;
    }

    // Then filter by difficulty/priority
    const priority = todo.priority?.toLowerCase() || 'medium';
    const passesDifficultyFilter = difficultyFilter[priority as keyof DifficultyFilter];

    return passesCompletionFilter && passesDifficultyFilter;
  });

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      createTodo(newTodoText.trim(), selectedDifficulty);
    }
  };

  const handleToggleTodo = (id: string) => {
    toggleTodo(id);
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  const handleEditStart = (todo: TodoItem) => {
    setEditingId(todo.id);
    setEditText(todo.title || todo.text || '');
  };

  const handleEditSave = () => {
    if (editingId && editText.trim()) {
      updateTodo(editingId, editText.trim(), selectedDifficulty);
      setEditingId(null);
      setEditText('');
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const getDifficultyColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getDifficultyIcon = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;

  if (!token) {
    return (
      <div className="container">
        <div className="card animate-fade-in">
          <div className="card-header">
            <h2 className="text-2xl font-bold text-white">Todo List</h2>
            <p className="text-white opacity-80 mt-1">Manage your tasks and stay organized</p>
          </div>
          <div className="p-6 text-center">
            <p className="text-gray-600">Please log in to view and manage your todos.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card animate-fade-in">
        {/* Header */}
        <div className="card-header">
          <h2 className="text-2xl font-bold text-white">Todo List</h2>
          <p className="text-white opacity-80 mt-1">Manage your tasks and stay organized</p>
        </div>

        {/* Add Todo Form */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a new task..."
                className="input-field flex-1"
              />
              <button
                onClick={handleAddTodo}
                disabled={!newTodoText.trim()}
                className="btn-secondary"
              >
                Add Task
              </button>
            </div>
            
            {/* Priority Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Priority:</span>
              <div className="flex space-x-2">
                {(['low', 'medium', 'high'] as const).map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setSelectedDifficulty(priority)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedDifficulty === priority
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                    }`}
                  >
                    <span className="mr-1">{getDifficultyIcon(priority)}</span>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Filters */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col gap-4">
            {/* Stats and Status Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Total: {todos.length}</span>
                <span>Active: {activeCount}</span>
                <span>Completed: {completedCount}</span>
              </div>
              <div className="flex space-x-1">
                {(['all', 'active', 'completed'] as FilterType[]).map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`filter-btn ${filter === filterType ? 'filter-btn-active' : ''}`}
                  >
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Filters */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Priority:</span>
              <div className="flex space-x-2">
                {(['low', 'medium', 'high'] as const).map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setDifficultyFilter(prev => ({
                      ...prev,
                      [priority]: !prev[priority]
                    }))}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors border-2 ${
                      difficultyFilter[priority]
                        ? 'bg-blue-100 text-blue-700 border-blue-300'
                        : 'bg-gray-100 text-gray-500 border-gray-300 opacity-50'
                    }`}
                  >
                    <span className="mr-1">{getDifficultyIcon(priority)}</span>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-6 border-b border-red-100 bg-red-50">
            <div className="flex items-center space-x-2 text-red-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Todo List */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="loading-spinner mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading your todos...</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-500 mt-4">
                {filter === 'all' 
                  ? 'No tasks yet. Add your first task above!' 
                  : `No ${filter} tasks found.`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`todo-item ${todo.completed ? 'completed' : ''}`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <button
                      onClick={() => handleToggleTodo(todo.id)}
                      className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
                    >
                      {todo.completed && (
                        <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    
                    {editingId === todo.id ? (
                      <div className="flex-1 flex items-center space-x-2">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={handleEditKeyPress}
                          className="input-field flex-1"
                          autoFocus
                        />
                        <button
                          onClick={handleEditSave}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span
                            className={`todo-text ${todo.completed ? 'completed' : ''}`}
                          >
                            {todo.title || todo.text}
                          </span>
                          <span className="text-sm">{getDifficultyIcon(todo.priority || 'medium')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`priority-badge ${getDifficultyColor(todo.priority || 'medium')}`}
                          >
                            {todo.priority?.toLowerCase() || 'medium'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(todo.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {editingId !== todo.id && (
                    <div className="todo-actions">
                      <button
                        onClick={() => handleEditStart(todo)}
                        className="todo-action-btn edit"
                        title="Edit task"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="todo-action-btn delete"
                        title="Delete task"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
