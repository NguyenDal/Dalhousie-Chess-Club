import React, { useEffect } from 'react';
import './App.css';
import Tournaments from './pages/tournaments.js';
import PastTournaments from "./pages/pastTournaments";
import NewsPage from './pages/news.js';
import NavBar from './pages/navbar';
import Footer from './pages/footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Improve from "./pages/improve";
import Library from "./pages/library";
import AboutUsPage from "./pages/about-us";
import FAQpage from "./pages/faq";
import ChessForWellness from './pages/ChessForWellness.js'; 
import { Suspense } from "react";
import HomePage from "./pages/Home";
import AdminLogin from './pages/adminLogin.js';
import AdminLanding from './pages/adminLanding.js';
import EditTournaments from './pages/editPage-tournaments.js';
import EditAbout from './pages/editPage-about.js';
import EditLibrary from './pages/editPage-library.js';
import EditFaq from './pages/editPage-faq.js';
import EditTrainer from './pages/editPage-trainers.js';
import EditEvent from './pages/editPage-events.js';
import EditNews from './pages/editPage-news.js';
import AddFormAboutUs from './forms/AboutUs-AddForm.js';
import HomeAddForm from './forms/Home-AddForm.js';
import TournamentsAddForm from './forms/Tournaments-AddForm.js';
import FAQAddForm from './forms/FAQ-AddForm.js';
import NewsAddForm from './forms/News-AddForm.js';
import ExecVolunteerAddForm from './forms/execForm.js';
import TrainersAddForm from './forms/Trainers-AddForm.js';
import EventsAddForm from './forms/Events-AddForm.js';
import LibraryAddForm from './forms/Library_AddForm.js';
import ForgotPassword from './pages/forgotPassword.js';
import ResetPassword from './pages/resetPassword.js';
import AuthGuard from './components/AuthGuard.js';
import { AuthProvider } from './contexts/AuthContext';
import MailingList from './pages/mailingList.js';
import Subscribers from './pages/subscribers.js';
import SubscribersDeleteForm from './pages/subscribersDeleteForm.js';
import DeleteForm from './pages/deleteForm.js';
import RegistrationForm from './pages/tournamentRegistration.js';
import DalhousieOpenRegistration from './pages/dalhousieOpen.js';
import TournamentInfo from './pages/tournamentInfo.js';
import Champions from './pages/champions.js';
import ChampionsAddForm from './forms/Champions-AddForm.js';
import ChampionsEditForm from './forms/Champions-EditForm.js';
import EditTips from './forms/tips-editForm.js';
import AddTips from './forms/tips-addForm.js';
import EventInfo from './pages/eventInfo.js';
import EditScore from './forms/score-editForm.js';
import AddScore from './forms/score-addForm.js';
import EditTournamentResult from './forms/editTournamentResult.js'
import TrainersEditForm from './forms/editForm-trainers.js';
import AboutUsEditForm from './forms/editForm-about.js';
import EventsEditForm from './forms/editForm-events.js';
import FaqEditForm from './forms/editForm-faq.js';
import LibraryEditForm from './forms/editForm-library.js';
import TournamentsEditForm from './forms/editForm-tournaments.js';
import LiveTournamentsEditForm from './forms/editForm-liveTournament.js';
import TournamentParticipants from "./pages/tournamentParticipants";
import NewsEditForm from './forms/editForm-news.js';
import GrandPrixForm from './pages/grandPrixForm'; 
import GrandPrixPage from './grandPrixPage.js'; 
import { IframeProvider } from './pages/IframeContext.js';
import UsersChampions from './pages/usersChampions';
import DailyTips from './pages/dailyTips';
import TournamentPopUp from './tournamentPopUp';
import VolunteerPage from './pages/volunteer.js';
import VolunteerForm  from './forms/volunteerForm.js';
import EditVolunteerForm from './forms/editVolunteerForm.js';
import EditVolunteer from './pages/editVolunteer.js';
import DCCExecsPage from './pages/editDCCExecs.js';
import EditExecForm from './forms/editDCCExecsForm.js';
import EditEmails from './pages/EditEmails.js';
import EditEmailForm from './pages/editForm-emails.js';
import EditConstitution from './pages/editConstitution';
import ParticipantApproval from './pages/ParticipantApproval.js';
import AddEmailForm from './pages/AddEmailForm.js';
import Constitutions from './pages/Constitutions.js';



