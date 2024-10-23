export function generateRandomPassword(length:number) {
    const characters = 'A1BCDEF3GHIJ2K@LMNOPQR0STU4VWXYZa#bcdef5ghijk&lmn6opq7rstu8vwx9y$z';
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    return password;
}


