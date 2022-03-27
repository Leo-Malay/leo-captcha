/**
 *  Developed with Love by Malay Bhavsar
 */
const { createCanvas } = require("canvas");
const { createHash } = require("crypto");
class LeoCaptcha {
    constructor(p = {}) {
        p.enBgColor = p?.enBgColor || !0;
        p.enColor = p?.enColor || !0;
        p.enRotate = p?.enRotate || !0;
        p.bgColorArr = p?.bgColorArr || ["#fff", "#e6e6e6", "#ccc", "#b3b3b3"];
        p.colorArr = p?.colorArr || ["#f00", "#00f", "#a52a2a", "#000"];
        p.rotateArr = p?.rotateArr || [
            0, 0.01, -0.015, 0.02, -0.025, 0.03, -0.035, 0.04, -0.045, 0.05,
            -0.01, 0.015, -0.02, 0.025, -0.03, 0.035, -0.04, 0.045, -0.05,
        ];
        p.width = p?.width || 200;
        p.height = p?.height || 50;
        p.captchaText = undefined;
        p.secret = "10HelloWorld__dlroWolleH01";
        this.p = p;
    }
    Captcha = (captchaType = "AlphaNumeric", captchaLength = 7) => {
        const canvas = createCanvas(this.p.width, this.p.height);
        const cOut = canvas.getContext("2d");
        const floorRandom = (b, a = 99) => Math.floor(Math.random() * a) % b;
        const hash = async (msg) =>
            createHash("sha256", this.p.secret).update(msg).digest("hex");
        const generateCaptcha = () => {
            const numericCaptcha = () => {
                return 48 + floorRandom(10);
            };
            const alphaCaptcha = () => {
                var tmp = 65 + floorRandom(58);
                if (90 < tmp && tmp < 97) tmp = 97 + floorRandom(26);
                return tmp;
            };
            const alphaNumericCaptcha = () => {
                var tmp = 48 + floorRandom(75);
                if (57 < tmp && tmp < 65) tmp = 65 + floorRandom(58);
                if (90 < tmp && tmp < 97) tmp = 97 + floorRandom(26);
                return tmp;
            };
            var tmp,
                c = captchaLength,
                res = [];
            while (c > 0) {
                switch (captchaType) {
                    case "Numeric":
                        tmp = numericCaptcha();
                        break;
                    case "Alpha":
                        tmp = alphaCaptcha();
                        break;
                    case "AlphaNumeric":
                        tmp = alphaNumericCaptcha();
                        break;
                    default:
                        tmp = alphaNumericCaptcha();
                        break;
                }
                res.push(String.fromCharCode(tmp));
                c--;
            }
            return res;
        };
        const MathCaptcha = () => {
            captchaLength = 5;
            var a = 10 + Math.floor(Math.random() * 90),
                b = Math.floor(Math.random() * 10),
                sign = sRand(["+", "-"]),
                tmp;
            write(a, 0);
            write(sign, 2);
            write(b, 3);
            write("=", 4);
            if (sign === "+") tmp = a + b;
            else tmp = a - b;
            this.p.captchaText = hash(String(tmp));
        };
        const sRand = (arr) => {
            return arr[Math.floor(Math.random() * arr.length)];
        };
        const setBgColor = () => {
            cOut.fillStyle = sRand(this.p.bgColorArr);
            cOut.fillRect(0, 0, this.p.width, this.p.height);
        };
        const write = (val, index) => {
            cOut.save();
            cOut.font = this.p.height / 1.8 + "px Verdana";
            if (this.p.enRotate) cOut.rotate(sRand(this.p.rotateArr));
            if (this.p.enColor) cOut.fillStyle = sRand(this.p.colorArr);
            else cOut.fillStyle = "#000";
            cOut.fillText(
                val,
                10 + (index * this.p.width * 0.8333) / captchaLength,
                10 + this.p.height / 2
            );
            cOut.restore();
        };
        // Main Execution.
        if (this.p.enBgColor) setBgColor();
        else {
            cOut.fillStyle = "#fff";
            cOut.fillRect(0, 0, this.p.width, this.p.height);
        }
        if (captchaType == "Math") MathCaptcha();
        else {
            var tmp = generateCaptcha();
            tmp.forEach((v, i) => write(v, i));
            this.p.captchaText = hash(tmp.join(""));
        }
        return { hash: this.p.captchaText, captcha: canvas.toDataURL() };
    };
    Verify = (captchaUser, captchaHash, successCB, failureCB) => {
        const hash = async (msg) =>
            createHash("sha256", this.p.secret).update(msg).digest("hex");
        hash(captchaUser).then((data) => {
            if (data === captchaHash) successCB();
            else failureCB();
        });
    };
    setRotate = (
        enRotate = !0,
        rotateArr = [
            0, 0.01, -0.015, 0.02, -0.025, 0.03, -0.035, 0.04, -0.045, 0.05,
            -0.01, 0.015, -0.02, 0.025, -0.03, 0.035, -0.04, 0.045, -0.05,
        ]
    ) => {
        (this.p.enRotate = enRotate), (this.p.rotateArr = rotateArr);
    };
    setColor = (
        enColor = !0,
        colorArr = ["#f00", "#00f", "#a52a2a", "#000"]
    ) => {
        (this.p.enColor = enColor), (this.p.colorArr = colorArr);
    };
    setBgColor = (
        enBgColor = !0,
        bgColorArr = ["#fff", "#e6e6e6", "#ccc", "#b3b3b3"]
    ) => {
        (this.p.enBgColor = enBgColor), (this.p.bgColorArr = bgColorArr);
    };
    setDimension = (width = 200, height = 50) => {
        this.p.width = width;
        this.p.height = height;
    };
    setSecret = (key) => (this.p.secret = key || this.p.secret);
}

module.exports = new LeoCaptcha();
