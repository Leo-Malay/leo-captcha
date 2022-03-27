# Leo-Captcha

### Simple, Easy, LightWeight yet Powerful captcha for your Website

Hello World I developed this module with the flexibility and simplicity that developers around the world need. I tried to minimise external dependencies and took the utmost care in searching for black holes and bugs. I have made use of Crypto Library of NodeJS to generate "SHA256"

```jsx
// Import the module
const captcha = require("./captcha");
```

<br/>

This module provides 4 types of CAPTCHA options,

1. AlphaNumeric (Includes both Alphabets and Numbers)
2. Alpha (Only Alphabets)
3. Numeric (Only Numbers)
4. Math (Simple Mathematical Equation of addition and subtraction)

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

<br/>

captcha.Captcha() function returns a JSON response containing 2 values i.e. hash Promise and captcha Data URL containing base64 Image of PNG format.

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

<br/>

To verify weather the captcha entered by the user is correct or not, you can use the captcha.Verify() function which takes the User entered captcha along with hash value obtained while generating the captcha and callback functions.

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

<br/>

Want to change the dimension of the captcha image?

```jsx
// Set Dimensions of the Image => (width, height)
captcha.setDimension(200, 50);
```

<br/>

Want to set a unique secret key that is used to salt the hash?

```jsx
// Key used to salt and generate Hash
captcha.setSecret("Enter your unique Key Here.");
```

<br/>

Do you what the captcha to have no or a specific background color?

```jsx
// disable the background (Only White)
captcha.setBgColor(false);
// single background
captcha.setBgColor(true, ["#0f0"]);
// multiple background
captcha.setBgColor(true, ["#f00", "#0f0", "#00f"]);
// reset default
captcha.setBgColor();
```

<br/>

Do you what the captcha to have no or a specific text color?

```jsx
// disable color (Only Black)
captcha.setColor(false);
// single color
captcha.setColor(true, ["#0f0"]);
// multiple color
captcha.setColor(true, ["#f00", "#0f0", "#00f"]);
// reset default
captcha.setColor();
```

<br/>

Do you what the captcha to be in one line or what them jumbled up and down?
Keep values between -0.17 and 0.17 for optimal result

```jsx
// disable the rotate (Inline)
captcha.setRotate(false);
// single type rotate
captcha.setRotate(true, [0.025]);
// multiple type rotate
captcha.setRotate(true, [-0.025, 0, 0.025]);
// reset default
captcha.setRotate();
```
