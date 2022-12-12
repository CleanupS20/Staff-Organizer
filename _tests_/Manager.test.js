const Manager = require('../lib/Manager')

describe("Manager", () => {
    describe("getOffice", () => {
      it("Should create a Manager object and return the employee attributes passed through the input parameters", () => {
        
        const testName = "John";
        const testID = "1234"
        const testEmail = 'Johntest@gmail.com'

        const testManager = new Manager(testName, testID, testEmail);

        nameResult = testManager.getName();
        idResult = testManager.getId();
        emailResult = testManager.getEmail()
        roleResult = testManager.getRole();

        expect(nameResult).toEqual(testName);
        expect(idResult).toEqual(testID);
        expect(emailResult).toEqual(testEmail);
        expect(roleResult).toEqual('Manager');
      });
    });
  });
  