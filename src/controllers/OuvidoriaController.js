const Ouvidoria = require('../models/Ouvidoria');

class OuvidoriaController {
    async list(req, res, returnData = false) {
        try {
            const result = await Ouvidoria.findAll();

            if (returnData) {
                return result;
            };

            return res.status(200).json({ result });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ err });
        };
    };

    async delete(req, res) {
        const id = req.params.id;
    
        try {
            const existId = await Ouvidoria.findByPk(id);
    
            if (!existId) {
                return res.status(404).json({ msg: 'Message not found.' });
            };
    
            await Ouvidoria.destroy({ where: { id } });
            return res.status(200).json({ msg: 'Messege deleted successfully.' });
            
        } catch (err) {
            console.error(err);
            res.status(400).json({ err });
        };
    };
};

module.exports = new OuvidoriaController();
