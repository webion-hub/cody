
/**
 * @param {any} object 
 * @param {string} name 
 */
export function throwIfNullOrEmpty(object, name) {
    if (object)
        return;

    throw new Error(`Argument must not be null: ${name}`);
}