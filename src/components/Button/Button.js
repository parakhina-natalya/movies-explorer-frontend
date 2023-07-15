import './Button.css';

function Button(props) {
  return (
    <button className="button" type="button" disabled={props.disabled} onClick={props.onClick}>{props.button}</button >
  );
}

export default Button;