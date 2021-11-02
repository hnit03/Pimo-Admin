import { useEffect, useState } from 'react'
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import JSCookies from 'js-cookie';
import axios from 'axios';
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

// ----------------------------------------------------------------------

BrandNewForm.propTypes = {
   isEdit: PropTypes.bool,
   currentUser: PropTypes.object
};

export default function BrandNewForm({ isEdit, currentUser }) {
   const navigate = useNavigate();
   const { enqueueSnackbar } = useSnackbar();

   const NewUserSchema = Yup.object().shape({
      name: Yup.string().required('Tên nhãn hàng là bắt buộc'),
      email: Yup.string().required('Email là bắt buộc').email(),
      phoneNumber: Yup.string().required('Điện thoại là bắt buộc'),
      country: Yup.string().required('Quốc gia là bắt buộc'),
      company: Yup.string().required('Công ty là bắt buộc'),
      city: Yup.string().required('Thành phố là bắt buộc'),
      role: Yup.string().required('Lĩnh vực là bắt buộc'),
      avatarUrl: Yup.mixed().required('Avatar là bắt buộc')
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
               const formData = new FormData()
               formData.append('id', 1)
               formData.append('pageNo', 1)
               formData.append('logo', values.avatarUrl.file)
               formData.append('name', values.name)
               formData.append('description', values.city)
               formData.append('status', 1)
               formData.append('brandCateId', values.company)
               formData.append('mail', values.email)
               formData.append('address', values.role)
               formData.append('phone', values.phoneNumber)
               let axiosConfig = {
                  headers: {
                     "Content-Type": "multipart/form-data; boundary=AaB03x" +
                        "--AaB03x" +
                        "Content-Disposition: file" +
                        "Content-Type: png" +
                        "Content-Transfer-Encoding: binary" +
                        "...data... " +
                        "--AaB03x--",
                     "Accept": "application/json",
                     "type": "formData"
                  }
               };
               try {
                  console.log(formData.get('id'))
                  console.log(await axios.post('https://a63f-27-70-155-55.ngrok.io/api/v1/models/test', formData, axiosConfig));
               } catch (error) {
                  result = false;
               }
            } else {
               var postData = {
                  id: values.id,
                  name: values.name,
                  description: values.city,
                  status: true,
                  brandCateId: values.company,
                  mail: values.email,
                  address: values.role,
                  phone: values.phoneNumber,
                  logo: ''
               };
               let axiosConfig = {
                  headers: {
                     'Content-Type': 'application/json;charset=UTF-8',
                     "Access-Control-Allow-Origin": "*",
                     'authorization': 'Bearer ' + accessToken
                  }
               };
               try {
                  result = (await axios.put('https://api.pimo.studio/api/v1/brands', postData, axiosConfig)).data.success;
               } catch (error) {
                  result = false;
               }
            }

            if (result) {
               resetForm();
               setSubmitting(false);
               enqueueSnackbar(!isEdit ? 'Thêm nhãn hàng thành công' : 'Cập nhật nhãn hàng thành công', { variant: 'success' });
               navigate(PATH_DASHBOARD.brand.list);
            } else {
               enqueueSnackbar(!isEdit ? 'Thêm nhãn hàng thất bại' : 'Cập nhật nhãn hàng thất bại', { variant: 'error' });
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
               preview: URL.createObjectURL(file),
               file: file,
            });
            console.log(file);
         }
      },
      [setFieldValue]
   );
   const [listCategory, setListCategory] = useState()

   useEffect(() => {
      axios.get('https://api.pimo.studio/api/v1/brandcategories')
         .then(res => {
            setListCategory(res.data.brandCateList)
         })
         .catch(err => {
            console.log(err)
         })
   }, [])

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
                           disabled={isEdit}
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
                              label="Tên nhãn hàng"
                              {...getFieldProps('name')}
                              error={Boolean(touched.name && errors.name)}
                              helperText={touched.name && errors.name}
                              disabled={isEdit}
                           />
                           <TextField
                              fullWidth
                              label="Địa chỉ email"
                              {...getFieldProps('email')}
                              error={Boolean(touched.email && errors.email)}
                              helperText={touched.email && errors.email}
                              disabled={isEdit}
                           />
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <TextField
                              fullWidth
                              label="Số điện thoại"
                              {...getFieldProps('phoneNumber')}
                              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                              helperText={touched.phoneNumber && errors.phoneNumber}
                              disabled={isEdit}
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
                              disabled={isEdit}
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
                           {(listCategory !== undefined && listCategory !== null) ? (
                              <TextField
                                 select
                                 fullWidth
                                 label="Lĩnh vực"
                                 placeholder="Country"
                                 {...getFieldProps('company')}
                                 SelectProps={{ native: true }}
                                 error={Boolean(touched.company && errors.company)}
                                 helperText={touched.company && errors.company}
                                 disabled={isEdit}
                              >
                                 <option value="" />
                                 {
                                    listCategory.map((option) => (
                                       <option key={option.id} value={option.id}>
                                          {option.name}
                                       </option>
                                    ))
                                 }
                              </TextField>
                           ) : null}
                           <TextField
                              fullWidth
                              label="Địa chỉ"
                              {...getFieldProps('role')}
                              error={Boolean(touched.role && errors.role)}
                              helperText={touched.role && errors.role}
                              disabled={isEdit}
                           />
                        </Stack>
                        <TextField {
                           ...getFieldProps('city')}
                           fullWidth multiline
                           minRows={4}
                           maxRows={4}
                           label="Mô tả"
                           disabled={isEdit} />
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
