function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
      style={{backgroundColor: props.backgroundColor}}
    >
      {props.value}
    </button>
  );
}

export default Square;
