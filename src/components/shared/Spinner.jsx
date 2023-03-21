import spinner from "../../assets/spinner.gif";

const Spinner = () => {
    return (
        <img
            src={spinner}
            alt="Loading..."
            style={{
                height: "100px",
                width: "100px",
                display: "block",
                margin: "auto",
            }}
        />
    );
};

export default Spinner;
