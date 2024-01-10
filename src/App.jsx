import "./App.css";
import { History } from "./components/History";
import { Logo } from "./components/Logo";
import { Main } from "./components/Main";
import { Navbar } from "./components/Navbar";
import { PasteUrl } from "./components/PasteUrl";
import { TaskList } from "./components/TaskList";

function App() {
  return (
    <>
    <Logo />
    <Navbar />
    <History />
    <PasteUrl />
    <Main />
    <TaskList />
    </>
  );
}

export default App;
