import Form from "../Form/Form";
import ValidativeInput from "../ValidativeInput/ValidativeInput";
import "./Profile.css";

function Profile() {
  return(
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий</h2>
      <Form isForEdit={true} navLink="/">
        <ValidativeInput type="email" />
      </Form>
    </section>
  );
}

export default Profile;