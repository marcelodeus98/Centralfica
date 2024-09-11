const Imger = require('../models/Imger');

class ImgerController {
    async list(req, res, returnData = false) {
        try {
            const result = await Imger.findAll({
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
            return res.status(400).json({ msg: 'Image is not provided.' });
        };

        try {
            await Imger.create({ name, data });
            res.redirect('/pagina_fica_descomplica');
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Error inserting image', error: err });
        };
    };

    async delete(req, res) {
        const id = req.params.id;

        try {
            const existId = await Imger.findByPk(id);

            if (!existId) {
                return res.status(404).json({ msg: 'Image not found.' });
            };

            await Imger.destroy({ where: { id } });
            return res.status(200).json({ msg: 'Image deleted successfully.' });
        } catch (err) {
            console.error(err);
            res.status(400).json({ err });
        };
    };
}

module.exports = new ImgerController();
