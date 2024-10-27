// test/EsculturaController.test.js
const EsculturaController = require('../src/api/controllers/EsculturaController');

describe('EsculturaController', () => {
    let esculturaService;
    let controller;
    let req;
    let res;

    beforeEach(() => {
        esculturaService = {
            addEscultura: jest.fn(),
            getEsculturas: jest.fn(),
            getAllEsculturas: jest.fn(),
            updateNombreEscultura: jest.fn(),
            updateEsculturaDescripcion: jest.fn(),
            updateFechaEscultura: jest.fn(),
            deleteEscultura: jest.fn(),
        };

        controller = new EsculturaController(esculturaService);

        req = {
            body: {},
            params: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('should add a sculpture', () => {
        req.body = { name: 'Escultura1' };

        controller.addEscultura(req, res);

        expect(esculturaService.addEscultura).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Escultura creada exitosamente.' });
    });

    test('should get a sculpture by name', () => {
        req.params.name = 'Escultura1';
        const escultura = { name: 'Escultura1' };
        esculturaService.getEsculturas.mockReturnValue(escultura);

        controller.getEscultura(req, res);

        expect(esculturaService.getEsculturas).toHaveBeenCalledWith('Escultura1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(escultura);
    });

    test('should return 404 if sculpture not found', () => {
        req.params.name = 'Escultura1';
        esculturaService.getEsculturas.mockReturnValue(null);

        controller.getEscultura(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Escultura no encontrada.' });
    });

    test('should get all sculptures', () => {
        const esculturas = [{ name: 'Escultura1' }, { name: 'Escultura2' }];
        esculturaService.getAllEsculturas.mockReturnValue(esculturas);

        controller.getAllEsculturas(req, res);

        expect(esculturaService.getAllEsculturas).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(esculturas);
    });

    test('should update sculpture name', () => {
        req.params.name = 'Escultura1';
        req.body.newName = 'NewEscultura';

        controller.updateNombreEscultura(req, res);

        expect(esculturaService.updateNombreEscultura).toHaveBeenCalledWith('Escultura1', 'NewEscultura');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Nombre de la escultura actualizado exitosamente.' });
    });

    test('should update sculpture description', () => {
        req.params.name = 'Escultura1';
        req.body.newDescription = 'New Description';

        controller.updateEsculturaDescripcion(req, res);

        expect(esculturaService.updateEsculturaDescripcion).toHaveBeenCalledWith('Escultura1', 'New Description');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Descripcion de la escultura actualizada exitosamente.' });
    });

    test('should update sculpture date', () => {
        req.params.name = 'Escultura1';
        req.body.newFecha = '2024-10-26';

        controller.updateFechaEscultura(req, res);

        expect(esculturaService.updateFechaEscultura).toHaveBeenCalledWith('Escultura1', '2024-10-26');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Fecha de la escultura actualizada exitosamente.' });
    });

    test('should delete a sculpture', () => {
        req.params.name = 'Escultura1';
        esculturaService.deleteEscultura.mockReturnValue(true);

        controller.deleteEscultura(req, res);

        expect(esculturaService.deleteEscultura).toHaveBeenCalledWith('Escultura1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Escultura eliminada exitosamente.' });
    });

    test('should return 404 if sculpture not found when deleting', () => {
        req.params.name = 'Escultura1';
        esculturaService.deleteEscultura.mockReturnValue(false);

        controller.deleteEscultura(req, res);

        expect(esculturaService.deleteEscultura).toHaveBeenCalledWith('Escultura1');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Escultura no encontrada.' });
    });
});
