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
      <div className="container-md mt-5 bgGreen">
        <div className="row">
          <Logo />
          <Navbar />
        </div>

        <div className="row">
          <History />

          <div className="col-md-6  customStyle">
            <PasteUrl />
            <Main />
          </div>

          <TaskList />
        </div>
      </div>
    </>
  );
}

export default App;
