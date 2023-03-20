import React, { useContext } from "react";
import PropTypes from "prop-types";
import FeedbackItem from "./FeedbackItem";
import { motion, AnimatePresence } from "framer-motion";
import FeedbackContext from "../context/FeedbackContext";

const FeedbackList = () => {
    const { feedback } = useContext(FeedbackContext);
    if (feedback.length === 0) {
        return <p>No Feedbacks Yet!</p>;
    }
    return (
        <div className="feedback-list">
            <AnimatePresence>
                {feedback.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <FeedbackItem key={item.id} item={item} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

FeedbackList.propTypes = {
    feedback: PropTypes.array,
};

export default FeedbackList;
