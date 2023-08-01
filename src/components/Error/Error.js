import './Error.css';

function Error(props) {
  return (
    <span className="error">{props.submitError}</span>
  );
}

export default Error;