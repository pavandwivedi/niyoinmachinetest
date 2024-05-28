import crypto from "crypto";

function generateVerificationCode() {
    return crypto.randomBytes(3).toString('hex');
}

export default generateVerificationCode
