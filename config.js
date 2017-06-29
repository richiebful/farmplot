var config = {};

config.domain = "localhost:3000"

config.email = {
        setup: {
                service: "Gmail",
                auth: {
                        user: "richardbfulop@gmail.com",
                        password: "semngnxtkiyqwqgr"
                }
        },
        confirmationMsg: function confirmation(userEmail, token){
                return {
                        from: '"Richard Fulop" <richardbfulop@gmail.com>',
                        to: userEmail,
                        subject: 'Farmplot: Please confirm your email address',
                        text: "Thanks for signing up to Farmplot. Go to this link (http://localhost:8000/confirm?token="+ token + ") to confirm your email address and start working with us\nThanks,\nThe Farmplot Team",
                        html: "Thanks for signing up to Farmplot. Go <a href='http://localhost:8000/confirm?token="+ token +">here</a> to confirm your email address and start working with us\nThanks,\nThe Farmplot Team"
                }
        }
}

config.mysqlConnection = {
        host: "localhost",
        database: "fplot",
        user: "root",
        password: "050L|tLeT95$="
}

module.exports = config