// test/SculptorController.test.js
const SculptorController = require('../src/api/controllers/SculptorController');
//Aquí se define el bloque de pruebas SculptorController. 
//Se crean variables para sculptorService, controller, req y res,
//las cuales que representan el servicio simulado, el controlador, y los
// objetos de solicitud y respuesta que se utilizarán en cada prueba.
describe('SculptorController', () => {
    let sculptorService;
    let controller;
    let req;
    let res;
//Antes de cada prueba, se inicializa el servicio sculptorService como un conjunto
//de funciones simuladas (jest.fn()). 
//Esto permite verificar que cada método del controlador llame a la función 
//correspondiente en el servicio y facilita el seguimiento de las llamadas.
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
//Aquí se crea una instancia de SculptorController con el servicio simulado sculptorService.
// También se inicializan req y res para representar los objetos de solicitud y respuesta HTTP
// que se pasarán a cada método del controlador en las pruebas.
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
//Esta prueba verifica que el controlador addSculptor llama a sculptorService.addSculptor con
// los datos del escultor (nombre en este caso).Luego, espera que la respuesta HTTP tenga
// un estado 201 (creado) y que contenga un mensaje de éxito en JSON
    test('should add a sculptor', () => {
        req.body = { name: 'Sculptor1' };

        controller.addSculptor(req, res);

        expect(sculptorService.addSculptor).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Escultor creado exitosamente.' });
    });
//Esta prueba verifica que el método getSculptor obtiene un escultor por nombre 
//y devuelve un estado 200 y el objeto escultor en JSON si existe
    test('should get a sculptor by name', () => {
        req.params.name = 'Sculptor1';
        const sculptor = { name: 'Sculptor1' };
        sculptorService.getSculptor.mockReturnValue(sculptor);

        controller.getSculptor(req, res);

        expect(sculptorService.getSculptor).toHaveBeenCalledWith('Sculptor1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(sculptor);
    });
//Esta prueba verifica que getSculptor devuelve un estado 404 y un mensaje de error si el escultor no se encuentra.
    test('should return 404 if sculptor not found', () => {
        req.params.name = 'Sculptor1';
        sculptorService.getSculptor.mockReturnValue(null);

        controller.getSculptor(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Escultor no encontrado.' });
    });
//Esta prueba verifica que getAllSculptors devuelve un estado 200 y
// la lista completa de escultores en JSON.
    test('should get all sculptors', () => {
        const sculptors = [{ name: 'Sculptor1' }, { name: 'Sculptor2' }];
        sculptorService.getAllSculptors.mockReturnValue(sculptors);

        controller.getAllSculptors(req, res);

        expect(sculptorService.getAllSculptors).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(sculptors);
    });
//Esta prueba verifica que updateSculptorName actualiza el nombre de un escultor 
//y devuelve un mensaje de éxito con estado 200.
    test('should update sculptor name', () => {
        req.params.name = 'Sculptor1';
        req.body.newName = 'NewSculptor';

        controller.updateSculptorName(req, res);

        expect(sculptorService.updateSculptorName).toHaveBeenCalledWith('Sculptor1', 'NewSculptor');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Nombre del escultor actualizado exitosamente.' });
    });
//Las siguientes pruebas, como updateSculptorBiography, updateSculptorContact, updateSculptorWorks, 
//siguen un patrón similar: verifican que los métodos de actualización en el controlador llamen a las 
//funciones correspondientes en el servicio y devuelvan un mensaje de éxito.
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
//Esta prueba verifica que deleteSculptor elimina un escultor y devuelve un estado 200 con un mensaje de éxito si el escultor existe.

    test('should delete a sculptor', () => {
        req.params.name = 'Sculptor1';
        sculptorService.deleteSculptor.mockReturnValue(true);

        controller.deleteSculptor(req, res);

        expect(sculptorService.deleteSculptor).toHaveBeenCalledWith('Sculptor1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Escultor eliminado exitosamente.' });
    });
//Finalmente, esta prueba verifica que, si el escultor no se encuentra al intentar eliminarlo, se devuelva un estado 404 con un mensaje de error.
    test('should return 404 if sculptor not found when deleting', () => {
        req.params.name = 'Sculptor1';
        sculptorService.deleteSculptor.mockReturnValue(false);

        controller.deleteSculptor(req, res);

        expect(sculptorService.deleteSculptor).toHaveBeenCalledWith('Sculptor1');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Escultor no encontrado.' });
    });
});
