import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BuilderPage from './pages/BuilderPage';
import ChooseTemplateStep from './pages/builder-steps/ChooseTemplateStep';
import EditResumeStep from './pages/builder-steps/EditResumeStep';
import DownloadResumeStep from './pages/builder-steps/DownloadResumeStep';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/builder" element={<BuilderPage />}>
        <Route index element={<Navigate to="/builder/choose" replace />} />
        <Route path="choose" element={<ChooseTemplateStep />} />
        <Route path="details" element={<EditResumeStep />} />
        <Route path="download" element={<DownloadResumeStep />} />
      </Route>
    </Routes>
  );
}

export default App;
