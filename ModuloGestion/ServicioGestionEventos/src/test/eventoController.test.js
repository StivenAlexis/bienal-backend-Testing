const eventoController = require('../../src/api/controller/eventoController'); // Ajusta la ruta
const eventoService = require('../../src/services/eventoService');

jest.mock('../../src/services/eventoService');

describe('Evento Controller', () => {

const mockReq = (data) => ({ body: data, params: data });
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
};

describe('crearEvento', () => {
    it('debe crear un evento y devolver status 201', async () => {
    const req = mockReq({ nombre: 'Evento de prueba' });
    const res = mockRes();
    const mockEvento = { id: 1, nombre: 'Evento de prueba' };

    eventoService.crearEvento.mockResolvedValue(mockEvento);

    await eventoController.crearEvento(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockEvento);
    });

    it('debe devolver status 500 si ocurre un error', async () => {
    const req = mockReq({ nombre: 'Evento de prueba' });
    const res = mockRes();

    eventoService.crearEvento.mockRejectedValue(new Error('Error al crear el evento'));

    await eventoController.crearEvento(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al crear el evento' });
    });
});

describe('obtenerEventos', () => {
    it('debe obtener todos los eventos y devolver status 200', async () => {
    const req = mockReq({});
    const res = mockRes();
    const mockEventos = [{ id: 1, nombre: 'Evento de prueba' }];

    eventoService.obtenerEventos.mockResolvedValue(mockEventos);

    await eventoController.obtenerEventos(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockEventos);
    });

    it('debe devolver status 500 si ocurre un error', async () => {
    const req = mockReq({});
    const res = mockRes();

    eventoService.obtenerEventos.mockRejectedValue(new Error('Error al obtener los eventos'));

    await eventoController.obtenerEventos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener los eventos' });
    });
});

describe('obtenerEventoPorId', () => {
    it('debe obtener un evento por ID y devolver status 200', async () => {
    const req = mockReq({ id: 1 });
    const res = mockRes();
    const mockEvento = { id: 1, nombre: 'Evento de prueba' };

    eventoService.obtenerEventoPorId.mockResolvedValue(mockEvento);

    await eventoController.obtenerEventoPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockEvento);
    });

    it('debe devolver status 404 si el evento no existe', async () => {
    const req = mockReq({ id: 1 });
    const res = mockRes();

    eventoService.obtenerEventoPorId.mockResolvedValue(null);

    await eventoController.obtenerEventoPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'No se encontró un evento con ese ID' });
    });

    it('debe devolver status 500 si ocurre un error', async () => {
    const req = mockReq({ id: 1 });
    const res = mockRes();

    eventoService.obtenerEventoPorId.mockRejectedValue(new Error('Error al obtener el evento por ID'));

    await eventoController.obtenerEventoPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener el evento por ID' });
    });
});
});
