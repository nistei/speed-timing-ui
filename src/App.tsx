import { Link, Route, Redirect } from "wouter";
import NewestView from "./views/newest/NewestView";
import AdminView from "./views/admin/AdminView";
import AthleteView from "./views/athletes/AthleteView";
import RankingView from "./views/ranking/RankingView";

export default function App() {
    return (
        <div>
            <div className="w-full h-12 bg-gray-800 text-white px-6 pt-3 flex flex-row">
                <Link href="/newest">
                    <a className="mx-2">Aktuell</a>
                </Link>
                <Link href="/ranking">
                    <a className="mx-2">Rangliste</a>
                </Link>
                <Link href="/admin">
                    <a className="mx-2">Admin</a>
                </Link>
            </div>

            <Route path="/">
                <Redirect to="/newest" />
            </Route>
            <Route path="/newest">
                <NewestView />
            </Route>
            <Route path="/ranking">
                <RankingView />
            </Route>
            <Route path="/admin">
                <AdminView />
            </Route>
            <Route path="/athletes/:athleteId">
                <AthleteView />
            </Route>
        </div>
    );
}
