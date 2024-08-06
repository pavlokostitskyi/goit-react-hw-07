import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { addContact } from '../../redux/contactsOps';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  number: Yup.string().required('Required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={styles.contactForm}>
          <label htmlFor="name">Name</label>
          <Field name="name" />
          {errors.name && touched.name ? <div>{errors.name}</div> : null}

          <label htmlFor="number">Number</label>
          <Field name="number" />
          {errors.number && touched.number ? <div>{errors.number}</div> : null}

          <button type="submit">Add Contact</button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
