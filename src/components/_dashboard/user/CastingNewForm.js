import * as Yup from "yup";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { useSnackbar } from "notistack5";
import { useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { LoadingButton } from "@material-ui/lab";
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
      address: Yup.string().required("Địa điểm là bắt buộc"),
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

   return (
      <FormikProvider value={formik}>
         <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
               <Grid item xs={12} md={4}>
                  <Card sx={{ py: 10, px: 3 }}>
                     {/* {isEdit && (
                        <Label
                           color={values.status !== "active" ? "error" : "success"}
                           sx={{
                              textTransform: "uppercase",
                              position: "absolute",
                              top: 24,
                              right: 24,
                           }}
                        >
                           {values.status === "banned" ? "Ngừng hoạt động" : "Hoạt động"}
                        </Label>
                     )} */}

                     <Box sx={{ mb: 5 }}>
                        <UploadAvatar
                           accept="image/*"
                           file={values.avatarUrl}
                           maxSize={3145728}
                           onDrop={handleDrop}
                           error={Boolean(touched.avatarUrl && errors.avatarUrl)}
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

                     {/* {isEdit && (
                        <FormControlLabel
                           labelPlacement="start"
                           control={
                              <Switch
                                 onChange={(event) =>
                                    setFieldValue(
                                       "status",
                                       event.target.checked ? "banned" : "active",
                                    )
                                 }
                                 checked={values.status !== "active"}
                              />
                           }
                           label={
                              <>
                                 <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                                    Banned
                                 </Typography>
                                 <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                 >
                                    Cấm người mẫu
                                 </Typography>
                              </>
                           }
                           sx={{
                              mx: 0,
                              mb: 3,
                              width: 1,
                              justifyContent: "space-between",
                           }}
                        />
                     )} */}
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
                           />
                           {/* <TextField
                    fullWidth
                    label="Địa chỉ email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  /> */}
                           <TextField
                              select
                              fullWidth
                              label="Địa điểm"
                              placeholder="address"
                              {...getFieldProps("address")}
                              SelectProps={{ native: true }}
                              error={Boolean(touched.address && errors.address)}
                              helperText={touched.address && errors.address}
                           >
                              <option value="" />
                              {countries.map((option) => (
                                 <option key={option.code} value={option.label}>
                                    {option.label}
                                 </option>
                              ))}
                           </TextField>
                        </Stack>

                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={{ xs: 3, sm: 2 }}
                        >
                           {/* <TextField
                    fullWidth
                    label="Số điện thoại"
                    {...getFieldProps('phoneNumber')}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  /> */}
                           <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker
                                 renderInput={(props) => (
                                    <TextField
                                       fullWidth
                                       {...props}
                                       helperText="thời gian bắt đầu lớn hơn kết thúc"
                                    />
                                 )}
                                 label="thời gian bắt đầu"
                                 value={value}
                                 onChange={(newValue) => {
                                    setValue(newValue);
                                 }}
                              />
                           </LocalizationProvider>
                           <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker
                                 renderInput={(props) => (
                                    <TextField fullWidth {...props} />
                                 )}
                                 label="thời gian kết thúc"
                                 value={value}
                                 onChange={(newValue) => {
                                    setValue(newValue);
                                 }}
                              />
                           </LocalizationProvider>
                           {/* <TextField
                    select
                    fullWidth
                    label="Quốc gia"
                    placeholder="Country"
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField> */}
                        </Stack>

                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={{ xs: 3, sm: 2 }}
                        >
                           <p>Mức lương</p>
                           <p style={{ marginLeft: "17.5rem" }}>Chiều cao</p>
                        </Stack>

                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={{ xs: 3, sm: 2 }}
                        >
                           {/* <TextField
                    fullWidth
                    label="Tỉnh"
                    {...getFieldProps("state")}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                  /> */}
                           <Slider
                              aria-label="Temperature"
                              defaultValue={30}
                              getAriaValueText={valuetext}
                              color="secondary"
                              valueLabelDisplay="auto"
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
                           {/* <TextField
                    fullWidth
                    label="Thành phố"
                    {...getFieldProps("city")}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  /> */}
                           <Slider
                              getAriaLabel={() => "Temperature range"}
                              value={valueHeight}
                              onChange={handleChangeHeight}
                              valueLabelDisplay="auto"
                              min={160}
                              step={1}
                              max={250}
                              // getAriaValueText={valuetext}
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

                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={{ xs: 3, sm: 2 }}
                        >
                           <p>Tuổi</p>

                           <p style={{ marginLeft: "21rem" }}>Vòng 1</p>
                        </Stack>

                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={{ xs: 3, sm: 2 }}
                        >
                           {/* <TextField
                    fullWidth
                    label="Quận/Huyện"
                    {...getFieldProps("address")}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField
                    fullWidth
                    label="Mã vùng"
                    {...getFieldProps("zipCode")}
                  /> */}
                           <Slider
                              getAriaLabel={() => "Temperature range"}
                              value={valueAge}
                              onChange={handleChangeAge}
                              valueLabelDisplay="auto"
                              // getAriaValueText={valuetext}
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
                           <Slider
                              getAriaLabel={() => "Temperature range"}
                              value={measure1}
                              onChange={handleChangeMeaSure1}
                              valueLabelDisplay="auto"
                              // getAriaValueText={valuetext}
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

                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={{ xs: 3, sm: 2 }}
                        >
                           <p>Vòng 2</p>
                           <p style={{ marginLeft: "20rem" }}>Vòng 3</p>
                        </Stack>

                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={{ xs: 3, sm: 2 }}
                        >
                           {/* <TextField
                    fullWidth
                    label="Quận/Huyện"
                    {...getFieldProps("address")}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField
                    fullWidth
                    label="Mã vùng"
                    {...getFieldProps("zipCode")}
                  /> */}
                           <Slider
                              getAriaLabel={() => "Temperature range"}
                              value={measure2}
                              onChange={handleChangeMeaSure2}
                              valueLabelDisplay="auto"
                              // getAriaValueText={valuetext}
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
                           <Slider
                              getAriaLabel={() => "Temperature range"}
                              value={measure3}
                              onChange={handleChangeMeaSure3}
                              valueLabelDisplay="auto"
                              // getAriaValueText={valuetext}
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


                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={{ xs: 3, sm: 2 }}
                        >
                           {/* <TextField
                    fullWidth
                    label="Quận/Huyện"
                    {...getFieldProps("address")}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField
                    fullWidth
                    label="Mã vùng"
                    {...getFieldProps("zipCode")}
                  /> */}
                           <Autocomplete
                              multiple
                              id="checkboxes-tags-demo"
                              options={hairColor}
                              disableCloseOnSelect
                              getOptionLabel={(option) => option.title}
                              renderOption={(props, option, { selected }) => (
                                 <li {...props}>
                                    <Checkbox
                                       icon={icon}
                                       checkedIcon={checkedIcon}
                                       style={{ marginRight: 8 }}
                                       checked={selected}

                                    />
                                    {option.title}
                                 </li>
                              )}
                              style={{ width: 500 }}
                              renderInput={(params) => (
                                 <TextField
                                    {...params}
                                    {...getFieldProps('hairColor')}
                                    error={Boolean(touched.hairColor && errors.hairColor)}
                                    helperText={touched.hairColor && errors.hairColor}
                                    label="Màu tóc"
                                    placeholder="Favorites"
                                 />
                              )}
                           />
                           <Autocomplete
                              multiple
                              id="checkboxes-tags-demo"
                              options={hairColor}
                              disableCloseOnSelect
                              getOptionLabel={(option) => option.title}
                              renderOption={(props, option, { selected }) => (
                                 <li {...props}>
                                    <Checkbox
                                       icon={icon}
                                       checkedIcon={checkedIcon}
                                       style={{ marginRight: 8 }}
                                       checked={selected}
                                    />
                                    {option.title}
                                 </li>
                              )}
                              style={{ width: 500 }}
                              renderInput={(params) => (
                                 <TextField
                                    {...params}
                                    {...getFieldProps('skinColor')}
                                    error={Boolean(touched.skinColor && errors.skinColor)}
                                    helperText={touched.skinColor && errors.skinColor}
                                    label="Màu da"
                                    placeholder="Favorites"
                                 />
                              )}
                           />
                        </Stack>


                        <Stack
                           direction={{ xs: "column", sm: "row" }}
                           spacing={{ xs: 3, sm: 2 }}
                        >
                           {/* <TextField
                    fullWidth
                    label="Quận/Huyện"
                    {...getFieldProps("address")}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField
                    fullWidth
                    label="Mã vùng"
                    {...getFieldProps("zipCode")}
                  /> */}
                           <Autocomplete
                              multiple
                              id="checkboxes-tags-demo"
                              options={hairColor}
                              disableCloseOnSelect
                              getOptionLabel={(option) => option.title}
                              renderOption={(props, option, { selected }) => (
                                 <li {...props}>
                                    <Checkbox
                                       icon={icon}
                                       checkedIcon={checkedIcon}
                                       style={{ marginRight: 8 }}
                                       checked={selected}
                                    />
                                    {option.title}
                                 </li>
                              )}
                              style={{ width: 500 }}
                              renderInput={(params) => (
                                 <TextField
                                    {...params}
                                    {...getFieldProps('style')}
                                    error={Boolean(touched.style && errors.style)}
                                    helperText={touched.style && errors.style}
                                    label="Phong cách"
                                    placeholder="Favorites"
                                 />
                              )}
                           />
                           <Autocomplete
                              multiple
                              id="checkboxes-tags-demo"
                              options={hairColor}
                              disableCloseOnSelect
                              getOptionLabel={(option) => option.title}
                              renderOption={(props, option, { selected }) => (
                                 <li {...props}>
                                    <Checkbox
                                       icon={icon}
                                       checkedIcon={checkedIcon}
                                       style={{ marginRight: 8 }}
                                       checked={selected}
                                    />
                                    {option.title}
                                 </li>
                              )}
                              style={{ width: 500 }}
                              renderInput={(params) => (
                                 <TextField
                                    {...params}
                                    {...getFieldProps('sex')}
                                    error={Boolean(touched.sex && errors.sex)}
                                    helperText={touched.sex && errors.sex}
                                    label="Giới tính"
                                    placeholder="Favorites"
                                 />
                              )}
                           />
                        </Stack>
                        <TextField {...getFieldProps('description')} fullWidth multiline minRows={4} maxRows={4} label="Mô tả" />
                        {/* <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Tài năng"
                    {...getFieldProps("company")}
                    error={Boolean(touched.company && errors.company)}
                    helperText={touched.company && errors.company}
                  />
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    {...getFieldProps("role")}
                    error={Boolean(touched.role && errors.role)}
                    helperText={touched.role && errors.role}
                  />
                </Stack> */}

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