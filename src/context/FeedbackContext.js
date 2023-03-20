import { createContext, useState } from "react";
import FeedbackData from "./../data/FeedbackData";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState(FeedbackData);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        editMode: false,
    });

    const addFeedBack = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
    };

    const deleteFeedback = (id) => {
        setFeedback(feedback.filter((item) => item.id !== id));
    };

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            editMode: true,
        });
    };

    const updateFeedback = (id, updatedItem) => {
        feedback.filter((item) => item.id !== id);
        setFeedback(
            feedback.map((item) =>
                item.id === id ? { ...item, ...updatedItem } : item
            )
        );
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
