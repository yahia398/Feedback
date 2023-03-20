import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";

import FeedbackContext from "../context/FeedbackContext";

const FeedbackForm = () => {
    const [text, setText] = useState("");
    const [rating, setRating] = useState();
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState("");
    const { addFeedBack, feedbackEdit, updateFeedback } =
        useContext(FeedbackContext);

    useEffect(() => {
        if (feedbackEdit.editMode === true) {
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
            setBtnDisabled(false);
        }
    }, [feedbackEdit]);

    const handleChange = (e) => {
        setText(e.target.value);
        if (text === "") {
            setBtnDisabled(true);
            setMessage(null);
        } else if (text !== "" && text.trim().length < 10) {
            setBtnDisabled(true);
            setMessage("Text must be at least 10 characters");
        } else if (text.trim().length > 1000) {
            setBtnDisabled(true);
            setMessage("Text must be at most 1000 characters");
        } else {
            setBtnDisabled(false);
            setMessage(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length >= 10 && rating !== undefined) {
            const newFeedback = {
                rating,
                text,
            };
            if (feedbackEdit.editMode === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback);
            } else {
                addFeedBack(newFeedback);
            }
            setText("");
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>What do you think about our service?</h2>
                <RatingSelect select={(rating) => setRating(rating)} />
                <div className="input-group">
                    <input
                        onChange={handleChange}
                        type="text"
                        placeholder="Write your thoughts..."
                        value={text}
                    />
                    <Button type="submit" isDisabled={btnDisabled}>
                        Send
                    </Button>
                </div>
                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    );
};

FeedbackForm.propTypes = {
    text: PropTypes.string,
    rating: PropTypes.number,
    btnDisabled: PropTypes.bool,
    message: PropTypes.string,
};

export default FeedbackForm;
