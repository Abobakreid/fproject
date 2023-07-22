import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Showmap from "./Components/Map/Showmap";
import {
  AboutUs,
  AddReview,
  AddStadium,
  Analysis,
  ChangeOwnerPass,
  ChangePlayerPass,
  CreateOrSign,
  DetailTeam,
  EditStadium,
  History,
  Home,
  Join,
  JoinTeam,
  Login,
  OwnerEdit,
  OwnerHome,
  OwnerStadiumDetail,
  PlayerEdit,
  PlayerHome,
  PlayerReservation,
  Profile,
  ProfileOwner,
  RateOfPlayer,
  Register,
  RegisterOwner,
  ReservationDetails,
  Reservations,
  ReserveHour,
  Reserveo,
  ResetPassword,
  StadiumAnalysis,
  Stadiums,
} from "./Pages";
import AnalysisStadium from "./Pages/AnalysisStadium/AnalysisStadium";
import PlayerReservationn from "./Pages/PlayerReservationn/PlayerReservationn";
import RateOfGoalKeeper from "./Pages/RateOfGoalKeeper/RateOfGoalKeeper";
function App() {
  return (
    <div className="App">
      <ToastContainer
        autoClose={4000}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="registerowner" element={<RegisterOwner />} />
        <Route path="playeredit" element={<PlayerEdit />} />
        <Route path="playerhome" element={<PlayerHome />} />
        <Route path="owneredit" element={<OwnerEdit />} />
        <Route path="ownerhome" element={<OwnerHome />} />
        <Route path="changeownerpass" element={<ChangeOwnerPass />} />
        <Route path="addstadium" element={<AddStadium />} />
        <Route path="changeplayerpass" element={<ChangePlayerPass />} />
        <Route path="stadiums" element={<Stadiums />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="createorsign" element={<CreateOrSign />} />
        <Route path="history" element={<History />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="profile" element={<Profile />} />
        <Route
          path="reservationdetails/:detail_id"
          element={<ReservationDetails />}
        />
        <Route path="jointeam" element={<JoinTeam />} />
        <Route path="analysis" element={<Analysis />} />
        <Route path="profileowner" element={<ProfileOwner />} />
        <Route path="reservehour" element={<ReserveHour />} />
        <Route path="editstadium/:stad_Id" element={<EditStadium />} />
        <Route
          path="playerreservation/:stad_Id"
          element={<PlayerReservation />}
        />{" "}
        <Route
          path="playerreservationn/:stad_Id"
          element={<PlayerReservationn />}
        />
        <Route
          path="ownerstadiumdetail/:stad_Id"
          element={<OwnerStadiumDetail />}
        />
        <Route path="Join/:stad_Id" element={<Join />} />
        <Route path="reserveo" element={<Reserveo />} />
        <Route path="rateofplayer/:stad_Id" element={<RateOfPlayer />} />
        <Route
          path="rateofgoalkeeper/:stad_Id"
          element={<RateOfGoalKeeper />}
        />
        <Route path="detailsteam/:stad_Id" element={<DetailTeam />} />
        <Route path="stadiumfeedback/:stad_Id" element={<StadiumAnalysis />} />
        <Route path="showmap" element={<Showmap />} />
        <Route path="analysisstadium/:stad_Id" element={<AnalysisStadium />} />
        <Route path="addreview/:stad_Id" element={<AddReview />} />
      </Routes>
    </div>
  );
}

export default App;
