export const studentAdmissionTemplate=(data :any):string=>{
    console.log(data)
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to [School/College Name]</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            background-color: #fff;
            margin: 40px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #4caf50;
            font-size: 24px;
            text-align: center;
        }

        .header {
            background-color: #4caf50;
            color: white;
            padding: 10px 0;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }

        .content {
            margin: 20px 0;
        }

        .content p {
            font-size: 16px;
            color: #333;
            line-height: 1.6;
        }

        .content .highlight {
            font-weight: bold;
            color: #2e8b57;
        }

        .login-details {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            font-size: 16px;
        }

        .login-details p {
            margin: 8px 0;
        }

        .button-container {
            text-align: center;
            margin: 20px 0;
        }

        .button {
            background-color: #4caf50;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            transition: background-color 0.3s;
        }

        .button:hover {
            background-color: #45a049;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #aaa;
            margin-top: 30px;
        }

        .footer a {
            color: #2e8b57;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }

        .password-reset {
            margin: 15px 0;
            text-align: center;
        }

        .password-reset a {
            color: #ff5722;
            font-weight: bold;
            text-decoration: none;
        }

        .password-reset a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>

    <div class="container">
        <div class="header">
            <h1>Welcome to [School/College Name]!</h1>
        </div>

        <div class="content">
            <p>Dear <span class="highlight">[Student Name]</span>,</p>

            <p>We are thrilled to welcome you to <span class="highlight">[School/College Name]</span>! Your admission to
                <span class="highlight">[Class Name]</span> has been confirmed, and we are excited to have you as part of
                our academic community.</p>

            <p>Here are your login credentials to access our student portal:</p>

            <div class="login-details">
                <p><strong>Email:</strong> [Student Email]</p>
                <p><strong>Password:</strong> [Temporary Password]</p>
            </div>

            <p>Please use the following link to log in to your account, and we encourage you to change your password
                after your first login:</p>
        </div>

        <div class="button-container">
            <a href="[Login URL]" class="button">Login to Your Account</a>
        </div>

        <div class="password-reset">
            <p>Want to change your password now?</p>
            <a href="[Password Reset URL]">Click here to reset your password</a>
        </div>

        <div class="content">
            <p>Here are your admission details:</p>
            <ul>
                <li><strong>Admission Number:</strong> [Admission Number]</li>
                <li><strong>Class & Section:</strong> [Class Name & Section]</li>
                <li><strong>Orientation Date:</strong> [Orientation Date]</li>
                <li><strong>First Day of Class:</strong> [Joining Date]</li>
            </ul>

            <p>If you have any questions or need further assistance, feel free to <a href="mailto:[school-email]">contact
                    us</a> or visit our website.</p>
        </div>

        <div class="footer">
            <p>© [Year] [School/College Name]. All rights reserved.</p>
            <p><a href="[Unsubscribe Link]">Unsubscribe</a> from our emails.</p>
        </div>
    </div>

</body>

</html>
`;
}