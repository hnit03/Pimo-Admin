import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { paramCase } from 'change-case';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import fileTextOutline from '@iconify/icons-eva/file-text-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

UserMoreMenu.propTypes = {
   onDelete: PropTypes.func,
   userName: PropTypes.string
};

export default function UserMoreMenu({ onDelete, userName, status, zipCode, onApply }) {
   const ref = useRef(null);
   const [isOpen, setIsOpen] = useState(false);

   return (
      <>
         <IconButton ref={ref} onClick={() => setIsOpen(true)}>
            <Icon icon={moreVerticalFill} width={20} height={20} />
         </IconButton>

         <Menu
            open={isOpen}
            anchorEl={ref.current}
            onClose={() => setIsOpen(false)}
            PaperProps={{
               sx: { width: 200, maxWidth: '100%' }
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
         >
            {
               (new Date(zipCode) < new Date()) ? null : (status === 'warning') ? (
                  <MenuItem onClick={onApply} sx={{ color: 'text.secondary' }}>
                     <ListItemIcon>
                        <Icon icon={checkmarkFill} width={24} height={24} />
                     </ListItemIcon>
                     <ListItemText primary="Duyệt" primaryTypographyProps={{ variant: 'body2' }} />
                  </MenuItem>
               ) : (
                  <MenuItem onClick={onDelete} sx={{ color: 'text.secondary' }}>
                     <ListItemIcon>
                        <Icon icon={trash2Outline} width={24} height={24} />
                     </ListItemIcon>
                     <ListItemText primary="Hủy" primaryTypographyProps={{ variant: 'body2' }} />
                  </MenuItem>
               )
            }
            {/* <MenuItem onClick={onDelete} sx={{ color: 'text.secondary' }}>
                     <ListItemIcon>
                        <Icon icon={fileTextOutline} width={24} height={24} />
                     </ListItemIcon>
                     <ListItemText primary="Danh sách apply" primaryTypographyProps={{ variant: 'body2' }} />
                  </MenuItem> */}
            <MenuItem
               component={RouterLink}
               to={`${PATH_DASHBOARD.casting.root}/${paramCase(userName)}/edit`}
               sx={{ color: 'text.secondary' }}
            >
               <ListItemIcon>
                  <Icon icon={editFill} width={24} height={24} />
               </ListItemIcon>
               <ListItemText primary="Xem thông tin" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
         </Menu>
      </>
   );
}
