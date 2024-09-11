const Planos = require('../models/Planos');

class PlanosController {
    async list(req, res, returnData = false) {
        try {
            const result = await Planos.findAll({
                attributes: ['id', 'name', 'data']
            });
            
            const planos = result.map(indice => ({
                ...indice.toJSON(),
                data: indice.data ? indice.data.toString('base64') : null,
            }));
            
            if (returnData) {
                return planos;
            };
            
            return res.status(200).json({ planos });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ err });
        };
    };

    async create(req, res) {
        const { name, preco } = req.body;
        const data = req.file.buffer;

        if (!name || !data) {
            return res.status(400).json({ msg: 'Image is not provided.' });
        };

        try {
            await Planos.create({ name, data, preco });
            res.redirect('/pagina_assine_ja');
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Error inserting image', error: err });
        };
    };

    async delete(req, res) {
        const id = req.params.id;

        try {
            const existId = await Planos.findByPk(id);

            if (!existId) {
                return res.status(404).json({ msg: 'Image not found.' });
            }

            await Planos.destroy({ where: { id } });
            return res.status(200).json({ msg: 'Image deleted successfully.' });
        } catch (err) {
            console.error(err);
            res.status(400).json({ err });
        };
    };
};

module.exports = new PlanosController();
