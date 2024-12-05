import ballerina/http;

type Todos record {
    readonly int id;
    string title;
    boolean completed;
};

type NewTodo record {
    string title;
    boolean completed;
};

type UpdatedTodo record {
    string title;
    boolean completed;
};

// Sample initial data
table<Todos> key(id) todos = table [
    {id: 1, title: "Learn Ballerina", completed: false},
    {id: 2, title: "Learn React", completed: false},
    {id: 3, title: "Learn JavaScript", completed: true},
    {id: 4, title: "Read about CORS", completed: false}
];

// Global CORS configuration for the service
@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],  // Allow all origins (can be modified for security)
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Allow the necessary HTTP methods
        allowHeaders: ["Content-Type", "Authorization", "Corelation-Id"], // Add any necessary headers
        exposeHeaders: ["X-CUSTOM-HEADER"],
        allowCredentials: false,  // Set true if you are handling cookies or tokens
        maxAge: 3600
    }
}

service /todo\-service on new http:Listener(9090) {

    // GET method to fetch all todos
    resource function get todos() returns Todos[]|error {
        return todos.toArray();
    }

    // GET method to fetch a specific todo by ID
    resource function get todos/[int id]() returns Todos|error {
        // Find the todo by ID
        Todos? existingTodo = todos[id];
        
        if (existingTodo is Todos) {
            return existingTodo;  // Return the specific todo
        } else {
            return error("Todo not found");
        }
    }

    // POST method to create a new todo
    resource function post todos(NewTodo newTodo) returns Todos|error {
        // Auto-increment ID: Track it separately
        int newId = 1; 
        foreach var todo in todos {
            if (todo.id >= newId) {
                newId = todo.id + 1;
            }
        }

        Todos createdTodo = {id: newId, title: newTodo.title, completed: newTodo.completed};
        
        // Add the new todo to the table
        todos.add(createdTodo);
        
        // Return the created todo
        return createdTodo;
    }

    // PUT method to update an existing todo (mark as completed)
    resource function put todos/[int id](@http:Payload UpdatedTodo updatedTodo) returns Todos|error {
        // Find the todo by ID
        Todos? existingTodo = todos[id];
        
        if (existingTodo is Todos) {
            // Update the todo's title and completion status
            existingTodo.title = updatedTodo.title;
            existingTodo.completed = updatedTodo.completed;
            
            // Return the updated todo
            return existingTodo;
        } else {
            // If the todo doesn't exist, return an error
            return error("Todo not found");
        }
    }

    // DELETE method to remove a todo
    resource function delete todos/[int id]() returns string|error {
        // Try to remove the todo by ID
        var todoToRemove = todos.remove(id);
        
        // If a todo was successfully removed
        if (todoToRemove is Todos) {
            return "Todo removed successfully";
        } 
    }
}
