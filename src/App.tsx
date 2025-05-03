import "@/App.css";
import Layout from "@/components/global/layout";
import { Route, Routes } from "react-router";
import Boost from "@/pages/boost/boost";
import Home from "@/pages/home/home";
import Booster from "@/pages/booster/page";
import Check from "@/pages/check/page";
import Game from "@/pages/drive/page";
import FAQ from "@/pages/faq/page";
import Finance from "@/pages/finance/page";
import Friends from "@/pages/friends/page";
import History from "@/pages/history/page";
import Level from "@/pages/level/page";
import Partnership from "@/pages/partnership/page";
import Tasks from "@/pages/tasks/page";
import Tournament from "@/pages/tournament/page";
import AuthGate from "@/components/auth/authGate"; // 💡 новый

function App() {
  return (
    <Layout>
      <AuthGate>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boost" element={<Boost />} />
          <Route path="/booster" element={<Booster />} />
          <Route path="/check" element={<Check />} />
          <Route path="/drive" element={<Game />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/history" element={<History />} />
          <Route path="/level" element={<Level />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tournament" element={<Tournament />} />
        </Routes>
      </AuthGate>
    </Layout>
  );
}

export default App;
