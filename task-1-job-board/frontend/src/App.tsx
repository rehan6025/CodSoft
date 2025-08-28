import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

function AppContent() {
    return (
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
                path="/*"
                element={
                    <Layout>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/jobs"
                                element={
                                    <ProtectedRoute>
                                        <JobsPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </Routes>
                    </Layout>
                }
            />
        </Routes>
    );
}

function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}

export default App;
