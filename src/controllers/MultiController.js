const Multi = require('../models/Multi');

class MultiController {
    async list(req, res, returnData = false) {
        try {
            const result = await Multi.findAll({
                attributes: ['id', 'name', 'data']
            });
            
            const multi = result.map(indice => ({
                ...indice.toJSON(),
                data: indice.data ? indice.data.toString('base64') : null,
            }));
            
            if (returnData) {
                return multi;
            };

            return res.status(200).json({ multi });
            
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
            await Multi.create({ name, data });
            res.redirect('/pagina_servicos');
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Error inserting image', error: err });
        };
    };

    async delete(req, res) {
        const id = req.params.id;

        try {
            const existId = await Multi.findByPk(id);

            if (!existId) {
                return res.status(404).json({ msg: 'Image not found.' });
            };

            await Multi.destroy({ where: { id } });
            return res.status(200).json({ msg: 'Image deleted successfully.' });
        } catch (err) {
            console.error(err);
            res.status(400).json({ err });
        };
    };
};

module.exports = new MultiController();
