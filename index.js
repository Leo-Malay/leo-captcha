/**
 *  Developed with Love by Malay Bhavsar
 */
const { createCanvas } = require("canvas");
const { createHash } = require("crypto");
class LeoCaptcha {
    constructor(params = {}) {
        params.enableBgColor = params?.enableBgColor || true;
        params.enableColor = params?.enableColor || true;
        params.enableRotate = params?.enableRotate || true;
        params.bgColorArray = params?.bgColorArray || [
            "#fff",
            "#e6e6e6",
            "#ccc",
            "#b3b3b3",
        ];
        params.colorArray = params?.colorArray || [
            "#f00",
            "#00f",
            "#a52a2a",
            "#000",
        ];
        params.rotateArray = params?.rotateArray || [
            0, 0.01, -0.015, 0.02, -0.025, 0.03, -0.035, 0.04, -0.045, 0.05,
            -0.01, 0.015, -0.02, 0.025, -0.03, 0.035, -0.04, 0.045, -0.05,
        ];
        params.width = params?.width || 200;
        params.height = params?.height || 50;
        params.captchaText = undefined;
        params.secret = "10HelloWorld__dlroWolleH01";
        this.params = params;
    }
    Captcha = (captchaType = "AlphaNumeric", captchaLength = 7) => {
        const canvas = createCanvas(this.params.width, this.params.height);
        const canvasOut = canvas.getContext("2d");
        const floorRandom = (b, a = 99) => Math.floor(Math.random() * a) % b;
        const hash = async (msg) =>
            createHash("sha256", this.params.secret).update(msg).digest("hex");
        const generateCaptcha = () => {
            const numericCaptcha = () => {
                var tmp = floorRandom(58);
                if (tmp < 48) tmp = 48 + floorRandom(10);
                return tmp;
            };
            const alphaCaptcha = () => {
                var tmp = floorRandom(123, 999);
                if (tmp < 65) tmp = 65 + floorRandom(58);
                if (90 < tmp && tmp < 97) tmp = 97 + floorRandom(26);
                return tmp;
            };
            const alphaNumericCaptcha = () => {
                var tmp = floorRandom(123, 999);
                if (tmp < 48) tmp = 48 + floorRandom(75);
                if (57 < tmp && tmp < 65) tmp = 65 + floorRandom(58);
                if (90 < tmp && tmp < 97) tmp = 97 + floorRandom(26);
                return tmp;
            };
            let tmp,
                count = captchaLength,
                res = [];
            while (count > 0) {
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
                count--;
            }
            return res;
        };
        const MathCaptcha = () => {
            captchaLength = 7;
            let a = 10 + Math.floor(Math.random() * 90),
                b = Math.floor(Math.random() * 10),
                sign = selectRandom(["+", "-"]),
                tmp;
            write(a, 0);
            write(sign, 2);
            write(b, 3);
            write("=", 4);
            write("", 5);
            switch (sign) {
                case "+":
                    tmp = a + b;
                    break;
                case "-":
                    tmp = a - b;
                    break;
            }
            this.params.captchaText = hash(String(tmp));
        };
        const selectRandom = (array) => {
            // Selects a random array element;
            return array[Math.floor(Math.random() * array.length)];
        };
        const setBgColor = () => {
            // Set Background Color
            canvasOut.fillStyle = selectRandom(this.params.bgColorArray);
            canvasOut.fillRect(0, 0, this.params.width, this.params.height);
        };
        const write = (val, index) => {
            canvasOut.save();
            canvasOut.font = this.params.height / 1.8 + "px Verdana";
            if (this.params.enableRotate)
                canvasOut.rotate(selectRandom(this.params.rotateArray));
            if (this.params.enableColor)
                canvasOut.fillStyle = selectRandom(this.params.colorArray);
            else canvasOut.fillStyle = "#000";
            canvasOut.fillText(
                val,
                10 + (index * this.params.width * 0.8333) / captchaLength,
                10 + this.params.height / 2
            );
            canvasOut.restore();
        };
        // Main Execution.
        if (this.params.enableBgColor) setBgColor();
        else {
            canvasOut.fillStyle = "#fff";
            canvasOut.fillRect(0, 0, this.params.width, this.params.height);
        }
        if (captchaType == "Math") MathCaptcha();
        else {
            let tmp = generateCaptcha();
            tmp.forEach((v, i) => write(v, i));
            this.params.captchaText = hash(tmp.join(""));
        }
        return { hash: this.params.captchaText, captcha: canvas.toDataURL() };
    };
    Verify = (captchaUser, captchaHash, successCB, failureCB) => {
        const hash = async (msg) =>
            createHash("sha256", this.params.secret).update(msg).digest("hex");
        hash(captchaUser).then((data) => {
            if (data === captchaHash) successCB();
            else failureCB();
        });
    };
    setRotate = (
        enableRotate = true,
        rotateArray = [
            0, 0.01, -0.015, 0.02, -0.025, 0.03, -0.035, 0.04, -0.045, 0.05,
            -0.01, 0.015, -0.02, 0.025, -0.03, 0.035, -0.04, 0.045, -0.05,
        ]
    ) => {
        this.params.enableRotate = enableRotate;
        this.params.rotateArray = rotateArray;
    };
    setColor = (
        enableColor = true,
        colorArray = ["#f00", "#00f", "#a52a2a", "#000"]
    ) => {
        this.params.enableColor = enableColor;
        this.params.colorArray = colorArray;
    };
    setBgColor = (
        enableBgColor = true,
        bgColorArray = ["#fff", "#e6e6e6", "#ccc", "#b3b3b3"]
    ) => {
        this.params.enableBgColor = enableBgColor;
        this.params.bgColorArray = bgColorArray;
    };
    setDimension = (width = 200, height = 50) => {
        this.params.width = width;
        this.params.height = height;
    };
    setSecret = (key) => (this.params.secret = key || this.params.secret);
}

module.exports = new LeoCaptcha();
