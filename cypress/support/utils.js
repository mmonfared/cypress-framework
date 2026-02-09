
/**
 * Generate Random String
 * @returns {string}
 */
const generateRandomString = (length) => {
    return Math.random().toString(36).substring(2, 2 + length);
}

/*
* Get Dollar Amount from Price Element
* @param {string} priceElement
* @returns {number}
*/
const getDollarAmount = ($el) => {
    const priceText = $el.text()
    const price = parseFloat(priceText.replace('$', ''));
    return price
}

module.exports = { generateRandomString, getDollarAmount }
