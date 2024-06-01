import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdateUserPass from "../features/authentication/UpdatePasswordForm";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row type="vertical">
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row type="vertical">
        <Heading as="h3">Update password</Heading>
        <UpdateUserPass />
      </Row>
    </>
  );
}

export default Account;
