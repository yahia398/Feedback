import PropTypes from "prop-types";
const Card = ({ children, isReversed }) => {
    return <div className={`card ${isReversed && "reverse"}`}>{children}</div>;
};

Card.defaultProps = {
    isReversed: false,
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    isReversed: PropTypes.bool.isRequired,
};
export default Card;