function App() {
  // useEffect(() => {
  //   fetch('http://localhost:5000/api/data')
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  return (
    <div className="App">
      <IframeProvider>
      <AuthProvider>
        <Suspense fallback="loading ...">
          <Router basename='/chessclub'>
            <NavBar />
            <div className="wrapper">
             <main className="content">
            <Routes>
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/pastTournaments" element={<PastTournaments />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/library" element={<Library />} />
              <Route path="/improve" element={<Improve />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/faq" element={<FAQpage />} /> 
              <Route path="/chess-for-wellness" element={<ChessForWellness />} /> 
              <Route path="/adminLogin" element={<AdminLogin />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/mailingList" element={<MailingList />} />
              <Route path="/tournamentRegistration" element={<RegistrationForm />} />
              <Route path="/dalhousieOpen" element={<DalhousieOpenRegistration />} />
              <Route path="/tournamentInfo" element={<TournamentInfo />} />
              <Route path="/grandPrixPage" element={<GrandPrixPage />} />
              <Route path="/usersChampions" element={<UsersChampions />} />
              <Route path="/eventInfo" element={<EventInfo />} />
              <Route path="/champions" element={<Champions />} />
              <Route path="/usersChampions" element={<UsersChampions />} />
              <Route path="/dailyTips" element={<DailyTips />} />
              <Route path="/tournamentPopUp" element={<TournamentPopUp />} />
              <Route path="/score-editForm" element={<EditScore />} />
              <Route path="/execForm" element={<ExecVolunteerAddForm />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/volunteerForm" element={<VolunteerForm />} />
              <Route path="/Constitutions" element={<Constitutions />} />

              

           

              {/* Admin only Routes */}
              <Route path="/adminLanding" element={<AuthGuard><AdminLanding /></AuthGuard>} />
              <Route path="/AboutUs-AddForm" element={<AuthGuard><AddFormAboutUs /></AuthGuard>} />
              <Route path="/Home-AddForm" element={<AuthGuard><HomeAddForm /></AuthGuard>} />
              <Route path="/Tournaments-AddForm" element={<AuthGuard><TournamentsAddForm /></AuthGuard>} />
              <Route path="/FAQ-AddForm" element={<AuthGuard><FAQAddForm /></AuthGuard>} />
              <Route path="/News-AddForm" element={<AuthGuard><NewsAddForm /></AuthGuard>} />
              <Route path="/Trainers-AddForm" element={<AuthGuard><TrainersAddForm /></AuthGuard>} />
              <Route path="/Events-AddForm" element={<AuthGuard><EventsAddForm /></AuthGuard>} />
              <Route path="/Library-AddForm" element={<AuthGuard><LibraryAddForm /></AuthGuard>} />
              <Route path="/editTournaments" element={<AuthGuard><EditTournaments /></AuthGuard>} />
              <Route path="/editAbout" element={<AuthGuard><EditAbout /></AuthGuard>} />
              <Route path="/editLibrary" element={<AuthGuard><EditLibrary /></AuthGuard>} />
              <Route path="/editNews" element={<AuthGuard><EditNews /></AuthGuard>} />
              <Route path="/editFaq" element={<AuthGuard><EditFaq /></AuthGuard>} />
              <Route path="/editTrainer" element={<AuthGuard><EditTrainer /></AuthGuard>} />
              <Route path="/editEvent" element={<AuthGuard><EditEvent /></AuthGuard>} />
              <Route path="/editForm-trainers" element={<AuthGuard><TrainersEditForm /></AuthGuard>} />
              <Route path="/editForm-about" element={<AuthGuard><AboutUsEditForm /></AuthGuard>} />
              <Route path="/editForm-events" element={<AuthGuard><EventsEditForm /></AuthGuard>} />
              <Route path="/editForm-faq" element={<AuthGuard><FaqEditForm /></AuthGuard>} />
              <Route path="/editForm-news" element={<AuthGuard><NewsEditForm /></AuthGuard>} />
              <Route path="/editForm-library" element={<AuthGuard><LibraryEditForm /></AuthGuard>} />
              <Route path="/editForm-tournaments" element={<AuthGuard><TournamentsEditForm /></AuthGuard>} />
              <Route path="/editForm-liveTournament" element={<AuthGuard><LiveTournamentsEditForm /></AuthGuard>} />
              <Route path="/editForm-tournamentParticipants" element={<AuthGuard><TournamentParticipants /></AuthGuard>} />
              <Route path="/subscribersDeleteForm" element={<AuthGuard><SubscribersDeleteForm /></AuthGuard>} />
              <Route path="/deleteForm" element={<AuthGuard><DeleteForm /></AuthGuard>} />
              <Route path="/subscribers" element={<AuthGuard><Subscribers /></AuthGuard>} />
              <Route path="/grandPrixForm" element={<AuthGuard><GrandPrixForm /></AuthGuard>} />
              <Route path="/Champions-AddForm" element={<AuthGuard><ChampionsAddForm /></AuthGuard>} />
              <Route path="/Champions-EditForm" element={<AuthGuard><ChampionsEditForm /></AuthGuard>} />
              <Route path="/champions" element={<AuthGuard><Champions /></AuthGuard>} />
              <Route path="/tips-editForm" element={<AuthGuard><EditTips /></AuthGuard>} />
              <Route path="/tips-editForm/:id" element={<AuthGuard><EditTips /></AuthGuard>} />
              <Route path="/tips-addForm" element={<AuthGuard><AddTips /></AuthGuard>} />
              <Route path="/score-addForm" element={<AuthGuard><AddScore /></AuthGuard>} />
              
              <Route path="/editTournamentResult/:resultID" element={<AuthGuard><EditTournamentResult /></AuthGuard>} />

              <Route path="/editVolunteerForm" element={<AuthGuard><EditVolunteerForm /></AuthGuard>} />
              <Route path="/editVolunteer" element={<AuthGuard><EditVolunteer /></AuthGuard>} />
              <Route path="/editDCCExecsForm" element={<AuthGuard><EditExecForm /></AuthGuard>} />
              <Route path="/editDCCExecs" element={<AuthGuard><DCCExecsPage /></AuthGuard>} />
              <Route path="/EditEmails" element={<AuthGuard><EditEmails /></AuthGuard>} />
              <Route path="/editForm-emails" element={<EditEmailForm />} />
              <Route path="/editConstitution" element={<AuthGuard><EditConstitution /></AuthGuard>} />

              <Route path="/participant-approval" element={<AuthGuard><ParticipantApproval/></AuthGuard>} />
              <Route path="/AddEmailForm" element={<AuthGuard><AddEmailForm /></AuthGuard>} />  
            </Routes>
            </main>
             <footer className="footer">
          <Footer/>
             </footer>
            </div>
          </Router>
        </Suspense>
      </AuthProvider>
      </IframeProvider>
    </div>
  );
}
export default App;

