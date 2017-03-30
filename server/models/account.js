const dbResponse = require('./database-response');
const Account = require('./database').Account;

/**
 * アカウントモデル
 */
const account = {

  /**
   * アカウントを取得
   * @param id
   * @returns {*}
   */
  fetchById: (id) => {
    return dbResponse.find(Account.findOne({
      where: { id }
    }));
  },

  /**
   * twitterID からアカウントを取得 (Passport専用)
   * @param twitterId
   * @returns {*}
   */
  fetchByTwitterId: (twitterId) => {
    return dbResponse.find(Account.findOne({
      where: { twitterId }
    }));
  },

  /**
   * twitterName からアカウントを取得
   * @param twitterName
   * @returns {*}
   */
  fetchByTwitterName: (twitterName) => {
    return dbResponse.find(Account.findOne({
      where: { twitterName }
    }));
  },

  /**
   * アカウントを作成 (Passport専用)
   * @param data
   * @returns {*|Object|Promise.<Instance>}
   */
  create: (data) => {
    return dbResponse.create(Account.create(data));
  },

  /**
   * アカウントの表示名を修正
   * @param id
   * @param name
   * @returns {*|Promise.<Array.<affectedCount, affectedRows>>}
   */
  updateName: (id, name) => {
    return dbResponse.update(Account.update({ name }, { where: { id } }));
  },

  /**
   * アカウントのtwitter表示名を修正 (Passport専用)
   * @param id
   * @param twitterName
   * @returns {*|Promise.<Array.<affectedCount, affectedRows>>}
   */
  updateTwitterName: (id, twitterName) => {
    return dbResponse.update(Account.update({ twitterName }, { where: { id } }));
  },

  /**
   * アカウントのtwitter画像URLを修正 (Passport専用)
   * @param id
   * @param twitterImage
   * @returns {*|Promise.<Array.<affectedCount, affectedRows>>}
   */
  updateTwitterImage: (id, twitterImage) => {
    return dbResponse.update(Account.update({ twitterImage }, { where: { id } }));
  },

  /**
   * アカウントのデータを修正
   * @param id
   * @param data
   * @returns {*}
   */
  update: (id, data) => {
    return dbResponse.update(Account.update(data, { where: { id } }));
  },

  /**
   * アカウントを削除
   * @param id
   * @returns {*|Promise.<Integer>|Promise.<undefined>}
   */
  destroy: (id) => {
    return dbResponse.destroy(Account.destroy({ where: { id } }));
  }
};

module.exports = account;