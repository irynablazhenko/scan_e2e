import { v4 as uuidv4 } from 'uuid';

export default function generateRandomEmail() {
    const emailPrefix = 'hanna.kabachenko+aqa';
    const domain = '@scan.com';
    const uuid = uuidv4().substring(0, 8);
    const randomEmail = `${emailPrefix}${uuid}${domain}`;
    return randomEmail;
}