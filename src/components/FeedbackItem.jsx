import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import Card from "./shared/Card";
import { FaTimes, FaEdit } from "react-icons/fa";

import FeedbackContext from "../context/FeedbackContext";

const FeedbackItem = ({ item }) => {
    const { deleteFeedback, editFeedback } = useContext(FeedbackContext);
    const [rating, setRating] = useState(item.rating);
    const [text, setText] = useState(item.text);

    useEffect(() => {
        setRating(item.rating);
        setText(item.text);
    }, [item.rating, item.text]);
    return (
        <Card>
            <div className="num-display">{rating}</div>
            <button onClick={() => deleteFeedback(item.id)} className="close">
                <FaTimes color="#ff6a95" />
            </button>
            <button onClick={() => editFeedback(item)} className="edit">
                <FaEdit color="#ff6a95" />
            </button>
            <div className="text-display">{text}</div>
        </Card>
    );
};
FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default FeedbackItem;
