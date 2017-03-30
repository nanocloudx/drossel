'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('accounts', [{
      id: '892f6791-7d49-4474-9f37-df77f3f4dd98',
      name: 'なのくろ',
      twitterName: 'nanocloudx',
      twitterImage: '767316104502927362/a-ewQvSE_bigger.jpg',
      twitterId: 237690020,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 'a2894003-50e1-4cbb-898b-db31aee96996',
      name: '黒曜',
      twitterName: 'kokuyouwind',
      twitterImage: '721332648598048768/a7UEvfL2_bigger.jpg',
      twitterId: 19014831,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkDelete('accounts', {id: '892f6791-7d49-4474-9f37-df77f3f4dd98'}, {}),
      queryInterface.bulkDelete('accounts', {id: 'a2894003-50e1-4cbb-898b-db31aee96996'}, {})
    ]);
  }
};
