import Login from "./components/Login";
import Profile from "./components/Profile";
import Close from "./components/Close";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Tasksummary from "./components/Tasksummary";

const App = () => {
  return (
    <div className="wrapper">
      <BrowserRouter basename="/taskmaster">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/tasksummary" element={<Tasksummary />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/close/:code" element={<Close />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
