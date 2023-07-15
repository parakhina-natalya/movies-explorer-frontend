import './Input.css';

function Input(props) {

  return (
    <>
      <label className={`${props.classNameLabel}`} htmlFor={`${props.name}`}>{`${props.label}`}
        <input className={`${props.classNameInput}`}
          type={`${props.type}`}
          id={`${props.name}`}
          name={`${props.name}`}
          value={`${props.value}`}
          placeholder={`${props.placeholder}`}
          onChange={props.onChange}
          onInput={props.onInput}
          disabled={props.disabled}
        />
      </label>
      <span className="form__error">{`${props.error}`}</span>
    </>
  );
}

export default Input;