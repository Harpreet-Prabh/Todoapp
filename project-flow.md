# Todo App Function Call Flow

This document visualizes the function call patterns in the Todo application using Mermaid diagrams.

## Application Initialization Flow

```mermaid
graph TD
    A[Page Load] --> B[DOM Elements Selection]
    B --> C[Event Listeners Setup]
    C --> D[displayTodos]
    D --> E[getTodos]
    E --> F[Render UI]
    A --> G[init Function]
    G --> D
```

## Adding a Todo Flow

```mermaid
sequenceDiagram
    participant User
    participant UI as UI Elements
    participant App as app.js
    participant Service as todoService.js
    participant Storage as localStorage
    
    User->>UI: Enter text & click Add
    UI->>App: addNewTodo()
    App->>Service: addTodo(text)
    Service->>Service: Validate text
    Service->>Service: Create todo object
    Service->>Service: getTodos()
    Service->>Storage: localStorage.getItem()
    Storage-->>Service: Existing todos
    Service->>Service: Add new todo to array
    Service->>Service: saveTodos()
    Service->>Storage: localStorage.setItem()
    App->>App: Clear input field
    App->>App: displayTodos()
    App->>Service: getTodos()
    Service->>Storage: localStorage.getItem()
    Storage-->>Service: Updated todos
    Service-->>App: Return todos array
    App->>UI: Update taskList HTML
```

## Toggling Todo Status Flow

```mermaid
graph TD
    A[User clicks checkbox] --> B[toggleTodoStatus]
    B --> C[Get todoId from dataset]
    C --> D[toggleTodo]
    D --> E[getTodos]
    E --> F[localStorage.getItem]
    F --> G[Map through todos]
    G --> H[Update matching todo]
    H --> I[saveTodos]
    I --> J[localStorage.setItem]
    D --> K[displayTodos]
    K --> L[Update UI]
```

## Editing a Todo Flow

```mermaid
sequenceDiagram
    participant User
    participant App as app.js
    participant Service as todoService.js
    participant Storage as localStorage
    
    User->>App: Click edit button
    App->>App: editTodo(todoId)
    App->>Service: getTodos()
    Service->>Storage: localStorage.getItem()
    Storage-->>Service: Todos array
    Service-->>App: Return todos
    App->>App: Find todo by id
    App->>User: Show prompt with current text
    User->>App: Enter new text
    App->>Service: updateTodo(todoId, newText)
    Service->>Service: Validate text
    Service->>Service: getTodos()
    Service->>Storage: localStorage.getItem()
    Storage-->>Service: Todos array
    Service->>Service: Map and update todo
    Service->>Service: saveTodos()
    Service->>Storage: localStorage.setItem()
    App->>App: displayTodos()
    App->>Service: getTodos()
    Service->>Storage: localStorage.getItem()
    Storage-->>Service: Updated todos
    Service-->>App: Return todos array
    App->>User: Update UI
```

## Removing a Todo Flow

```mermaid
graph TD
    A[User clicks delete button] --> B[removeTodo]
    B --> C{Is todo completed?}
    C -->|No| D[Show alert]
    C -->|Yes| E[Confirm deletion]
    E -->|No| F[Cancel]
    E -->|Yes| G[deleteTodo]
    G --> H[getTodos]
    H --> I[Filter out todo]
    I --> J[saveTodos]
    G --> K[displayTodos]
    K --> L[Update UI]
```

## Data Flow Between Files

```mermaid
graph LR
    A[index.html] --> B[app.js]
    A --> C[todoService.js]
    B --> C
    C --> D[localStorage]
    D --> C
    C --> B
    B --> A
```

## Event Handling Flow

```mermaid
graph TD
    A[DOM Events] --> B[Click Add Button]
    A --> C[Press Enter in Input]
    A --> D[Click Checkbox]
    A --> E[Click Edit Button]
    A --> F[Click Delete Button]
    
    B --> G[addNewTodo]
    C --> G
    D --> H[toggleTodoStatus]
    E --> I[editTodo]
    F --> J[removeTodo]
    
    G --> K[addTodo]
    H --> L[toggleTodo]
    I --> M[updateTodo]
    J --> N[deleteTodo]
    
    K --> O[displayTodos]
    L --> O
    M --> O
    N --> O
```

## localStorage Interaction

```mermaid
sequenceDiagram
    participant App as Application
    participant Service as todoService.js
    participant Storage as localStorage
    
    App->>Service: Call data function
    Service->>Service: getTodos()
    Service->>Storage: localStorage.getItem(STORAGE_KEY)
    Storage-->>Service: JSON string or null
    Service->>Service: Parse JSON or return []
    Service->>Service: Perform operation
    Service->>Service: saveTodos()
    Service->>Storage: localStorage.setItem(STORAGE_KEY, JSON)
    Service-->>App: Return result
```

## Function Dependencies

```mermaid
graph TD
    A[displayTodos] --> B[getTodos]
    C[addNewTodo] --> D[addTodo]
    C --> A
    E[toggleTodoStatus] --> F[toggleTodo]
    E --> A
    G[editTodo] --> B
    G --> H[updateTodo]
    G --> A
    I[removeTodo] --> J[deleteTodo]
    I --> A
    D --> B
    D --> K[saveTodos]
    F --> B
    F --> K
    H --> B
    H --> K
    J --> B
    J --> K
```

## Error Handling Flow

```mermaid
graph TD
    A[User Action] --> B{Input Validation}
    B -->|Empty Input| C[Show Alert]
    B -->|Valid Input| D[Process Action]
    D --> E{Completion Check}
    E -->|Incomplete| F[Show Alert]
    E -->|Complete| G[Confirm Action]
    G -->|Confirmed| H[Execute Action]
    G -->|Cancelled| I[Abort]
``` 