# Leo-Captcha

### Simple Easy yet Powerful captcha for your Website

```jsx
// Import the module
const captcha = require("./captcha");
```

```jsx
// Generate Numeric Captcha.
var numeric = captcha.Captcha("Numeric");

// Generate AlphaNumeric Captcha.
var alphanumeric = captcha.Captcha("AlphaNumeric");

// Generate Alpha Captcha.
var alpha = captcha.Captcha("Alpha");

// Generate Math Captcha.
var math = captcha.Captcha("Math");
```

```jsx
/**
 * Struct {
 *      hash: Promise<'hash of the captcha'>,
 *      captcha: "data:image/png,base64,...."
 * }
 */

numeric.hash.then((hash) => {
    // Save the Hash of Captcha to DB for later verification purpose
});

return numeric.captcha; // Use Data url for the captcha Image.
```

```jsx
// Verify use entered captcha.

successCB = () => {
    // Do things if the captcha Matchs
};
failureCB = () => {
    // Do things if the captcha Match fails.
};

captcha.Verify(User_Entered_Captcha, Hash_Stored_In_DB, successCB, failureCB);
```
