const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserController {
    async login(req, res) {
        const { email, password } = req.body;
    
        try {
            const user = await User.findByEmail(email);
    
            if (!user) {
                return res.status(401).json({ status: false, message: 'Usuário não encontrado.' });
            };
    
            const isMatch = await bcrypt.compare(password, user.password);

            if (user.name === 'admin') {
                if (password !== user.password && isMatch == false ) {
                    return res.status(401).json({ status: false, message: 'Senha incorreta.' });
                }
            } else {
                if (!isMatch) {
                    return res.status(401).json({ status: false, message: 'Senha incorreta.' });
                };
            };
    
            req.session.userId = user.id;
            req.session.userName = user.name;

            
            res.status(200).json({ status: true, message: 'Login bem-sucedido.' });
        } catch (err) {
            console.error('Erro durante o login:', err); // Adicione este log
            res.status(400).json({ status: false, message: 'Erro no login', err });
        };
    };

    async logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao encerrar a sessão.' });
            };
            res.status(200).json({ message: 'Logout bem-sucedido.' });
        });
    }

    async list(req, res, returnData = false) {
        try {
            const result = await User.findAll();

            if (returnData) {
                return result;
            };

            return res.status(200).json({ result });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ err });
        };
    };

    async listUserId(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ msg: 'Usuário não encontrado.' });
            };

            res.status(200).json({ user });
        } catch (err) {
            res.status(400).json({ err });
        };
    };

    async create(req, res) {
        const { name, email, password } = req.body;
        const errors = [];

        try {
            if (!email) {
                errors.push('Email não fornecido.');
            };

            const existEmail = await User.findEmail(email);
            if (existEmail) {
                errors.push('Email já está em uso.');
            };

            if (!password) {
                errors.push('Senha não fornecida.');
            };

            if (errors.length > 0) {
                return res.status(400).json({ msg: errors });
            };

            await User.create(name, email, password);
            res.status(200).json({ msg: 'Usuário criado com sucesso.' });
        } catch (err) {
            res.status(400).json({ err });
        }
    }


    async editUserPage(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findById(id);
    
            if (!user) {
                return res.status(404).json({ msg: 'Usuário não encontrado.' });
            };
    
            // Renderiza a página e passa o objeto `user` para a view
            res.render('pageEditUser', { user });
        } catch (err) {
            res.status(400).json({ err });
        };
    };

    async toAlter(req, res) {
        try {
            const id = req.params.id;
            const { name, email, password } = req.body;

            const result = await User.update(id, name, email, password);

            if (!result || !result.status) {
                return res.status(406).json(result.err);
            };

            res.status(200).json({ msg: 'Usuário alterado com sucesso.' });
        } catch (err) {
            res.status(400).json({ err });
        };
    };

    async delete(req, res) {
        const id = req.params.id;

        try {
            const existId = await User.findById(id);

            if (!existId) {
                return res.status(404).json({ msg: 'User not found.' });
            };

            await User.delete(id);
            return res.status(200).json({ msg: 'User deleted successfully.' });
        } catch (err) {
            console.error(err);
            res.status(400).json({ err });
        };
    };

    async recoverPassword(req, res) {
        const email = req.body.email;

        try {
            const result = await PasswordToken.create(email);

            if (!result.status) {
                return res.status(406).send(result.err);
            }

            const token = result.token.toString();
            emailSending.sendEmail(token, email);
            res.status(200).send(token);
        } catch (err) {
            res.status(400).json({ err });
        };
    };

    async changePassword(req, res) {
        const token = req.body.token;
        const password = req.body.password;

        try {
            const isTokenValid = await PasswordToken.validate(token);

            if (!isTokenValid.status) {
                return res.status(406).send('Token inválido.');
            }

            await User.passwordUpdate(password, isTokenValid.token.userId, isTokenValid.token.token);
            await PasswordToken.setUsed(token);
            res.status(200).send('Senha alterada com sucesso.');
        } catch (err) {
            res.status(400).json({ err });
        };
    };
};

module.exports = new UserController();
