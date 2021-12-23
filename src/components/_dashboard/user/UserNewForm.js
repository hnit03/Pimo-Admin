import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import axios from 'axios';
import DateTime from "./DateTimePicker";
import JSCookies from 'js-cookie';
import { makeStyles } from '@material-ui/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
// material
import { LoadingButton } from '@material-ui/lab';
import {
   Box,
   Card,
   Grid,
   Stack,
   TextField,
   Typography,
   FormHelperText,
   Autocomplete,
   Checkbox
} from '@material-ui/core';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { UploadAvatar } from '../../upload';
import countries from './countries';

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
   isEdit: PropTypes.bool,
   currentUser: PropTypes.object
};

const skinColor = [
   { title: 'Trắng' },
   { title: 'Vàng' },
   { title: 'Đen' },
]

const hairColor = [
   { title: 'Đen' },
   { title: 'Nâu' },
   { title: 'Vàng' },
   { title: 'Trắng' },
   { title: 'Tím' },
   { title: 'Hồng' },
]

const eyeColor = [
   { title: 'Nâu' },
   { title: 'Xanh dương' },
   { title: 'Nâu' },
   { title: 'Xám' },
]

const genresList = [
   { title: 'Diễn xuất' },
   { title: 'Nhảy' },
   { title: 'Thời trang' },
   { title: 'Đồ lót' },
   { title: 'Đồ bơi' },
]

