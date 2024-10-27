// test/SculptorController.test.js
const SculptorController = require('../src/api/controllers/SculptorController');

describe('SculptorController', () => {
    let sculptorService;
    let controller;
    let req;
    let res;

    beforeEach(() => {
        sculptorService = {
            addSculptor: jest.fn(),
            getSculptor: jest.fn(),
            getAllSculptors: jest.fn(),
            updateSculptorName: jest.fn(),
            updateSculptorBiography: jest.fn(),
            updateSculptorContact: jest.fn(),
            updateSculptorWorks: jest.fn(),
            deleteSculptor: jest.fn(),
        };

        controller = new SculptorController(sculptorService);

        req = {
            body: {},
            params: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('should add a sculptor', () => {
        req.body = { name: 'Sculptor1' };

        controller.addSculptor(req, res);

        expect(sculptorService.addSculptor).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Escultor creado exitosamente.' });
    });

    test('should get a sculptor by name', () => {
        req.params.name = 'Sculptor1';
        const sculptor = { name: 'Sculptor1' };
        sculptorService.getSculptor.mockReturnValue(sculptor);

        controller.getSculptor(req, res);

        expect(sculptorService.getSculptor).toHaveBeenCalledWith('Sculptor1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(sculptor);
    });

    test('should return 404 if sculptor not found', () => {
        req.params.name = 'Sculptor1';
        sculptorService.getSculptor.mockReturnValue(null);

        controller.getSculptor(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Escultor no encontrado.' });
    });

    test('should get all sculptors', () => {
        const sculptors = [{ name: 'Sculptor1' }, { name: 'Sculptor2' }];
        sculptorService.getAllSculptors.mockReturnValue(sculptors);

        controller.getAllSculptors(req, res);

        expect(sculptorService.getAllSculptors).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(sculptors);
    });

    test('should update sculptor name', () => {
        req.params.name = 'Sculptor1';
        req.body.newName = 'NewSculptor';

        controller.updateSculptorName(req, res);

        expect(sculptorService.updateSculptorName).toHaveBeenCalledWith('Sculptor1', 'NewSculptor');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Nombre del escultor actualizado exitosamente.' });
    });

    test('should update sculptor biography', () => {
        req.params.name = 'Sculptor1';
        req.body.newBiography = 'New Biography';

        controller.updateSculptorBiography(req, res);

        expect(sculptorService.updateSculptorBiography).toHaveBeenCalledWith('Sculptor1', 'New Biography');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Biografía del escultor actualizada exitosamente.' });
    });

    test('should update sculptor contact', () => {
        req.params.name = 'Sculptor1';
        req.body.newContact = '123456789';

        controller.updateSculptorContact(req, res);

        expect(sculptorService.updateSculptorContact).toHaveBeenCalledWith('Sculptor1', '123456789');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Contacto del escultor actualizado exitosamente.' });
    });

    test('should update sculptor works', () => {
        req.params.name = 'Sculptor1';
        req.body.newWorks = ['Work1', 'Work2'];

        controller.updateSculptorWorks(req, res);

        expect(sculptorService.updateSculptorWorks).toHaveBeenCalledWith('Sculptor1', ['Work1', 'Work2']);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Obras del escultor actualizadas exitosamente.' });
    });

    test('should delete a sculptor', () => {
        req.params.name = 'Sculptor1';
        sculptorService.deleteSculptor.mockReturnValue(true);

        controller.deleteSculptor(req, res);

        expect(sculptorService.deleteSculptor).toHaveBeenCalledWith('Sculptor1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Escultor eliminado exitosamente.' });
    });

    test('should return 404 if sculptor not found when deleting', () => {
        req.params.name = 'Sculptor1';
        sculptorService.deleteSculptor.mockReturnValue(false);

        controller.deleteSculptor(req, res);

        expect(sculptorService.deleteSculptor).toHaveBeenCalledWith('Sculptor1');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Escultor no encontrado.' });
    });
});
