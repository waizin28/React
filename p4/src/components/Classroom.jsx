import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Student from "./Student";

const Classroom = () => {
  const [students, setStudent] = useState([]);
  const [studentName, setStuName] = useState("");
  const [studentMajor, setStuMajor] = useState("");
  const [studentInterest, setStuInt] = useState("");
  const [shownStudents, setShownStudents] = useState([]);

  useEffect(() => {
    fetch("https://cs571.org/s23/hw4/api/students", {
      headers: {
        "X-CS571-ID": "bid_d5f87cfbd68cea89ba78",
      },
    })
      .then((res) => res.json())
      .then((studentData) => {
        setStudent(studentData);
        setShownStudents(studentData);
        console.log(studentData);
      });
  }, []);

  function filterName(student) {
    let searchName = studentName
      .toLowerCase()
      .split(" ")
      .filter(function (token) {
        return token.trim() !== "";
      });

    if (
      student.name.first.toLowerCase().includes(searchName) ||
      student.name.last.toLowerCase().includes(searchName)
    ) {
      return student;
    }
  }

  function filterMajor(student) {
    let searchMajor = studentMajor
      .toLowerCase()
      .split(" ")
      .filter(function (token) {
        return token.trim() !== "";
      });

    if (student.major.toLowerCase().includes(searchMajor)) {
      return student;
    }
  }

  function filterInterest(student) {
    let searchInterest = studentInterest
      .toLowerCase()
      .split(" ")
      .filter(function (token) {
        return token.trim() !== "";
      });

    if (
      student.interests
        .map((interest) => interest.toLowerCase().includes(searchInterest))
        .includes(true)
    ) {
      // same interest, noting else inputted
      return student;
    }
  }

  const resetField = () => {
    setStuName("");
    setStuMajor("");
    setStuInt("");
    setStudent(shownStudents);
  };

  const search = () => {
    let matchedStudents = shownStudents
      .filter(filterName)
      .filter(filterMajor)
      .filter(filterInterest);
    setStudent(matchedStudents);
  };

  useEffect(search, [studentName, studentMajor, studentInterest]);

  return (
    <div>
      <Form>
        <Form.Label htmlFor="searchName">Name</Form.Label>
        <Form.Control
          id="searchName"
          value={studentName}
          onChange={(e) => {
            setStuName(e.target.value);
          }}
        />
        <Form.Label htmlFor="searchMajor">Major</Form.Label>
        <Form.Control
          id="searchMajor"
          value={studentMajor}
          onChange={(e) => {
            setStuMajor(e.target.value);
          }}
        />
        <Form.Label htmlFor="searchInterest">Interest</Form.Label>
        <Form.Control
          id="searchInterest"
          value={studentInterest}
          onChange={(e) => {
            setStuInt(e.target.value);
          }}
        />
        <br />
        <Button variant="neutral" onClick={(e) => resetField()}>
          Reset Search
        </Button>
      </Form>
      <Container fluid>
        <Row>
          {students.map((student) => {
            return (
              <Col xs={12} sm={6} md={4} lg={3} xl={2} key={student.id}>
                <Student {...student}></Student>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Classroom;
