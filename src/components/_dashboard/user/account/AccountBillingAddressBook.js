import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// material
import { Box, Card, Button, Typography, Stack, Paper } from '@material-ui/core';

// ----------------------------------------------------------------------

AccountBillingAddressBook.propTypes = {
  addressBook: PropTypes.array
};

export default function AccountBillingAddressBook({ addressBook }) {
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3} alignItems="flex-start">
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          Thông tin thanh toán
        </Typography>

        {addressBook.map((address) => (
          <Paper
            key={address.id}
            sx={{
              p: 3,
              width: 1,
              bgcolor: 'background.neutral'
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              {address.name}
            </Typography>

            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Địa chỉ: &nbsp;
              </Typography>
              {`${address.street}, ${address.city}, ${address.state}, ${address.country} ${address.zipCode}`}
            </Typography>

            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Số điện thoại: &nbsp;
              </Typography>
              {address.phone}
            </Typography>

            <Box sx={{ mt: 1 }}>
              <Button
                color="error"
                size="small"
                startIcon={<Icon icon={trash2Fill} />}
                onClick={() => {}}
                sx={{ mr: 1 }}
              >
                Xóa
              </Button>
              <Button size="small" startIcon={<Icon icon={editFill} />} onClick={() => {}}>
                Sửa
              </Button>
            </Box>
          </Paper>
        ))}

        <Button size="small" startIcon={<Icon icon={plusFill} />}>
          Add new address
        </Button>
      </Stack>
    </Card>
  );
}
