import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SignupForm from "../features/authentication/SignupForm";

function NewUsers() {
  return (
    <>
      <Row>
        <Heading as="h1">Create a new user</Heading>
      </Row>
      <SignupForm />
    </>
  );
}

export default NewUsers;
