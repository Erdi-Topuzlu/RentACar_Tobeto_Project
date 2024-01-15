import {ErrorMessage, Field} from "formik";


const FormikInput = (props) => {
	return (
		<div className="mb-3">
			<label className="form-label">{props.label}</label>
			<Field
				name={props.name}
				type={props.type || "text"}
				className="form-control"
                placeHolder={props.place || ""}
			/>
			<ErrorMessage name={props.name}>
				{message => <p className="text-danger">{message}</p>}
			</ErrorMessage>
		</div>
	);
};

export default FormikInput;