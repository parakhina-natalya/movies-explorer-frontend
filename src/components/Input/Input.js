import './Input.css';

function Input(props) {

  return (
    <>
      <label className="label" htmlFor={`${props.name}`}>{`${props.label}`}
        <input className="input" type={`${props.type}`} id={`${props.name}`}
          name={`${props.name}`} placeholder={`${props.placeholder}`}
          required minLength={`${props.minLength}`} maxLength={`${props.maxLength}`} />
      </label>
      <span className="form__error"></span>
    </>
  );
}

export default Input;