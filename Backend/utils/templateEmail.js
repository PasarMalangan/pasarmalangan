const emailTemplate = (resetUrl) => `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Kata Sandi</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
        }
        .email-header {
            background-color: #2196f3;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .email-body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .email-body h1 {
            color: #2196f3;
        }
        .email-footer {
            text-align: center;
            padding: 15px;
            background-color: #f1f1f1;
            color: #666666;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #2196f3;
            text-decoration: none;
            border-radius: 4px;
        }
        .button:hover {
            background-color: #1976d2;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Reset Kata Sandi</h1>
        </div>
        <div class="email-body">
            <h1>Permintaan Reset Kata Sandi</h1>
            <p>Kami menerima permintaan untuk mereset kata sandi akun Anda di <strong>Pasar Malangan</strong>. Jika ini memang Anda, silakan klik tombol di bawah untuk melanjutkan proses reset kata sandi:</p>
            <p><a href="${resetUrl}" class="button">Reset Kata Sandi</a></p>
            <p>Jika Anda tidak meminta reset kata sandi, abaikan email ini. Kata sandi Anda tetap aman.</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 Pasar Malangan. Semua Hak Dilindungi.</p>
            <p><a href="#">Privasi</a> | <a href="#">Ketentuan</a></p>
        </div>
    </div>
</body>
</html>

`;

const emailsucceeded = () => 
    `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pendaftaran Berhasil</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
        }
        .email-header {
            background-color: #4caf50;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .email-body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .email-body h1 {
            color: #4caf50;
        }
        .email-footer {
            text-align: center;
            padding: 15px;
            background-color: #f1f1f1;
            color: #666666;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #4caf50;
            text-decoration: none;
            border-radius: 4px;
        }
        .button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Selamat Datang di Pasar Malangan!</h1>
        </div>
        <div class="email-body">
            <h1>Halo, Pedagang UMKM!</h1>
            <p>Selamat! Anda telah berhasil mendaftar sebagai pedagang UMKM di <strong>Pasar Malangan</strong>. Kami sangat senang Anda bergabung dengan kami untuk memperluas jangkauan bisnis Anda.</p>
            <p>Berikut adalah langkah selanjutnya yang dapat Anda lakukan:</p>
            <ol>
                <li>Masuk ke akun Anda menggunakan email yang terdaftar.</li>
                <li>Tambahkan produk pertama Anda dan tunggu persetujuan dari tim kami.</li>
                <li>Nikmati berbagai fitur yang membantu bisnis Anda berkembang.</li>
            </ol>
            <p>Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami melalui email ini atau di halaman <a href="https://pasarmalangan.cyou/helpsupport">Pusat Bantuan</a>.</p>
            <p><a href="https://pasarmalangan.cyou/login" class="button">Masuk ke Akun</a></p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 Pasar Malangan. Semua Hak Dilindungi.</p>
            <p><a href="#">Privasi</a> | <a href="#">Ketentuan</a></p>
        </div>
    </div>
</body>
</html>
`
const emailfail = () => `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pendaftaran Gagal</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
        }
        .email-header {
            background-color: #f44336;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .email-body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .email-body h1 {
            color: #f44336;
        }
        .email-footer {
            text-align: center;
            padding: 15px;
            background-color: #f1f1f1;
            color: #666666;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #f44336;
            text-decoration: none;
            border-radius: 4px;
        }
        .button:hover {
            background-color: #d32f2f;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Pendaftaran Gagal</h1>
        </div>
        <div class="email-body">
            <h1>Mohon Maaf</h1>
            <p>Dengan berat hati, kami informasikan bahwa pendaftaran Anda sebagai pedagang UMKM di <strong>Pasar Malangan</strong> tidak dapat diterima.</p>
            <p>Hal ini dikarenakan verifikasi identitas menunjukkan bahwa Anda bukan penduduk asal Malang, sesuai dengan kebijakan kami saat ini.</p>
            <p>Jika Anda merasa ini adalah kesalahan atau memiliki pertanyaan lebih lanjut, silakan menghubungi tim kami melalui <a href="https://pasarmalangan.cyou/helpsupport">Pusat Bantuan</a> atau balas email ini.</p>
            <p>Kami sangat menghargai minat Anda dan berharap dapat melayani Anda di lain kesempatan.</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 Pasar Malangan. Semua Hak Dilindungi.</p>
            <p><a href="#">Privasi</a> | <a href="#">Ketentuan</a></p>
        </div>
    </div>
</body>
</html>
`

module.exports = {emailTemplate, emailfail, emailsucceeded}