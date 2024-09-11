const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: false,
});

class UserRepository {
    async findAll() {
        try {
            return await User.findAll({
                attributes: ['id', 'name', 'email'],
            });
        } catch (err) {
            console.log(err);
            return [];
        };
    };

    async findById(id) {
        if (!id) {
            throw new Error('O ID deve ser fornecido');
        }
        
        const user = await User.findOne({ where: { id } });
        console.log('Usuário encontrado:', user); // Adicione este log
        return user;
    };


    async findByEmail(email) {
        if (!email) {
            throw new Error('O email deve ser fornecido');
        }
        
        const user = await User.findOne({ where: { email } });
        console.log('Usuário encontrado:', user); // Adicione este log
        return user;
    };

    async create(name, email, password) {
        try {
            const hash = await bcrypt.hash(password, 10);
            return await User.create({ name, email, password: hash });
        } catch (err) {
            console.log(err);
        };
    };

    async findEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            return user !== null;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async update(id, name, email, password) {
        try {
            const user = await this.findById(id);
            if (!user) {
                return { status: false, err: 'The user does not exist' };
            }

            const editUser = {};
            if (email && !(await this.findEmail(email))) {
                editUser.email = email;
            }

            if (name) {
                editUser.name = name;
            };

            const hash = await bcrypt.hash(password, 10);
            
            editUser.password = hash;

            await User.update(editUser, { where: { id } });
            return { status: true };
        } catch (err) {
            return { status: false, err };
        }
    }

    async delete(id) {
        try {
            await User.destroy({ where: { id } });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new UserRepository();
