import { useEffect, useState } from "react";
import "./App.css";
import { LoginForm } from "./LoginForm";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/api/messages")
      .then((response) => {
        // If the response was not ok
        if (!response.ok) {
          // Show the login page
          throw new Error("Something went wrong");
        }

        return response.json();
      })
      .then((messages) => {
        setMessages(messages);
        setIsLoading(false);
      });
  }, []);

  const loginRequest = (username, password) =>
    fetch("http://localhost:3000/api/messages/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Connection: "keep-alive",
      },
    });

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    loginRequest(username, password)
      .then((res) => res.json())
      .then((data) => {
        console.log("login was successful: ", data);
      });
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <h1>Members Only</h1>
      <LoginForm onSubmit={handleOnSubmit} />
      <ul>
        {messages.map((messageObject) => {
          return (
            <li key={messageObject._id}>
              {messageObject.message} - {messageObject.memberId.username}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
