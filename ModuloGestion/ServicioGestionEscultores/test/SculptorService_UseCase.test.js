// tests/SculptorUseCase.test.js
const SculptorUseCase = require('../src/services/SculptorService');

describe('SculptorUseCase', () => {
  let sculptorRepository;
  let sculptorUseCase;

  beforeEach(() => {
    sculptorRepository = {
      add: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    sculptorUseCase = new SculptorUseCase(sculptorRepository);
  });
//Esta prueba verifica que el método addSculptor llama a sculptorRepository.add con los datos correctos del escultor.
// No hay respuesta específica que verificar en este caso, ya que sólo se comprueba que se llame correctamente al repositorio.
  test('should add a sculptor', () => {
    const sculptor = { name: 'Sculptor1' };
    sculptorUseCase.addSculptor(sculptor);
    expect(sculptorRepository.add).toHaveBeenCalledWith(sculptor);
  });
//Esta prueba verifica que getSculptor busca un escultor por nombre. Simula que getAll devuelve una lista de escultores 
//y luego se asegura de que el resultado sea el escultor correcto.
  test('should get a sculptor by name', () => {
    const sculptors = [{ name: 'Sculptor1' }, { name: 'Sculptor2' }];
    sculptorRepository.getAll.mockReturnValue(sculptors);

    const result = sculptorUseCase.getSculptor('Sculptor1');
    expect(result).toEqual(sculptors[0]);
  });
//Esta prueba verifica que getSculptor devuelve null si el escultor no se encuentra en la lista.
  test('should return null if sculptor not found', () => {
    sculptorRepository.getAll.mockReturnValue([]);

    const result = sculptorUseCase.getSculptor('Sculptor1');
    expect(result).toBeNull();
  });
//Esta prueba verifica que getAllSculptors devuelve todos los escultores disponibles en el repositorio.
  test('should get all sculptors', () => {
    const sculptors = [{ name: 'Sculptor1' }, { name: 'Sculptor2' }];
    sculptorRepository.getAll.mockReturnValue(sculptors);

    const result = sculptorUseCase.getAllSculptors();
    expect(result).toEqual(sculptors);
  });
//Esta prueba verifica que updateSculptorName actualiza el nombre de un escultor correctamente. Primero, simula que el escultor 
//existe en el repositorio. Luego, llama a setName con el nuevo nombre y asegura que se llama a update 
//en el repositorio con los datos actualizados.
  test('should update sculptor name', () => {
    const sculptor = { name: 'Sculptor1', setName: jest.fn() };
    sculptorRepository.getAll.mockReturnValue([sculptor]);

    sculptorUseCase.updateSculptorName('Sculptor1', 'NewName');
    expect(sculptor.setName).toHaveBeenCalledWith('NewName');
    expect(sculptorRepository.update).toHaveBeenCalledWith('Sculptor1', sculptor);
  });
//Esta prueba verifica que updateSculptorName lanza un error si el escultor no se encuentra al intentar actualizar su nombre. 
//Si no hay coincidencia en el repositorio,se espera que el método arroje un error con el mensaje Escultor no encontrado.
  test('should throw error if sculptor not found when updating name', () => {
    sculptorRepository.getAll.mockReturnValue([]);

    expect(() => {
      sculptorUseCase.updateSculptorName('Sculptor1', 'NewName');
    }).toThrow('Escultor no encontrado');
  });

//Esta prueba verifica que deleteSculptor elimina un escultor si se encuentra en el repositorio, llama al método delete del repositorio y devuelve true.
  test('should delete a sculptor', () => {
    const sculptor = { name: 'Sculptor1' };
    sculptorRepository.getAll.mockReturnValue([sculptor]);

    const result = sculptorUseCase.deleteSculptor('Sculptor1');
    expect(sculptorRepository.delete).toHaveBeenCalledWith('Sculptor1');
    expect(result).toBe(true);
  });
//Finalmente, esta prueba verifica que deleteSculptor devuelve false si el escultor no se encuentra en el repositorio.
  test('should return false if sculptor not found when deleting', () => {
    sculptorRepository.getAll.mockReturnValue([]);

    const result = sculptorUseCase.deleteSculptor('Sculptor1');
    expect(result).toBe(false);
  });
});
