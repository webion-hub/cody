/**
 * @param {any} object 
 * @param {string} name 
 */
export function throwIfNullOrEmpty(object, name) {
  if (object)
    return;

  throw new Error(`Argument must not be null: ${name}`);
}

/**
 * @param {string | number} key 
 * @param {Map<number, Function>} actions 
 */
export function tryInvokeCallback(key, actions) {
  const action = actions[key];
  if (action) {
    action();
    return true;
  }

  return false;
}


export async function sleep(time) {
  return new Promise(res => {
    setTimeout(res, time);
  });
}
