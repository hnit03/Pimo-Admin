import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import axios from 'axios';
import DateTime from "./DateTimePicker";
import JSCookies from 'js-cookie';
import { makeStyles } from '@material-ui/styles';
// material
import { LoadingButton } from '@material-ui/lab';
import {
   Box,
   Card,
   Grid,
   Stack,
   Switch,
   TextField,
   Typography,
   FormHelperText,
   FormControlLabel
} from '@material-ui/core';
// utils
import { fData } from '../../../utils/formatNumber';
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import Label from '../../Label';
import { UploadAvatar } from '../../upload';
import countries from './countries';
import { log } from 'deck.gl';

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
   isEdit: PropTypes.bool,
   currentUser: PropTypes.object
};

export default function UserNewForm({ isEdit, currentUser }) {
   const navigate = useNavigate();
   const { enqueueSnackbar } = useSnackbar();
   const NewUserSchema = Yup.object().shape({
      name: Yup.string().required('Tên là bắt buộc'),
      email: Yup.string().required('Email là bắt buộc').email(),
      phoneNumber: Yup.string().required('Điện thoại là bắt buộc'),
      address: Yup.string().required('Tỉnh là bắt buộc'),
      country: Yup.string().required('Quốc gia là bắt buộc'),
      // company: Yup.string().required('Công ty là bắt buộc'),
      state: Yup.string().required('Ngày sinh là bắt buộc'),
      city: Yup.string().required('Giới tính là bắt buộc'),
      role: Yup.string().required('Địa chỉ là bắt buộc'),
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
         role: currentUser?.role || ''
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
                  dateOfBirth: values.state,
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
               var postData = {
                  id: values.id,
                  name: values.name,
                  genderId: Number(values.city),
                  dateOfBirth: values.state,
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
         pointerEvents: isEdit? 'none': 'auto',
         cursor: 'default'
         }
       }
   }))

   const classes = useStyles();

   console.log(values.city);

   return (
      <FormikProvider value={formik}>
         <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
               <Grid item xs={12} md={4}>
                  <Card sx={{ py: 10, px: 3 }}>
                     {/* {isEdit && (
                        <Label
                           color={values.status !== 'active' ? 'error' : 'success'}
                           sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                        >
                           {((values.status === 'banned') ? 'Ngừng hoạt động' : 'Hoạt động')}
                        </Label>
                     )} */}

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
                              fullWidth
                              label="Tỉnh"
                              {...getFieldProps('address')}
                              error={Boolean(touched.address && errors.address)}
                              helperText={touched.address && errors.address}
                              className={classes.disabledInput}
                           />
                           <TextField
                              select
                              fullWidth
                              label="Giới tính"
                              placeholder="Giới tính"
                              {...getFieldProps('city')}
                              SelectProps={{ native: true }}
                              error={Boolean(touched.city && errors.city)}
                              helperText={touched.city && errors.city}
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
                        </Stack>
                        {isEdit && (
                           <>
                              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                 <TextField
                                    // {...getFieldProps('state')}
                                    value={(new Date(values.state)).toLocaleDateString('vi-vn')}
                                    fullWidth 
                                    label='Ngày sinh'
                                    error={Boolean(touched.state && errors.state)}
                                    helperText={touched.state && errors.state}
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
                                 <DateTime
                                    {...getFieldProps('state')}
                                    label='Ngày sinh'
                                    error={Boolean(touched.state && errors.state)}
                                    helperText={touched.state && errors.state}
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
