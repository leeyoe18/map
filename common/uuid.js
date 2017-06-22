/**
 * Created by zhangrong on 16/3/5.
 */

import uuid from 'uuid';

function uuidCreate() {
  return uuid.v1().replace(/-/g, '');
}

export default uuidCreate;
