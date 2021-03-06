// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
   <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
   blog: getIcon('ic_blog'),
   cart: getIcon('ic_cart'),
   chat: getIcon('ic_chat'),
   mail: getIcon('ic_mail'),
   user: getIcon('ic_user'),
   calendar: getIcon('ic_calendar'),
   ecommerce: getIcon('ic_ecommerce'),
   analytics: getIcon('ic_analytics'),
   dashboard: getIcon('ic_dashboard'),
   kanban: getIcon('ic_kanban')
};

const sidebarConfig = [
   // GENERAL
   // ----------------------------------------------------------------------
   //   {
   //     subheader: 'general',
   //     items: [
   //       {
   //         title: 'app',
   //         path: PATH_DASHBOARD.general.app,
   //         icon: ICONS.dashboard
   //       },
   //       { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
   //       { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics }
   //     ]
   //   },

   // MANAGEMENT
   // ----------------------------------------------------------------------
   {
      subheader: 'Quản lý',
      items: [
         // MANAGEMENT : USER
         {
            title: 'Chiến dịch', path: PATH_DASHBOARD.casting.list,
         },
         {
            title: 'Người mẫu', path: PATH_DASHBOARD.model.list,
         },
         {
            title: 'Nhãn hàng', path: PATH_DASHBOARD.brand.list,
         }

         // // MANAGEMENT : E-COMMERCE
         // {
         //   title: 'e-commerce',
         //   path: PATH_DASHBOARD.eCommerce.root,
         //   icon: ICONS.cart,
         //   children: [
         //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
         //     { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
         //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
         //     { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
         //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
         //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
         //     { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice }
         //   ]
         // },

         // // MANAGEMENT : BLOG
         // {
         //   title: 'blog',
         //   path: PATH_DASHBOARD.blog.root,
         //   icon: ICONS.blog,
         //   children: [
         //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
         //     { title: 'post', path: PATH_DASHBOARD.blog.postById },
         //     { title: 'new post', path: PATH_DASHBOARD.blog.newPost }
         //   ]
         // }
      ]
   },

   {
      subheader: 'Cấu hình',
      items: [
         // MANAGEMENT : USER
         {
            title: 'Chiến dịch', 
            path: PATH_DASHBOARD.casting.profile,
         },
         {
            title: 'Người mẫu', 
            path: PATH_DASHBOARD.model.profile,
         },
         {
            title: 'Nhãn hàng', 
            path: PATH_DASHBOARD.brand.profile,
         }

         // // MANAGEMENT : E-COMMERCE
         // {
         //   title: 'e-commerce',
         //   path: PATH_DASHBOARD.eCommerce.root,
         //   icon: ICONS.cart,
         //   children: [
         //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
         //     { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
         //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
         //     { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
         //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
         //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
         //     { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice }
         //   ]
         // },

         // // MANAGEMENT : BLOG
         // {
         //   title: 'blog',
         //   path: PATH_DASHBOARD.blog.root,
         //   icon: ICONS.blog,
         //   children: [
         //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
         //     { title: 'post', path: PATH_DASHBOARD.blog.postById },
         //     { title: 'new post', path: PATH_DASHBOARD.blog.newPost }
         //   ]
         // }
      ]
   },

   // APP
   // ----------------------------------------------------------------------
   //   {
   //     subheader: 'app',
   //     items: [
   //       {
   //         title: 'mail',
   //         path: PATH_DASHBOARD.mail.root,
   //         icon: ICONS.mail,
   //         info: <Label color="error">2</Label>
   //       },
   //       { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
   //       { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
   //       {
   //         title: 'kanban',
   //         path: PATH_DASHBOARD.kanban,
   //         icon: ICONS.kanban
   //       }
   //     ]
   //   }
];

export default sidebarConfig;
