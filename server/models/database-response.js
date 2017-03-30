const databaseResponse = {
  create: (promiseObj) => {
    return promiseObj.then((result) => {
      if (result === null) {
        return null;
      }
      return result;
    });
  },
  find: (promiseObj) => {
    return promiseObj.then((result) => {
      // 複数件取得
      if (result instanceof Array) {
        return result;
      }
      // １件取得(記録なし)
      if (result === null) {
        return null;
      }
      // １件取得
      return result.get({ plain: true });
    });
  },
  update: (promiseObj) => {
    return promiseObj.then(() => {
      return true;
    });
  },
  destroy: (promiseObj) => {
    return promiseObj.then(() => {
      return true;
    });
  }
};

module.exports = databaseResponse;
