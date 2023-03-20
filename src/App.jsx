import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";

import AboutPage from "./components/Pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";

import { FeedbackProvider } from "./context/FeedbackContext";

const App = () => {
    return (
        <>
            <Header />
            <FeedbackProvider>
                <BrowserRouter>
                    <div className="container">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <>
                                        <FeedbackForm />
                                        <FeedbackStats />
                                        <FeedbackList />
                                        <AboutIconLink />
                                    </>
                                }
                            />
                            <Route path="/about" element={<AboutPage />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </FeedbackProvider>
        </>
    );
};

export default App;
