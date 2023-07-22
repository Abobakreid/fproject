import * as yup from "yup";

const passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
// min 5 characters 1, 1 upper case , 1 lower case, 1 numeric digit

const passphone = /^01[0125][0-9]{8}$/;
// 011 or 012 015 and 8 number

const rangeTime = /\b([1-9]|1[0-2])\b/;

export const BaseSchema = yup.object().shape({
  name: yup.string().required("Required"),
  lastname: yup.string().required("Required"),
  country: yup.string().required("Required"),
  city: yup.string().required("Required"),
  street: yup.string().required("Required"),
  birthdate: yup.string().required("Required"),
  phoneNumber: yup
    .string()
    .matches(passphone, { message: "Your should start with 01" })
    .required("Required"),
  email: yup.string().email("Please Enter Email").required("Required"),
  password: yup
    .string()
    .min(8, "Sorry,Must be at Least 8 characters")
    .matches(passReg, { message: "Please Enter Strong Password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password Must Match"),
  position: yup
    .number()
    .required("Required")
    .oneOf([3, 0, 2, -1], "Select Correct Position")
    .typeError("Select Correct Position"),
});

// export const BaseSchemaupdate = yup.object().shape({
//   name: yup.string().required("Required"),
//   country: yup.string().required("Required"),
//   city: yup.string().required("Required"),
//   street: yup.string().required("Required"),
//   birthdate: yup.string().required("Required"),
//   phoneNumber: yup
//     .string()
//     .matches(passphone, { message: "Your should start with 01" })
//     .required("Required"),
//   email: yup.string().email("Please Enter Email").required("Required"),
//   password: yup
//     .string()
//     .min(8, "Sorry,Must be at Least 8 characters")
//     .matches(passReg, { message: "Please Enter Strong Password" })
//     .required("Required"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("password"), null], "Password Must Match"),
//   position: yup.string().required("Required"),
// });

export const BaseSchemaowner = yup.object().shape({
  name: yup.string().required("Required"),
  lastname: yup.string().required("Required"),
  country: yup.string().required("Required"),
  city: yup.string().required("Required"),
  street: yup.string().required("Required"),
  birthdate: yup.string().required("Required"),
  phoneNumber: yup
    .string()
    .matches(passphone, { message: "Your should start with 01" })
    .required("Required"),
  email: yup.string().email("Please Enter Email").required("Required"),
  password: yup
    .string()
    .min(8, "Sorry,Must be at Least 8 characters")
    .matches(passReg, { message: "Please Enter Strong Password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password Must Match"),
});

// export const BaseSchemaupdateowner = yup.object().shape({
//   name: yup.string().required("Required"),
//   lastname: yup.string().required("Required"),
//   country: yup.string().required("Required"),
//   city: yup.string().required("Required"),
//   street: yup.string().required("Required"),
//   phoneNumber: yup
//     .string()
//     .matches(passphone, { message: "Your should start with 01" })
//     .required("Required"),
//   email: yup.string().email("Please Enter Email").required("Required"),
//   password: yup
//     .string()
//     .min(8, "Sorry,Must be at Least 8 characters")
//     .matches(passReg, { message: "Please Enter Strong Password" })
//     .required("Required"),
// });

export const changePasswordPlayer = yup.object().shape({
  oldPassword: yup
    .string()
    .min(8, "Sorry,Must be at Least 8 characters")
    .required("Required"),
  newPassword: yup
    .string()
    .min(8, "Sorry,Must be at Least 8 characters")
    .matches(passReg, { message: "Please Enter Strong Password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Password Must Match"),
});

export const changePasswordOwner = yup.object().shape({
  oldPassword: yup
    .string()
    .min(8, "Sorry,Must be at Least 8 characters")
    .required("Required"),
  newPassword: yup
    .string()
    .min(8, "Sorry,Must be at Least 8 characters")
    .matches(passReg, { message: "Please Enter Strong Password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Password Must Match"),
});

export const schemaAddStadium = yup.object().shape({
  name: yup.string().required("Required").typeError("Amount must be a number"),
  end: yup
    .number()
    .required("Required")
    .oneOf(
      [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24,
      ],
      "From 1 to 12"
    )
    .typeError("Amount must be a number"),
  start: yup
    .number()
    .required("Required")
    .oneOf(
      [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24,
      ],
      "From 1 to 12"
    )
    .typeError("Amount must be a number"),
  pricing: yup.number().required("Required"),
  location: yup.string().required("Required"),
  cafeteria: yup.bool(),
  changingRoom: yup.bool(),
  parking: yup.bool(),
});

export const schemaPlayerRate = yup.object().shape({
  Pace: yup
    .number()
    .required("Required")
    .oneOf([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "From 1 to 12"),
  Defending: yup
    .number()
    .required("Required")
    .oneOf([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "From 1 to 12"),
  Passing: yup
    .number()
    .required("Required")
    .oneOf([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "From 1 to 12"),
  Shooting: yup
    .number()
    .required("Required")
    .oneOf([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "From 1 to 12"),
  Dribbling: yup
    .number()
    .required("Required")
    .oneOf([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "From 1 to 12"),
});
export const schemaGoalkeeperRate = yup.object().shape({
  Pace: yup
    .number()
    .required("Required")
    .oneOf([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "From 1 to 12"),
  Defending: yup
    .number()
    .required("Required")
    .oneOf([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "From 1 to 12"),
  Passing: yup
    .number()
    .required("Required")
    .oneOf([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "From 1 to 12"),
  Shooting: yup
    .number()
    .required("Required")
    .oneOf([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "From 1 to 12"),
  Dribbling: yup
    .number()
    .required("Required")
    .oneOf([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "From 1 to 12"),
});

