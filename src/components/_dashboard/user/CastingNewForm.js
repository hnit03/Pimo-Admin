import * as Yup from "yup";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { useSnackbar } from "notistack5";
import { useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import { makeStyles } from '@material-ui/styles';
// material
import { LoadingButton } from "@material-ui/lab";
import Chip from '@mui/material/Chip';
import {
   Box,
   Card,
   Grid,
   Stack,
   Switch,
   TextField,
   Typography,
   FormHelperText,
   FormControlLabel,
} from "@material-ui/core";
// utils
import { fData } from "../../../utils/formatNumber";
import fakeRequest from "../../../utils/fakeRequest";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
//
import Label from "../../Label";
import { UploadAvatar } from "../../upload";
import countries, { hairColor } from "./countries";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Slider from "@mui/material/Slider";
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';


// ----------------------------------------------------------------------

UserNewForm.propTypes = {
   isEdit: PropTypes.bool,
   currentUser: PropTypes.object,
};
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function UserNewForm({ isEdit, currentUser }) {
   const navigate = useNavigate();
   const [value, setValue] = React.useState(new Date());
   const { enqueueSnackbar } = useSnackbar();
   const [valueHeight, setValueHeight] = React.useState([160, 250]);
   const [valueAge, setValueAge] = React.useState([18, 100]);
   const [measure1, setMeaSure1] = React.useState([20, 47]);
   const [measure2, setMeaSure2] = React.useState([20, 45]);
   const [measure3, setMeaSure3] = React.useState([31, 50]);

   const handleChangeHeight = (event, newValue) => {
      setValueHeight(newValue);
   };
   const handleChangeAge = (event, newValue) => {
      setValueAge(newValue);
   };
   const handleChangeMeaSure1 = (event, newValue) => {
      setMeaSure1(newValue);
   };
   const handleChangeMeaSure2 = (event, newValue) => {
      setMeaSure2(newValue);
   };
   const handleChangeMeaSure3 = (event, newValue) => {
      setMeaSure3(newValue);
   };

   function valuetext(value) {
      return `${value}°C`;
   }
   const NewUserSchema = Yup.object().shape({
      name: Yup.string().required("Tên là bắt buộc"),
      email: Yup.string().required("Email là bắt buộc").email(),
      phoneNumber: Yup.string().required("Điện thoại là bắt buộc"),
      country: Yup.string().required("Quốc gia là bắt buộc"),
      role: Yup.string().required("Địa điểm là bắt buộc"),
      company: Yup.string().required("Công ty là bắt buộc"),
      state: Yup.string().required("Tỉnh là bắt buộc"),
      city: Yup.string().required("Thành phố là bắt buộc"),
      hairColor: Yup.string().required("Màu tóc là bắt buộc"),
      skinColor: Yup.string().required("Màu da là bắt buộc"),
      sex: Yup.string().required("Giới tính là bắt buộc"),
      style: Yup.string().required("Phong cách là bắt buộc"),
      //  role: Yup.string().required('Role Number is required'),
      avatarUrl: Yup.mixed().required("Avatar là bắt buộc"),
   });

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         name: currentUser?.name || "",
         email: currentUser?.email || "",
         phoneNumber: currentUser?.phoneNumber || "",
         address: currentUser?.address || "",
         country: currentUser?.country || "",
         state: currentUser?.state || "",
         city: currentUser?.city || "",
         zipCode: currentUser?.zipCode || "",
         avatarUrl: currentUser?.avatarUrl || null,
         isVerified: currentUser?.isVerified || true,
         status: currentUser?.status,
         company: currentUser?.company || "",
         role: currentUser?.role || "",
      },
      validationSchema: NewUserSchema,
      onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
         try {
            await fakeRequest(500);
            resetForm();
            setSubmitting(false);
            enqueueSnackbar(!isEdit ? "Create success" : "Update success", {
               variant: "success",
            });
            navigate(PATH_DASHBOARD.user.list);
         } catch (error) {
            console.error(error);
            setSubmitting(false);
            setErrors(error);
         }
      },
   });

   const {
      errors,
      values,
      touched,
      handleSubmit,
      isSubmitting,
      setFieldValue,
      getFieldProps,
   } = formik;

   let request = "";
   let count = 0;

   values.address.split('<br/>').map((line) => (line !== '') ? (request += (line + "\n"), count ++) : null);

   const handleDrop = useCallback(
      (acceptedFiles) => {
         const file = acceptedFiles[0];
         if (file) {
            setFieldValue("avatarUrl", {
               ...file,
               preview: URL.createObjectURL(file),
            });
         }
      },
      [setFieldValue],
   );

   const useStyles = makeStyles((theme) => ({
      disabledInput: {
         "& .MuiInputBase-root": {
            editable: false,
            disabled: true,
            pointerEvents: 'none',
            cursor: 'default'
         }
      }
   }))

   const classes = useStyles();

   return (
      <FormikProvider value={formik}>
         <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
               <Grid item xs={12} md={4}>
                  <Card sx={{ py: 10, px: 3 }}>

                     <Box sx={{ mb: 5 }}>
                        <UploadAvatar
                           accept="image/*"
                           file={values.avatarUrl}
                           maxSize={3145728}
                           onDrop={handleDrop}
                           error={Boolean(touched.avatarUrl && errors.avatarUrl)}
                           disabled={true}
                           caption={
                              <Typography
                                 variant="caption"
                                 sx={{
                                    mt: 2,
                                    mx: "auto",
                                    display: "block",
                                    textAlign: "center",
                                    color: "text.secondary",
                                 }}
                              >
                                 Cho phép file dạng *.jpeg, *.jpg, *.png, *.gif
                                 <br /> với kích thước tối đa {fData(3145728)}
                              </Typography>
                           }
                        />
                        <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                           {touched.avatarUrl && errors.avatarUrl}
                        </FormHelperText>
                     </Box>

                  </Card>
               </Grid>

               <Grid item xs={12} md={8}>
                  <Card sx={{ p: 3 }}>
                     <Stack spacing={3}>
                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={{ xs: 3, sm: 2 }}
                        >
                           <TextField
                              fullWidth
                              label="Tên chiến dịch"
                              {...getFieldProps("name")}
                              error={Boolean(touched.name && errors.name)}
                              helperText={touched.name && errors.name}
                              className={classes.disabledInput}
                           />
                           <TextField
                              fullWidth
                              label="Địa điểm"
                              placeholder="address"
                              {...getFieldProps("role")}
                              SelectProps={{ native: true }}
                              error={Boolean(touched.role && errors.role)}
                              helperText={touched.role && errors.role}
                              className={classes.disabledInput}
                           />
                        </Stack>

                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={{ xs: 3, sm: 2 }}
                        >
                           <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker
                                 inputFormat="dd/MM/yyyy hh:mm a"
                                 renderInput={(props) => (
                                    <TextField
                                       fullWidth
                                       {...props}
                                       className={classes.disabledInput}
                                    />
                                 )}
                                 label="thời gian bắt đầu"
                                 value={new Date(values.state)}
                                 onChange={(newValue) => {
                                    setValue(newValue);
                                 }}
                              />
                           </LocalizationProvider>
                           <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker
                                 inputFormat="dd/MM/yyyy hh:mm a"
                                 renderInput={(props) => (
                                    <TextField fullWidth {...props}
                                       className={classes.disabledInput} />
                                 )}
                                 label="thời gian kết thúc"
                                 value={new Date(values.zipCode)}
                                 onChange={(newValue) => {
                                    setValue(newValue);
                                 }}
                              />
                           </LocalizationProvider>
                        </Stack>

                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={{ xs: 3, sm: 2 }}
                        >
                           <p>Mức lương</p>
                        </Stack>

                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={{ xs: 3, sm: 2 }}
                           style={{ justifyContent: "center" }}
                        >
                           <Slider
                              style={{ width: "95%" }}
                              aria-label="Temperature"
                              defaultValue={values.isVerified}
                              color="secondary"
                              disabled={true}
                              valueLabelDisplay="on"
                              max={10000}
                              sx={{
                                 '& .MuiSlider-track': {
                                    color: '#00AB55'
                                 },
                                 '& .MuiSlider-thumb': {
                                    backgroundColor: '#00AB55',
                                 },
                                 '& .MuiSlider-rail': {
                                    opacity: 0.5,
                                    backgroundColor: '#bfbfbf',
                                 },
                              }}
                           />
                        </Stack>
                        <br />
                        Giới tính
                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={{ xs: 3, sm: 2 }}
                        >
                           {(values.city) ? (
                              values.city.map((item, index) => {
                                 return (

                                    <Chip
                                       label={item.genderName}
                                       // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                                       style={{ width: '15%', backgroundColor: '#00AB55', color: 'white' }}
                                    />
                                 )
                              })
                           ) : (console.log('null'))}
                        </Stack>
                        <br />
                        Phong cách
                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={{ xs: 3, sm: 2 }}
                        >
                           {(values.country) ? (
                              values.country.map((item, index) => {
                                 return (

                                    <Chip
                                       label={item.name}
                                       // onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                                       style={{ width: '15%', backgroundColor: '#00AB55', color: 'white' }}
                                    />
                                 )
                              })
                           ) : (console.log('null'))}
                        </Stack>
                        <TextField {...getFieldProps('phoneNumber')} fullWidth multiline minRows={4} maxRows={4} label="Mô tả"
                           className={classes.disabledInput} />
                        <TextField {...getFieldProps('address')} fullWidth multiline minRows={count + 1} maxRows={count + 1} label="Yêu cầu"
                           
                           value={request}
                           className={classes.disabledInput} />

                        {!isEdit ? (
                           <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                 Tạo mới
                              </LoadingButton>
                           </Box>
                        ) : null}
                     </Stack>
                  </Card>
               </Grid>
            </Grid>
         </Form>
      </FormikProvider>
   );
}