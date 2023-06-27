import './Button.css';

function Button(props) {
  return (
    <button className="button" type="submit" onClick={props.onClick}>{props.button}</button >
  );
}

export default Button;