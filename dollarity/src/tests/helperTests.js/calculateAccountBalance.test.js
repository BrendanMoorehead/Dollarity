const {calculateAccountBalance} = require('../../helpers/mathHelpers');

describe('calculateAccountBalance', () => {
    test('should return the correct balance when adding positive amount', () => {
      // Arrange
      const currentBalance = 100.0;
      const amount = 50.0;
      // Act
      const result = calculateAccountBalance(currentBalance, amount);
      // Assert
      expect(result).toBe(150.00); 
    });
  
    test('should return the correct balance when adding negative amount', () => {
      // Arrange
      const currentBalance = 100.0;
      const amount = -30.0;
      // Act
      const result = calculateAccountBalance(currentBalance, amount);
      // Assert
      expect(result).toBe(70.00); // The expected result after concatenation
    });
  
    test('should return the correct balance when adding zero amount', () => {
      // Arrange
      const currentBalance = 100.0;
      const amount = 0.0;
      // Act
      const result = calculateAccountBalance(currentBalance, amount);
      // Assert
      expect(result).toBe(100.00); // The expected result after concatenation
    });
  });