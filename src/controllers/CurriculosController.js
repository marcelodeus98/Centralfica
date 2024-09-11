const Curriculos = require('../models/Curriculos');

class CurriculosController {
    async list(req, res, returnData = false) {
        try {
            const result = await Curriculos.findAll({
                attributes: ['id', 'arquivo_nome', 'arquivo_conteudo']
            });
            
            const pdfs = result.map((curriculo) => ({
                id: curriculo.id,
                arquivo_nome: curriculo.arquivo_nome,
                arquivo_base64: curriculo.arquivo_conteudo.toString('base64')
            }));

            if (returnData) {
                return pdfs;
            };

            return res.status(200).json({ pdfs });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ err });
        };
    };


    async view(req, res) {
        const id = req.params.id;
    
        try {
            const file = await Curriculos.findByPk(id, {
                attributes: ['arquivo_conteudo', 'arquivo_nome', 'arquivo_tipo']
            });
    
            if (!file) {
                return res.status(404).json({ msg: 'Arquivo não encontrado.' });
            };
    
            res.setHeader('Content-Type', file.arquivo_tipo);
            res.setHeader('Content-Disposition', `inline; filename="${file.arquivo_nome}"`);
            return res.send(file.arquivo_conteudo);
        } catch (err) {
            console.error(err);
            return res.status(400).json({ err });
        };
    };
    

    async download(req, res) {
        const id = req.params.id;
    
        try {
            const file = await Curriculos.findByPk(id, {
                attributes: ['arquivo_conteudo', 'arquivo_nome', 'arquivo_tipo']
            });
    
            if (!file) {
                return res.status(404).json({ msg: 'Arquivo não encontrado.' });
            };
    
            res.setHeader('Content-Type', file.arquivo_tipo);
            res.setHeader('Content-Disposition', `attachment; filename="${file.arquivo_nome}"`);
            return res.send(file.arquivo_conteudo);
        } catch (err) {
            console.error(err);
            return res.status(400).json({ err });
        };
    };
    

    async delete(req, res) {
        const id = req.params.id;
    
        try {
            const existId = await Curriculos.findByPk(id);
    
            if (!existId) {
                return res.status(404).json({ msg: 'PDF not found.' });
            };
    
            await Curriculos.destroy({ where: { id } });
            return res.status(200).json({ msg: 'PDF deleted successfully.' });
        } catch (err) {
            console.error(err);
            res.status(400).json({ err });
        };
    };
};

module.exports = new CurriculosController();
