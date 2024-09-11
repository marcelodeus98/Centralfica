const Indez = require('../models/Indez');

class IndezController {
    async list(req, res, returnData = false) {
        try {
            const result = await Indez.findAll();
            
            const indez = result.map(indice => ({
                ...indice.toJSON(),
                dataPC: indice.dataPC ? indice.dataPC.toString('base64') : null,
                dataMobi: indice.dataMobi ? indice.dataMobi.toString('base64') : null
            }));
            
            if (returnData) {
                return indez;
            }
            return res.status(200).json({ indez });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ err });
        };
    };

    async create(req, res) {
        const {name, timeban} = req.body
        const dataPC = req.files['imagePC'] ? req.files['imagePC'][0].buffer : null;
        const dataMobi = req.files['imageMobi'] ? req.files['imageMobi'][0].buffer : null;

        if (!name || (!dataPC && !dataMobi)) {
            return res.status(400).json({ msg: 'Image is not provided.' });
        };

        try {
            await Indez.create({ name, dataPC, dataMobi, timeban });
            res.redirect('/pagina_principal');
        } catch (err) {
            res.status(500).json({ msg: 'Error inserting image', error: err });
        };
    };

    async delete(req, res) {
        const id = req.params.id;

        try {
            const existId = await Indez.findByPk(id);

            if (!existId) {
                return res.status(404).json({ msg: 'Image not found.' });
            };

            await Indez.destroy({ where: { id } });
            return res.status(200).json({ msg: 'Image deleted successfully.' });
        } catch (err) {
            console.error(err);
            res.status(400).json({ err });
        };
    };
};

module.exports = new IndezController();