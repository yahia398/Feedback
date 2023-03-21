import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        editMode: false,
    });

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        await fetch("/feedback") //await fetch("/feedback?_sort=rating&_order=desc")
            .then((response) => response.json())
            .then((data) => setFeedback(data));
        setIsLoading(false);
    };

    const addFeedBack = async (newFeedback) => {
        await fetch("/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFeedback),
        })
            .then((response) => response.json())
            .then((result) => setFeedback([result, ...feedback]));
    };

    const deleteFeedback = async (id) => {
        await fetch(`/feedback/${id}`, { method: "DELETE" });
        setFeedback(feedback.filter((item) => item.id !== id));
    };

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            editMode: true,
        });
    };

    const updateFeedback = async (id, updatedItem) => {
        await fetch(`/feedback/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedItem),
        })
            .then((response) => response.json())
            .then((result) =>
                setFeedback(
                    feedback.map((item) =>
                        item.id === id ? { ...item, ...result } : item
                    )
                )
            );

        feedback.filter((item) => item.id !== id);

        setFeedbackEdit({
            item: {},
            editMode: false,
        });
    };

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                feedbackEdit,
                isLoading,
                deleteFeedback,
                addFeedBack,
                editFeedback,
                updateFeedback,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;
