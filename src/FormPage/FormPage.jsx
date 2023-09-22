import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";

import "./FormPage.scss";

const FormPage = () => {
  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{
          radioBtnsType: "",
          selectedValue: "",
          enteredStrValue: "",
        }}
        validationSchema={Yup.object({
          radioBtnsType: Yup.string()
            .typeError("You've entered not string")
            .oneOf(["select", "str-input"], "You've not chosen the option")
            .required("You've not chosen the option"),
          selectedValue: Yup.string().when("radioBtnsType", {
            is: (val) => val === "select",
            then: (schema) =>
              schema
                .typeError("You've entered not string")
                .oneOf(
                  ["Apple", "Banana", "Lemon"],
                  "You've not chosen the fruit"
                )
                .required("You've not chosen the fruit"),
          }),
          enteredStrValue: Yup.string().when("radioBtnsType", {
            is: (val) => val === "str-input",
            then: (schema) =>
              schema
                .typeError("You've entered not string")
                .min(3, "Enter at least 3 symbols")
                .max(20, "Enter not more than 20 symbols")
                .required("This field is must have"),
          }),
        })}
        onSubmit={(
          { radioBtnsType, selectedValue, enteredStrValue },
          { resetForm }
        ) => {
          /* Some submitting */
          console.log("SUMBIT!!!");
        }}
      >
        {({ values, errors }) => (
          <Form action="#" className="form">
            <h2 className="form__headline">Choose the way of input:</h2>
            <FormikErrorMessage
              component="span"
              name="radioBtnsType"
              className="form__error-text"
            />
            <div role="group" className="form__radio-group-wrapper">
              <label className="form__radio-label">
                <Field type="radio" name="radioBtnsType" value="select" />
                Select the fruit
              </label>
              <label className="form__radio-label">
                <Field type="radio" name="radioBtnsType" value="str-input" />
                Enter own string with fruit
              </label>
            </div>
            {values.radioBtnsType === "select" ? (
              <>
                <FormikErrorMessage
                  component="span"
                  name="selectedValue"
                  className="form__error-text"
                />
                <Field
                  as="select"
                  id="selectedValue"
                  name="selectedValue"
                  className="form__select-fruit"
                >
                  <option value="" hidden>
                    Choose the fruit
                  </option>
                  <option value="Apple">Apple</option>
                  <option value="Banana">Banana</option>
                  <option value="Lemon">Lemon</option>
                </Field>
              </>
            ) : values.radioBtnsType === "str-input" ? (
              <>
                <FormikErrorMessage
                  component="span"
                  name="enteredStrValue"
                  className="form__error-text"
                />
                <Field
                  id="enteredStrValue"
                  name="enteredStrValue"
                  className="form__fruit-str-input"
                  placeholder="Enter your own fruit"
                  required
                />
              </>
            ) : null}
            <button type="submit" className="form__sumbit-btn">
              Choose
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormPage;