export default function UserNewForm({ isEdit, currentUser }) {
   const navigate = useNavigate();
   const { enqueueSnackbar } = useSnackbar();
   const NewUserSchema = Yup.object().shape({
      name: Yup.string().required('Tên là bắt buộc'),
      email: Yup.string().required('Email là bắt buộc').email(),
      phoneNumber: Yup.string().required('Điện thoại là bắt buộc'),
      // address: Yup.string().required('Tỉnh là bắt buộc'),
      country: Yup.string().required('Quốc gia là bắt buộc'),
      // company: Yup.string().required('Công ty là bắt buộc'),
      DOB: Yup.string().required('Ngày sinh là bắt buộc'),
      sex: Yup.string().required('Giới tính là bắt buộc'),
      role: Yup.string().required('Địa chỉ là bắt buộc'),
      height: Yup.string().required('Chiều cao là bắt buộc'),
      weight: Yup.string().required('Cân nặng là bắt buộc'),
      skinColor: Yup.string().required('Màu da là bắt buộc'),
      hairColor: Yup.string().required('Màu tóc là bắt buộc'),
      eyeColor: Yup.string().required('Màu mắt là bắt buộc'),
      style: Yup.string().required('Phong cách là bắt buộc'),
      bust: Yup.string().required('Vòng 1 là bắt buộc'),
      waist: Yup.string().required('Vòng 2 là bắt buộc'),
      hips: Yup.string().required('Vòng 3 là bắt buộc'),
      // avatarUrl: Yup.mixed().required('Avatar là bắt buộc')
   });

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         id: currentUser?.id || 0,
         name: currentUser?.name || '',
         email: currentUser?.email || '',
         phoneNumber: currentUser?.phoneNumber || '',
         address: currentUser?.address || '',
         country: currentUser?.country || '',
         state: currentUser?.state || '',
         city: currentUser?.city || '',
         zipCode: currentUser?.zipCode || '',
         avatarUrl: currentUser?.avatarUrl || null,
         isVerified: currentUser?.isVerified || true,
         status: currentUser?.status,
         company: currentUser?.company || '',
         role: currentUser?.role || '',
         sex: currentUser?.sex || '',
         DOB: currentUser?.dateOfBirth || '',
         height: currentUser?.height || '',
         weight: currentUser?.weight || '',
         bust: currentUser?.bust || '',
         waist: currentUser?.waist || '',
         hips: currentUser?.hips || '',
         skinColor: currentUser?.skinColor || '',
         hairColor: currentUser?.hairColor || '',
         eyeColor: currentUser?.eyeColor || '',
         style: currentUser?.style || '',
      },
      validationSchema: NewUserSchema,
      onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
         try {
            if (values.status === 'active' || values.status === undefined) {
               values.status = true;
            } else {
               values.status = false;
            }
            var result = false
            const accessToken = JSCookies.get('jwt')
            if (isEdit === false) {
               var postData = {
                  name: values.name,
                  genderId: Number(values.city),
                  dateOfBirth: values.DOB,
                  country: values.country,
                  province: values.address,
                  district: values.role,
                  phone: values.phoneNumber,
                  mail: values.email,
                  gifted: values.company,
               };
               let axiosConfig = {
                  headers: {
                     'Content-Type': 'application/json;charset=UTF-8',
                     "Access-Control-Allow-Origin": "*",
                     'authorization': 'Bearer ' + accessToken
                  }
               };
               result = (await axios.post('https://api.pimo.studio/api/v1/models', postData, axiosConfig)).data.success;
            } else {
               postData = {
                  id: values.id,
                  name: values.name,
                  genderId: Number(values.city),
                  dateOfBirth: values.DOB,
                  country: values.country,
                  province: values.address,
                  district: values.role,
                  phone: values.phoneNumber,
                  mail: values.email,
                  gifted: values.company,
               };
               let axiosConfig = {
                  headers: {
                     'Content-Type': 'application/json;charset=UTF-8',
                     "Access-Control-Allow-Origin": "*",
                     'authorization': 'Bearer ' + accessToken
                  }
               };
               result = (await axios.put('https://api.pimo.studio/api/v1/models', postData, axiosConfig));
            }

            // await fakeRequest(500);
            if (result) {
               resetForm();
               setSubmitting(false);
               enqueueSnackbar(!isEdit ? 'Thêm người mẫu thành công' : 'Cập nhật người mẫu thành công', { variant: 'success' });
               navigate(PATH_DASHBOARD.model.list);
            } else {
               enqueueSnackbar(!isEdit ? 'Thêm người mẫu thất bại' : 'Cập nhật người mẫu thất bại', { variant: 'error' });
            }
         } catch (error) {
            console.error(error);
            setSubmitting(false);
            setErrors(error);
         }
      }
   });

   const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

   const handleDrop = useCallback(
      (acceptedFiles) => {
         const file = acceptedFiles[0];
         if (file) {
            setFieldValue('avatarUrl', {
               ...file,
               preview: URL.createObjectURL(file)
            });
         }
      },
      [setFieldValue]
   );

   const listGender = [
      {
         id: 1,
         value: 'Nam'
      },
      {
         id: 2,
         value: 'Nữ'
      },
      {
         id: 3,
         value: 'Khác'
      }
   ]
   const useStyles = makeStyles((theme) => ({
      disabledInput: {
         "& .MuiInputBase-root": {
            editable: !isEdit,
            disabled: isEdit,
            pointerEvents: isEdit ? 'none' : 'auto',
            cursor: 'default'
         }
      }
   }))

   const classes = useStyles();
   const [states, setStates] = useState([]);
   const [cities, setCities] = useState([]);

   useEffect(() => {
      if (getFieldProps('country').value !== '') {
         console.log(getFieldProps('country').value);
         fetch('https://countriesnow.space/api/v0.1/countries/states', {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               country: getFieldProps('country').value
            })
         })
            .then(response => response.json())
            .then(data => setStates(data.data.states))
            .catch(error => {
               console.error(error);
            });
      }
      setFieldValue('city', '');
   }, [getFieldProps('country').value])

   useEffect(() => {
      if (getFieldProps('state').value !== '') {
         console.log(getFieldProps('state').value);
         fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               country: getFieldProps('country').value,
               state: getFieldProps('state').value
            })
         })
            .then(response => response.json())
            .then(data => setCities(data.data))
            .catch(error => {
               console.error(error);
            });
      }
   }, [getFieldProps('state').value])

   useEffect(() => {
      console.log(cities);
   }, [cities])

   return (
      <FormikProvider value={formik}>
         <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
               <Grid item xs={12} md={4}>
                  <Card sx={{ py: 6.8, px: 3 }}>
                     {/* {isEdit && (
                        <Label
                           color={values.status !== 'active' ? 'error' : 'success'}
                           sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                        >
                           {((values.status === 'banned') ? 'Ngừng hoạt động' : 'Hoạt động')}
                        </Label>
                     )} */}

                     <Box sx={{ mb: 3 }}>
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
                                    mx: 'auto',
                                    display: 'block',
                                    textAlign: 'center',
                                    color: 'text.secondary'
                                 }}
                              >
                                 Cho phép file dạng *.jpeg, *.jpg, *.png, *.gif
                                 <br /> với kích thước tối đa {fData(3145728)}
                              </Typography>
                           }
                        />
                        <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                           {touched.avatarUrl && errors.avatarUrl}
                        </FormHelperText>
                     </Box>
                     <Stack spacing={1}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <div style={{ alignSelf: 'center' }}>
                              <FacebookIcon style={{ color: '#3b5998' }} />
                           </div>
                           <TextField
                              fullWidth
                              label="Địa chỉ Facebook"
                              // {...getFieldProps('email')}
                              className={classes.disabledInput}
                           />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <div style={{ alignSelf: 'center' }}>
                              <InstagramIcon style={{ color: '#8a3ab9' }} />
                           </div>
                           <TextField
                              fullWidth
                              label="Địa chỉ Instagram"
                              // {...getFieldProps('email')}
                              className={classes.disabledInput}
                           />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <div style={{ alignSelf: 'center' }}>
                              <TwitterIcon style={{ color: '#55acee' }} />
                           </div>
                           <TextField
                              fullWidth
                              label="Địa chỉ Twitter"
                              // {...getFieldProps('email')}
                              className={classes.disabledInput}
                           />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <div style={{ alignSelf: 'center' }}>
                              <YouTubeIcon style={{ color: '#e52d27' }} />
                           </div>
                           <TextField
                              fullWidth
                              label="Địa chỉ YouTube"
                              // {...getFieldProps('email')}
                              className={classes.disabledInput}
                           />
                        </Stack>
                     </Stack>
                  </Card>
               </Grid>

               <Grid item xs={12} md={8}>
                  <Card sx={{ p: 3 }}>
                     <Stack spacing={3}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <TextField
                              fullWidth
                              label="Họ và tên"
                              {...getFieldProps('name')}
                              error={Boolean(touched.name && errors.name)}
                              helperText={touched.name && errors.name}
                              className={classes.disabledInput}
                           />
                           <TextField
                              fullWidth
                              label="Địa chỉ email"
                              {...getFieldProps('email')}
                              error={Boolean(touched.email && errors.email)}
                              helperText={touched.email && errors.email}
                              className={classes.disabledInput}
                           />
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <TextField
                              fullWidth
                              type="number"
                              label="Số điện thoại"
                              {...getFieldProps('phoneNumber')}
                              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                              helperText={touched.phoneNumber && errors.phoneNumber}
                              className={classes.disabledInput}
                           />
                           <TextField
                              select
                              fullWidth
                              label="Quốc gia"
                              placeholder="Country"
                              {...getFieldProps('country')}
                              SelectProps={{ native: true }}
                              error={Boolean(touched.country && errors.country)}
                              helperText={touched.country && errors.country}
                              className={classes.disabledInput}
                           >
                              <option value="" />
                              {countries.map((option) => (
                                 <option key={option.code} value={option.label}>
                                    {option.label}
                                 </option>
                              ))}
                           </TextField>
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <TextField
                              select
                              fullWidth
                              label="Tỉnh/Thành phố"
                              {...getFieldProps('state')}
                              SelectProps={{ native: true }}
                              error={Boolean(touched.state && errors.state)}
                              helperText={touched.state && errors.state}
                              className={classes.disabledInput}
                           >
                              <option value="" />
                              {states.map((option) => (
                                 <option value={option.name}>
                                    {option.name}
                                 </option>
                              ))}
                           </TextField>
                           <TextField
                              select
                              fullWidth
                              label="Quận/Huyện"
                              placeholder="Thành phố"
                              {...getFieldProps('city')}
                              SelectProps={{ native: true }}
                              error={Boolean(touched.city && errors.city)}
                              helperText={touched.city && errors.city}
                              className={classes.disabledInput}
                           >
                              <option value="" />
                              {
                                 (cities !== undefined && cities.length > 0) ? (
                                    cities.map((option) => (
                                       <option value={option}>
                                          {option}
                                       </option>
                                    ))
                                 ) : null
                              }
                           </TextField>
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <TextField
                              select
                              fullWidth
                              label="Giới tính"
                              placeholder="Giới tính"
                              {...getFieldProps('sex')}
                              SelectProps={{ native: true }}
                              error={Boolean(touched.sex && errors.sex)}
                              helperText={touched.sex && errors.sex}
                              className={classes.disabledInput}
                           >
                              <option value="" />
                              {
                                 listGender.map((option) => (
                                    <option key={option.id} value={option.id}>
                                       {option.value}
                                    </option>
                                 ))
                              }
                           </TextField>
                           <TextField
                              fullWidth
                              label="Tài năng"
                              {...getFieldProps('company')}
                              error={Boolean(touched.company && errors.company)}
                              helperText={touched.company && errors.company}
                              className={classes.disabledInput}
                           />
                        </Stack>
                        {isEdit && (
                           <>
                              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                 <TextField
                                    // {...getFieldProps('state')}
                                    value={(new Date(values.DOB)).toLocaleDateString('vi-vn')}
                                    fullWidth
                                    label='Ngày sinh'
                                    error={Boolean(touched.DOB && errors.DOB)}
                                    helperText={touched.DOB && errors.DOB}
                                    setValue={setFieldValue}
                                    className={classes.disabledInput}
                                 />
                                 <TextField
                                    fullWidth
                                    label="Địa chỉ"
                                    {...getFieldProps('role')}
                                    error={Boolean(touched.role && errors.role)}
                                    helperText={touched.role && errors.role}
                                    className={classes.disabledInput}
                                 />
                              </Stack>
                           </>
                        )}
                        {!isEdit && (
                           <>
                              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                 <DateTime
                                    {...getFieldProps('DOB')}
                                    value={(new Date())}
                                    label='Ngày sinh'
                                    error={Boolean(touched.DOB && errors.DOB)}
                                    helperText={touched.DOB && errors.DOB}
                                    setValue={setFieldValue}
                                    disabled={isEdit}
                                 />
                                 <TextField
                                    fullWidth
                                    label="Địa chỉ"
                                    {...getFieldProps('role')}
                                    error={Boolean(touched.role && errors.role)}
                                    helperText={touched.role && errors.role}
                                    disabled={isEdit}
                                 />
                              </Stack>
                           </>
                        )}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <TextField rows={4} fullWidth multiline label="Mô tả bản thân" />
                        </Stack>
                     </Stack>
                  </Card>
               </Grid>
               <Grid item xs={12} md={4}>
               </Grid>
               <Grid item xs={12} md={8}>
                  <Card sx={{ p: 3 }}>
                     <Stack spacing={3}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           {/* <TextField
                              fullWidth
                              label="Tuổi"
                              type="number"
                              // {...getFieldProps('name')}
                              // error={Boolean(touched.name && errors.name)}
                              // helperText={touched.name && errors.name}
                              className={classes.disabledInput}
                           /> */}
                           <TextField
                              fullWidth
                              label="Chiều cao (cm)"
                              type="number"
                              {...getFieldProps('height')}
                              error={Boolean(touched.height && errors.height)}
                              helperText={touched.height && errors.height}
                              className={classes.disabledInput}
                           />
                           <TextField
                              fullWidth
                              label="Cân nặng (kg)"
                              type="number"
                              {...getFieldProps('weight')}
                              error={Boolean(touched.weight && errors.weight)}
                              helperText={touched.weight && errors.weight}
                              className={classes.disabledInput}
                           />
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <TextField
                              fullWidth
                              type="number"
                              label="Số đo vòng 1 (cm)"
                              {...getFieldProps('bust')}
                              error={Boolean(touched.bust && errors.bust)}
                              helperText={touched.bust && errors.bust}
                              className={classes.disabledInput}
                           />
                           <TextField
                              fullWidth
                              type="number"
                              label="Số đo vòng 2 (cm)"
                              {...getFieldProps('waist')}
                              error={Boolean(touched.waist && errors.waist)}
                              helperText={touched.waist && errors.waist}
                              className={classes.disabledInput}
                           />
                           <TextField
                              fullWidth
                              type="number"
                              label="Số đo vòng 3 (cm)"
                              {...getFieldProps('hips')}
                              error={Boolean(touched.hips && errors.hips)}
                              helperText={touched.hips && errors.hips}
                              className={classes.disabledInput}
                           />
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           {/* <Autocomplete
                              fullWidth
                              multiple
                              options={skinColor}
                              disableCloseOnSelect
                              getOptionLabel={(option) => option.title}
                              renderOption={(props, option, { selected }) => (
                                 <li {...props}>
                                    <Checkbox checked={selected} />
                                    {option.title}
                                 </li>
                              )}
                              renderInput={(params) => <TextField {...params} label="Màu da"/>}
                           /> */}
                           <TextField
                              select
                              fullWidth
                              label="Màu da"
                              placeholder="Màu da"
                              {...getFieldProps('skinColor')}
                              SelectProps={{ native: true }}
                              error={Boolean(touched.skinColor && errors.skinColor)}
                              helperText={touched.skinColor && errors.skinColor}
                              className={classes.disabledInput}
                           >
                              <option value="" />
                              {
                                 skinColor.map((option) => (
                                    <option value={option.title}>
                                       {option.title}
                                    </option>
                                 ))
                              }
                           </TextField>
                           <TextField
                              select
                              fullWidth
                              label="Màu tóc"
                              placeholder="Màu tóc"
                              {...getFieldProps('hairColor')}
                              SelectProps={{ native: true }}
                              error={Boolean(touched.hairColor && errors.hairColor)}
                              helperText={touched.hairColor && errors.hairColor}
                              className={classes.disabledInput}
                           >
                              <option value="" />
                              {
                                 hairColor.map((option) => (
                                    <option value={option.title}>
                                       {option.title}
                                    </option>
                                 ))
                              }
                           </TextField>
                           <TextField
                              select
                              fullWidth
                              label="Màu mắt"
                              placeholder="Màu mắt"
                              {...getFieldProps('eyeColor')}
                              SelectProps={{ native: true }}
                              error={Boolean(touched.eyeColor && errors.eyeColor)}
                              helperText={touched.eyeColor && errors.eyeColor}
                              className={classes.disabledInput}
                           >
                              <option value="" />
                              {
                                 eyeColor.map((option) => (
                                    <option value={option.title}>
                                       {option.title}
                                    </option>
                                 ))
                              }
                           </TextField>
                        </Stack>
                        {isEdit && (
                           <>
                              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                 <TextField
                                    // {...getFieldProps('state')}
                                    value={(new Date(values.DOB)).toLocaleDateString('vi-vn')}
                                    fullWidth
                                    label='Ngày sinh'
                                    error={Boolean(touched.DOB && errors.DOB)}
                                    helperText={touched.DOB && errors.DOB}
                                    setValue={setFieldValue}
                                    className={classes.disabledInput}
                                 />
                                 <TextField fullWidth label="Mã vùng" {...getFieldProps('zipCode')}
                                    className={classes.disabledInput} />
                              </Stack>

                              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                 <TextField
                                    fullWidth
                                    label="Tài năng"
                                    {...getFieldProps('company')}
                                    error={Boolean(touched.company && errors.company)}
                                    helperText={touched.company && errors.company}
                                    className={classes.disabledInput}
                                 />
                                 <TextField
                                    fullWidth
                                    label="Địa chỉ"
                                    {...getFieldProps('role')}
                                    error={Boolean(touched.role && errors.role)}
                                    helperText={touched.role && errors.role}
                                    className={classes.disabledInput}
                                 />
                              </Stack>
                           </>
                        )}
                        {!isEdit && (
                           <>
                              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                 <Autocomplete
                                    fullWidth
                                    multiple
                                    options={genresList}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.title}
                                    renderOption={(props, option, { selected }) => (
                                       <li {...props}>
                                          <Checkbox checked={selected} />
                                          {option.title}
                                       </li>
                                    )}
                                    renderInput={(params) => <TextField {...params} label="Phong cách" />}
                                 />
                              </Stack>
                           </>
                        )}
                     </Stack>
                  </Card>
                  {!isEdit ? (
                     <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                           Tạo mới
                        </LoadingButton>
                     </Box>
                  ) : null}
               </Grid>
            </Grid>
         </Form>
      </FormikProvider>
   );
}
