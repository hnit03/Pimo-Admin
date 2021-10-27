import { useEffect, useState } from 'react'
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
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
      name: Yup.string().required('Tên nhãn hàng'),
      email: Yup.string().required('Email là bắt buộc').email(),
      phoneNumber: Yup.string().required('Điện thoại là bắt buộc'),
      address: Yup.string().required('Địa chỉ là bắt buộc'),
      country: Yup.string().required('Quốc gia là bắt buộc'),
      company: Yup.string().required('Công ty là bắt buộc'),
      state: Yup.string().required('Tỉnh là bắt buộc'),
      city: Yup.string().required('Thành phố là bắt buộc'),
      role: Yup.string().required('Lĩnh vực là bắt buộc'),
      avatarUrl: Yup.mixed().required('Avatar là bắt buộc')
   });

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
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
            await fakeRequest(500);
            resetForm();
            setSubmitting(false);
            enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
            navigate(PATH_DASHBOARD.user.list);
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
                     {isEdit && (
                        <Label
                           color={values.status !== 'active' ? 'error' : 'success'}
                           sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                        >
                           {((values.status === 'banned') ? 'Ngừng hoạt động' : 'Hoạt động')}
                           {/* {values.status} */}
                        </Label>
                     )}

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

                     {isEdit && (
                        <FormControlLabel
                           labelPlacement="start"
                           control={
                              <Switch
                                 onChange={(event) => setFieldValue('status', event.target.checked ? 'banned' : 'active')}
                                 checked={values.status !== 'active'}
                              />
                           }
                           label={
                              <>
                                 <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                                    Banned
                                 </Typography>
                                 <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Cấm nhãn hàng
                                 </Typography>
                              </>
                           }
                           sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                        />
                     )}

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
                           />
                           <TextField
                              fullWidth
                              label="Địa chỉ email"
                              {...getFieldProps('email')}
                              error={Boolean(touched.email && errors.email)}
                              helperText={touched.email && errors.email}
                           />
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <TextField
                              fullWidth
                              label="Số điện thoại"
                              {...getFieldProps('phoneNumber')}
                              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                              helperText={touched.phoneNumber && errors.phoneNumber}
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
                              >
                                 <option value="" />
                                 {

                                    listCategory.map((option) => (
                                       <option key={option.id} value={option.name}>
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
                           />
                        </Stack>

                        <TextField {...getFieldProps('city')} fullWidth multiline minRows={4} maxRows={4} label="Mô tả" />
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                           <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                              {!isEdit ? 'Tạo mới' : 'Lưu thay đổi'}
                           </LoadingButton>
                        </Box>
                     </Stack>
                  </Card>
               </Grid>
            </Grid>
         </Form>
      </FormikProvider>
   );
}
