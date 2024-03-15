import "./App.css";
import { CarrouselVideos } from "./components/carrousel/CarrouselVideos";
import { History } from "./components/history/History";
import { Logo } from "./components/Logo";
import { Main } from "./components/Main";
import { Navbar } from "./components/Navbar";
import { PasteUrl } from "./components/PasteUrl";
import { TaskList } from "./components/TaskList";

function App() {
  return (
    <>
      <div className="container-md container-app">
        <div className="row">
          <Logo />
          <Navbar />
        </div>
        <CarrouselVideos />
        <div className="row">
          <History />

          <div className="col-md-7  ">
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
