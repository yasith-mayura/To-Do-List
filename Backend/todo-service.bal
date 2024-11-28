import ballerina/http;

type Todos record {
    readonly int id;
    string title;
    boolean completed;
};

type NewTodo record {|
    string title;
    boolean completed;
|};

table<Todos> key(id) todos = table [
    {id: 1, title: "Learn Ballerina", completed: false},
    {id: 2, title: "Learn Ballerina", completed: false},
    {id: 3, title: "Learn React", completed: true},
    {id: 4, title: "Learn Ballerina", completed: false}
];

// The service-level CORS config applies globally to each `resource`.
@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowCredentials: false,
        allowHeaders: ["CORELATION_ID"],
        exposeHeaders: ["X-CUSTOM-HEADER"],
        maxAge: 84900
    }
}

service /todo\-service on new http:Listener(9090) {
    @http:ResourceConfig {
        cors: {
            allowOrigins: ["*"],
            allowCredentials: true
        }
    }

    resource function get todos() returns Todos[]|error {
        return todos.toArray();
    }

    resource function post todos(NewTodo newTodo) returns http:Created|error {
        todos.add({id: todos.length() + 1, ...newTodo});
        return http:CREATED;
    }

    

}
