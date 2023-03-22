import io from "socket.io-client";
import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

//?puente de comunicacion entre el cliente y el servidor
// const socket = io("http://localhost:4000");//Desarrollo
const socket = io();//Produccion

interface IMessage {
  body: string;
  from: string;
}

function App() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message != "") {
      socket.emit("message", message);
      setMessages([{ from: "Me", body: message }, ...messages]);
      setMessage("");
    }
  };
  useEffect(() => {
    //?vuelvo a escuchar el evento desde el servidor para el resto de clientes
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    return () => {
      socket.off("message"); //? cuando se desmonte el componente se desuscribe del evento
    };
  }, [messages]);

  return (
    <div className="h-screen bg-slate-800 text-white flex items-center justify-center ">
      <form onSubmit={handleSubmit} className="bg-slate-900 p-14 ">
        <h1 className="text-2xl font-bold mx-auto text-center pb-5">
          Chat React
        </h1>
        <input
          type="text"
          name="name"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 border-red-500 rounded-md p-2 text-slate-900 w-full"
        />

        <ul className="h-80 overflow-auto overflow-y-hidden">
          {messages.map((m, i) => (
            <li
              key={i}
              className={`my-2 p-2 table text-sm rounded-md ${
                m.from == "Me" ? "bg-sky-700 ml-auto" : "bg-black"
              }`}
            >
              <p>
                {m.from} : {m.body}
              </p>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
