const pool = require('./config').pool

var Users = {
        confirmEmail: function confirmEmail(token, uid, done){
                const confirmQuery = "UPDATE Users SET email_confirmed = true WHERE confirmation_token = ? AND id = ?"
                
                var tokenBuffer
                try {
                        tokenBuffer = new Buffer(token, "hex")
                } catch (err) {
                        return done(err)
                }

                pool.getConnection((err, conn) => {
                        if (err)
                                return done(err)
                        conn.query(confirmQuery, [tokenBuffer, uid], (err, rows) => {
                                if (err)
                                        return done(err)
                                return done(null, rows[0])
                        })

                })
        },
        insert: function(user, done){
                const insertQuery = "INSERT INTO Users (email, password, salt, confirmation_token, token_expiration) VALUES(?, ?, ?, ?, ?)";
                const queryParams = [user.email, user.password, user.salt, user.confirmation_token, user.token_expiration]
                pool.getConnection((err, conn) => {
                        if (err)
                                return done(err)
                        conn.query(insertQuery, queryParams, (err, rows) => {
                                if (err)
                                        return done(err)
                                return done(null)
                        })
                })
        },
        selectByEmail: function selectByEmail(email, done){
                const selectQuery = "SELECT * FROM Users WHERE email = ?";
                pool.getConnection((err, conn) => {
                        if (err)
                                return done(err)
                        let output = conn.query(selectQuery, [email], (err, rows) => {
                                if (err)
                                        return done(err)
                                return done(null, rows[0])
                        })
                })
        },
        selectById: function selectById(id, done){
                const selectQuery = "SELECT * FROM Users WHERE id = ?";
                pool.getConnection((err, conn) => {
                        if (err)
                                return done(err)
                        let output = conn.query(selectQuery, [id], (err, rows) => {
                                if (err)
                                        return done(err)
                                return done(null, rows[0])
                        })
                })
        },
        selectByToken: function selectByToken(token, done){
                const selectQuery = "SELECT * FROM Users WHERE confirmation_token = ?";
                let tokenBuffer;
                try {
                        tokenBuffer = new Buffer(token, "hex")
                } catch (err) {
                        return done(err)
                }
                
                pool.getConnection((err, conn) => {
                        if (err)
                                return done(err)
                        conn.query(selectQuery, [tokenBuffer], (err, rows) => {
                                if (err)
                                        return done(err)
                                return done(null, rows[0])
                        })
                })
        }
}
module.exports = {Users}