import * as Yup from 'yup';
export const UserSchema = Yup.object().shape({
    first_name: Yup.string()
    .matches(/^[A-Za-z]+$/,{message:"Should contain alphabets only"})
    .min(1, 'Too Short!')
    .required('Required Field'),
    last_name: Yup.string()
    .matches(/^[A-Za-z]+$/,{message:"Should contain alphabets only"})
    .min(1, 'Too Short!')
    .max(80,'Too Long!')
    .required('Required Field'),
    email: Yup.string()
    .email('Enter Valid Email ID')
    .required(),
    jobs_count: Yup.number().typeError("enter number only").min(0).positive('Should be minimum 1').integer("Must be an Integer").default(0)
    .required(),
    slack_username: Yup.string().min(9,'Must be minimum of 9 characters').max(9,'Must be maximum of 9 characters').matches(/^[a-zA-Z0-9\-_]{0,40}$/,{message:'invalid format'})
});


export const LoginSchema = Yup.object().shape({
    email: Yup.string()
    .email('Enter Valid Email ID')
    .required(),
    password: Yup.string()
    .matches(/^\S*$/,'Password cannot contain spaces')
    .min(5,'Password is too short')
    .required("Password cannot be empty")
});

