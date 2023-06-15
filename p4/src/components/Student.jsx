function Student(props) {
  var interest = props.interests.map((inter, idx) => {
    return <li key={idx}>{inter}</li>;
  });
  return (
    <div>
      <h2>
        {props.name.first} {props.name.last}
      </h2>
      <h5>
        <p>
          <strong>{props.major}</strong>
        </p>
      </h5>
      <p>
        {props.name.first} is taking {props.numCredits} and is
        {props.fromWisconsin ? " from Wisconsin" : " not from Wisconsin"}
      </p>

      <div>
        They have {props.interests.length} interests including..
        <ul>{interest}</ul>
      </div>
    </div>
  );
}

export default Student;
