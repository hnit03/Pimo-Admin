import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgCover, mockImgFeed, mockImgAvatar } from '../utils/mockImages';
//
import mock from './mock';
import axios from 'axios';

// ----------------------------------------------------------------------

const createId = (index) => `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${index}`;

// ----------------------------------------------------------------------

mock.onGet('/api/user/profile').reply(() => {
   const profile = {
      id: createId(1),
      cover: mockImgCover(1),
      position: 'UI Designer',
      follower: faker.datatype.number(),
      following: faker.datatype.number(),
      quote: 'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
      country: faker.address.country(),
      email: faker.internet.email(),
      company: faker.company.companyName(),
      school: faker.company.companyName(),
      role: 'Manager',
      facebookLink: `https://www.facebook.com/caitlyn.kerluke`,
      instagramLink: `https://www.instagram.com/caitlyn.kerluke`,
      linkedinLink: `https://www.linkedin.com/in/caitlyn.kerluke`,
      twitterLink: `https://www.twitter.com/caitlyn.kerluke`
   };

   return [200, { profile }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/all').reply(() => {
   const users = [...Array(24)].map((_, index) => {
      const setIndex = index + 1;
      return {
         id: createId(setIndex),
         avatarUrl: mockImgAvatar(setIndex),
         cover: mockImgCover(setIndex),
         name: faker.name.findName(),
         follower: faker.datatype.number(),
         following: faker.datatype.number(),
         totalPost: faker.datatype.number(),
         position: sample([
            'Leader',
            'Hr Manager',
            'UI Designer',
            'UX Designer',
            'UI/UX Designer',
            'Project Manager',
            'Backend Developer',
            'Full Stack Designer',
            'Front End Developer',
            'Full Stack Developer'
         ])
      };
   });
   return [200, { users }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/manage-users').reply(async () => {
   const { data } = await axios.get(`https://api.pimo.studio/api/v1/models`)
   var NAME = []
   data.modelList.map(model => (
      NAME.push(model.model.name)
   ));
   var IMAGE = []
   data.modelList.map(model => (
      IMAGE.push(model.model.avatar)
   ));
   var ID = []
   data.modelList.map(model => (
      ID.push(model.model.id)
   ));
   var EMAIL = []
   data.modelList.map(model => (
      EMAIL.push(model.model.mail)
   ));
   var PHONE_NUMBER = []
   data.modelList.map(model => (
      PHONE_NUMBER.push(model.model.phone)
   ));
   var COUNTRY = []
   data.modelList.map(model => (
      COUNTRY.push(model.model.country)
   ));
   var PROVINCE = []
   data.modelList.map(model => (
      PROVINCE.push(model.model.province)
   ));
   var ADDRESS = []
   data.modelList.map(model => (
      ADDRESS.push(model.model.district)
   ));
   var STATUS = []
   data.modelList.map(model => (
      STATUS.push(model.model.status)
   ));
   var GIFTED = []
   data.modelList.map(model => (
      GIFTED.push(model.model.gifted)
   ));
   const users = [...Array(20)].map((_, index) => {
      const setIndex = index + 1;
      return {
         id: createId(setIndex),
         avatarUrl: IMAGE[index],
         name: NAME[index],
         email: EMAIL[index],
         phoneNumber: PHONE_NUMBER[index],
         address: ADDRESS[index],
         country: 'Vietnam',
         state: faker.address.state(),
         city: faker.address.city(),
         zipCode: faker.address.zipCodeByState(),
         company: GIFTED[index],
         isVerified: true,
         status: STATUS[index] ? ('active') : ('banned'),
         role: ADDRESS[index] + ', ' + COUNTRY[index]
      }
   })
   return [200, { users }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/manage-brands').reply(async () => {
   const { data } = await axios.get(`https://api.pimo.studio/api/v1/brands`)
   var NAME = []
   data.brandList.map(brand => (
      NAME.push(brand.brand.name)
   ));
   var IMAGE = []
   data.brandList.map(brand => (
      IMAGE.push(brand.brand.logo)
   ));
   var ID = []
   data.brandList.map(brand => (
      ID.push(brand.brand.id)
   ));
   var EMAIL = []
   data.brandList.map(brand => (
      EMAIL.push(brand.brand.mail)
   ));
   var PHONE_NUMBER = []
   data.brandList.map(brand => (
      PHONE_NUMBER.push(brand.brand.phone)
   ));
   var ADDRESS = []
   data.brandList.map(brand => (
      ADDRESS.push(brand.brand.address)
   ));
   var STATUS = []
   data.brandList.map(brand => (
      STATUS.push(brand.brand.status)
   ));
   var GIFTED = []
   data.brandList.map(brand => (
      GIFTED.push(brand.name)
   ));
   var DESCRIPTION = []
   data.brandList.map(brand => (
      DESCRIPTION.push(brand.brand.description)
   ));
   const users = [...Array(20)].map((_, index) => {
      const setIndex = index + 1;
      return {
         id: createId(setIndex),
         avatarUrl: IMAGE[index],
         name: NAME[index],
         email: EMAIL[index],
         phoneNumber: PHONE_NUMBER[index],
         address: ADDRESS[index],
         state: faker.address.state(),
         country: 'Vietnam',
         city: DESCRIPTION[index],
         zipCode: faker.address.zipCodeByState(),
         company: GIFTED[index],
         isVerified: true,
         status: STATUS[index] ? ('active') : ('banned'),
         role: ADDRESS[index],
      }
   })
   return [200, { users }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/social/followers').reply(() => {
   const followers = [...Array(18)].map((_, index) => {
      const setIndex = index + 2;
      return {
         id: createId(setIndex),
         avatarUrl: mockImgAvatar(setIndex),
         name: faker.name.findName(),
         country: faker.address.country(),
         isFollowed: faker.datatype.boolean()
      };
   });

   return [200, { followers }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/social/friends').reply(() => {
   const friends = [...Array(18)].map((_, index) => {
      const setIndex = index + 2;
      return {
         id: createId(setIndex),
         avatarUrl: mockImgAvatar(setIndex),
         name: faker.name.findName(),
         role: sample([
            'Leader',
            'Hr Manager',
            'UI Designer',
            'UX Designer',
            'UI/UX Designer',
            'Project Manager',
            'Backend Developer',
            'Full Stack Designer',
            'Front End Developer',
            'Full Stack Developer'
         ])
      };
   });

   return [200, { friends }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/social/gallery').reply(() => {
   const gallery = [...Array(18)].map((_, index) => {
      const setIndex = index + 2;
      return {
         id: createId(setIndex),
         title: faker.name.title(),
         postAt: faker.date.past(),
         imageUrl: mockImgCover(setIndex)
      };
   });

   return [200, { gallery }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/account/cards').reply(() => {
   const cards = [...Array(2)].map((_, index) => ({
      id: faker.datatype.uuid(),
      cardNumber: (index === 0 && '**** **** **** 1234') || (index === 1 && '**** **** **** 5678'),
      cardType: (index === 0 && 'master_card') || (index === 1 && 'visa')
   }));

   return [200, { cards }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/account/address-book').reply(() => {
   const addressBook = [...Array(4)].map(() => ({
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      country: faker.address.country(),
      state: faker.address.state(),
      city: faker.address.city(),
      street: faker.address.streetAddress(),
      zipCode: faker.address.zipCode()
   }));

   return [200, { addressBook }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/account/invoices').reply(() => {
   const invoices = [...Array(10)].map(() => ({
      id: faker.datatype.uuid(),
      createdAt: faker.date.past(),
      price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 })
   }));

   return [200, { invoices }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/account/notifications-settings').reply(() => {
   const notifications = {
      activityComments: true,
      activityAnswers: true,
      activityFollows: false,
      applicationNews: true,
      applicationProduct: false,
      applicationBlog: false
   };

   return [200, { notifications }];
});

// ----------------------------------------------------------------------

mock.onGet('/api/user/posts').reply(() => {
   const posts = [...Array(3)].map((_, index) => {
      const setIndex = index + 1;
      return {
         id: faker.datatype.uuid(),
         author: {
            id: createId(1),
            avatarUrl: mockImgAvatar(1),
            name: 'Caitlyn Kerluke'
         },
         isLiked: true,
         createdAt: faker.date.past(),
         media: mockImgFeed(setIndex),
         message: faker.lorem.sentence(),
         personLikes: [...Array(50)].map((_, index) => ({
            name: faker.name.findName(),
            avatarUrl: mockImgAvatar(index + 2)
         })),
         comments: (setIndex === 2 && []) || [
            {
               id: faker.datatype.uuid(),
               author: {
                  id: createId(2),
                  avatarUrl: mockImgAvatar(sample([2, 3, 4, 5, 6])),
                  name: faker.name.findName()
               },
               createdAt: faker.date.past(),
               message: faker.lorem.sentence()
            },
            {
               id: faker.datatype.uuid(),
               author: {
                  id: createId(3),
                  avatarUrl: mockImgAvatar(sample([7, 8, 9, 10, 11])),
                  name: faker.name.findName()
               },
               createdAt: faker.date.past(),
               message: faker.lorem.sentence()
            }
         ]
      };
   });

   return [200, { posts }];
});
