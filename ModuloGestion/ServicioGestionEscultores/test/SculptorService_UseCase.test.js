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

  test('should add a sculptor', () => {
    const sculptor = { name: 'Sculptor1' };
    sculptorUseCase.addSculptor(sculptor);
    expect(sculptorRepository.add).toHaveBeenCalledWith(sculptor);
  });

  test('should get a sculptor by name', () => {
    const sculptors = [{ name: 'Sculptor1' }, { name: 'Sculptor2' }];
    sculptorRepository.getAll.mockReturnValue(sculptors);

    const result = sculptorUseCase.getSculptor('Sculptor1');
    expect(result).toEqual(sculptors[0]);
  });

  test('should return null if sculptor not found', () => {
    sculptorRepository.getAll.mockReturnValue([]);

    const result = sculptorUseCase.getSculptor('Sculptor1');
    expect(result).toBeNull();
  });

  test('should get all sculptors', () => {
    const sculptors = [{ name: 'Sculptor1' }, { name: 'Sculptor2' }];
    sculptorRepository.getAll.mockReturnValue(sculptors);

    const result = sculptorUseCase.getAllSculptors();
    expect(result).toEqual(sculptors);
  });

  test('should update sculptor name', () => {
    const sculptor = { name: 'Sculptor1', setName: jest.fn() };
    sculptorRepository.getAll.mockReturnValue([sculptor]);

    sculptorUseCase.updateSculptorName('Sculptor1', 'NewName');
    expect(sculptor.setName).toHaveBeenCalledWith('NewName');
    expect(sculptorRepository.update).toHaveBeenCalledWith('Sculptor1', sculptor);
  });

  test('should throw error if sculptor not found when updating name', () => {
    sculptorRepository.getAll.mockReturnValue([]);

    expect(() => {
      sculptorUseCase.updateSculptorName('Sculptor1', 'NewName');
    }).toThrow('Escultor no encontrado');
  });

  // Tests for updateSculptorBiography, updateSculptorContact, and updateSculptorWorks
  // would follow the same pattern as updateSculptorName

  test('should delete a sculptor', () => {
    const sculptor = { name: 'Sculptor1' };
    sculptorRepository.getAll.mockReturnValue([sculptor]);

    const result = sculptorUseCase.deleteSculptor('Sculptor1');
    expect(sculptorRepository.delete).toHaveBeenCalledWith('Sculptor1');
    expect(result).toBe(true);
  });

  test('should return false if sculptor not found when deleting', () => {
    sculptorRepository.getAll.mockReturnValue([]);

    const result = sculptorUseCase.deleteSculptor('Sculptor1');
    expect(result).toBe(false);
  });
});
