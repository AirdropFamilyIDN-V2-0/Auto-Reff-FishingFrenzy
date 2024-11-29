const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const chalk = require('chalk');
const ora = require('ora');
const figlet = require('figlet');

// Banner menggunakan figlet
console.log(chalk.cyan(figlet.textSync('Reff Ikan Duyung', { horizontalLayout: 'default' })));
console.log(chalk.greenBright('Reff Automation User By @HarunTampan\n'));

// Baca konfigurasi dari file config.txt
const CONFIG_FILE = path.join(__dirname, 'config.txt');
const config = {};

try {
    const configData = fs.readFileSync(CONFIG_FILE, 'utf-8');
    configData.split('\n').forEach((line) => {
        const [key, value] = line.split('=').map((part) => part.trim());
        if (key && value) config[key] = value;
    });
} catch (err) {
    console.error(chalk.red(`Error reading configuration file: ${err.message}`));
    process.exit(1);
}

// Validasi konfigurasi
const API_URL = config.API_URL;
const PRIVY_APP_ID = config.PRIVY_APP_ID;
const PRIVY_CA_ID = config.PRIVY_CA_ID;

if (!API_URL || (!API_URL.startsWith('http://') && !API_URL.startsWith('https://'))) {
    console.error(chalk.red('Invalid API_URL in config.txt. Please provide a valid URL.'));
    process.exit(1);
}

// Output file untuk menyimpan data token
const TOKEN_FILE = 'tokens.txt';

// Fungsi untuk menyimpan token ke file `tokens.txt`
const saveTokenToFile = (token) => {
    try {
        fs.appendFileSync(TOKEN_FILE, token + '\n', 'utf8');
        console.log(chalk.greenBright(`✔ Token saved to ${TOKEN_FILE}`));
    } catch (err) {
        console.error(chalk.red(`Error saving token: ${err.message}`));
    }
};

// Fungsi untuk login sebagai tamu
const guestLogin = async (deviceId) => {
    const spinner = ora(`Logging in as guest with Device ID: ${deviceId}`).start();
    try {
        const response = await axios.post(`${API_URL}/v1/auth/guest-login`, {
            deviceId,
            teleUserId: null,
            teleName: null,
        });
        const token = response.data.tokens.access.token;
        spinner.succeed(`Logged in as guest. Device ID: ${deviceId}`);
        saveTokenToFile(token);  // Simpan token ke file
        return { token, userId: response.data.user.id };
    } catch (error) {
        spinner.fail(`Error during guest login: ${error.message}`);
        return null;
    }
};

// Fungsi untuk memverifikasi kode referensi
const verifyReferenceCode = async (accessToken, username, koderef) => {
    const spinner = ora(`Verifying code for user: ${username}`).start();
    try {
        const response = await axios.post(
            `${API_URL}/v1/reference-code/verify?code=${koderef}`,
            {},
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (response.status === 200) {
            spinner.succeed(`Code ${koderef} verified successfully for user ${username}.`);
            return true;
        } else {
            spinner.fail(`Verification failed for user ${username}. Status: ${response.status}`);
            return false;
        }
    } catch (error) {
        spinner.fail(`Error verifying code for user ${username}: ${error.message}`);
        return false;
    }
};

// Fungsi utama untuk membuat pengguna
const automateUserCreation = async (numUsers, koderef) => {
    console.log(chalk.magentaBright(`Starting user creation for ${numUsers} users...\n`));
    const results = [];
    for (let i = 0; i < numUsers; i++) {
        const deviceId = uuidv4();
        const username = `user_${Math.random().toString(36).substring(2, 10)}`;
        console.log(chalk.cyan(`Creating user ${i + 1}: ${username} (Device ID: ${deviceId})`));

        const result = await guestLogin(deviceId);
        if (result) {
            const { token } = result;

            const isVerified = await verifyReferenceCode(token, username, koderef);
            results.push({
                username,
                deviceId,
                status: isVerified ? 'Success' : 'Failed Verification',
            });
        } else {
            results.push({ username, deviceId, status: 'Login Failed' });
        }
    }

    console.table(results);
    console.log(chalk.greenBright('\n✔ User creation process completed!'));
};

// Jalankan skrip
(async () => {
    try {
        const numUsers = parseInt(process.argv[2], 10);
        const koderef = process.argv[3];
        if (isNaN(numUsers) || !koderef) {
            throw new Error('Invalid arguments. Usage: node script.js <numUsers> <koderef>');
        }
        await automateUserCreation(numUsers, koderef);
    } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
    }
})();
