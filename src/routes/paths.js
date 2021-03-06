// ----------------------------------------------------------------------

function path(root, sublink) {
   return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
   root: ROOTS_AUTH,
   login: path(ROOTS_AUTH, '/login'),
   loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
   register: path(ROOTS_AUTH, '/register'),
   registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
   resetPassword: path(ROOTS_AUTH, '/reset-password'),
   verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
   comingSoon: '/coming-soon',
   maintenance: '/maintenance',
   pricing: '/pricing',
   payment: '/payment',
   about: '/about-us',
   contact: '/contact-us',
   faqs: '/faqs',
   page404: '/404',
   page500: '/500',
   components: '/components'
};

export const PATH_DASHBOARD = {
   root: ROOTS_DASHBOARD,
   general: {
      app: path(ROOTS_DASHBOARD, '/app'),
      ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
      analytics: path(ROOTS_DASHBOARD, '/analytics')
   },
   mail: {
      root: path(ROOTS_DASHBOARD, '/mail'),
      all: path(ROOTS_DASHBOARD, '/mail/all')
   },
   chat: {
      root: path(ROOTS_DASHBOARD, '/chat'),
      new: path(ROOTS_DASHBOARD, '/chat/new'),
      conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
   },
   calendar: path(ROOTS_DASHBOARD, '/calendar'),
   kanban: path(ROOTS_DASHBOARD, '/kanban'),
   model: {
      root: path(ROOTS_DASHBOARD, '/model'),
      profile: path(ROOTS_DASHBOARD, '/model/profile'),
      cards: path(ROOTS_DASHBOARD, '/model/cards'),
      list: path(ROOTS_DASHBOARD, '/model/list'),
      newUser: path(ROOTS_DASHBOARD, '/model/new'),
      editById: path(ROOTS_DASHBOARD, '/model/ada-lindgren/edit'),
      account: path(ROOTS_DASHBOARD, '/model/account')
   },
   casting: {
      root: path(ROOTS_DASHBOARD, '/casting'),
      profile: path(ROOTS_DASHBOARD, '/casting/profile'),
      cards: path(ROOTS_DASHBOARD, '/casting/cards'),
      list: path(ROOTS_DASHBOARD, '/casting/list'),
      newUser: path(ROOTS_DASHBOARD, '/casting/new'),
      editById: path(ROOTS_DASHBOARD, '/casting/ada-lindgren/edit'),
      account: path(ROOTS_DASHBOARD, '/casting/account')
   },
   brand: {
      root: path(ROOTS_DASHBOARD, '/brand'),
      profile: path(ROOTS_DASHBOARD, '/brand/profile'),
      cards: path(ROOTS_DASHBOARD, '/brand/cards'),
      list: path(ROOTS_DASHBOARD, '/brand/list'),
      newBrand: path(ROOTS_DASHBOARD, '/brand/new'),
      editById: path(ROOTS_DASHBOARD, '/brand/ada-lindgren/edit'),
      account: path(ROOTS_DASHBOARD, '/brand/account')
   },
   eCommerce: {
      root: path(ROOTS_DASHBOARD, '/e-commerce'),
      shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
      product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
      productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
      list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
      newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
      editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
      checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
      invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
   },
   blog: {
      root: path(ROOTS_DASHBOARD, '/blog'),
      posts: path(ROOTS_DASHBOARD, '/blog/posts'),
      post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
      postById: path(ROOTS_DASHBOARD, '/blog/post/portfolio-review-is-this-portfolio-too-creative'),
      newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
   }
};

export const PATH_DOCS = 'https://pimo.studio/how-it-work';
