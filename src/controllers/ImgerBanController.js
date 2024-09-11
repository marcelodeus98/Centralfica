const ImgerBan = require('../models/ImgerBan');

class ImgerBanController {
    async list(req, res, returnData = false) {
        try {
            const result = await ImgerBan.findAll({
                attributes: ['id', 'name', 'data']
            });
            
            const imgers = result.map(indice => ({
                ...indice.toJSON(),
                data: indice.data ? indice.data.toString('base64') : null,
            }));
            
            if (returnData) {
                return imgers;
            };

            return res.status(200).json({ imgers });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ err });
        };
    };

    async create(req, res) {
        const name = req.file.originalname;
        const data = req.file.buffer;

        if (!name || !data) {
            res.status(500).json({ msg: 'Error inserting image', error: err });
        };

        try {
            await ImgerBan.create({ name, data });
            res.redirect('/pagina_fica_descomplica');
        } catch (err) {
            console.error(err);
            res.status(400).json({ err });
        };
    };

    async delete(req, res) {
        const id = req.params.id;

        try {
            const existId = await ImgerBan.findByPk(id);

            if (!existId) {
                return res.status(404).json({ msg: 'Image not found.' });
            };

            await ImgerBan.destroy({ where: { id } });
            return res.status(200).json({ msg: 'Image deleted successfully.' });
        } catch (err) {
            console.error(err);
            res.status(400).json({ err });
        };
    };
}

module.exports = new ImgerBanController();
