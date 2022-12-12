const Intern = require('../lib/Intern')

describe("Intern", () => {
    describe("getAttributes", () => {
      it("Should create an Intern object and return the employee attributes passed through the input parameters", () => {

        const testName = "John";
        const testID = "1234"
        const testEmail = 'Johntest@gmail.com'
        const testSchool = 'University'
        const testRole = 'Intern'

        const testIntern = new Intern(testName, testID, testEmail, testRole, testSchool);

        nameResult = testIntern.getName();
        idResult = testIntern.getId();
        emailResult = testIntern.getEmail()
        roleResult = testIntern.getRole()
        schoolResult = testIntern.getSchool()
        
        expect(nameResult).toEqual(testName);
        expect(idResult).toEqual(testID);
        expect(emailResult).toEqual(testEmail);
        expect(roleResult).toEqual('Intern');
        expect(schoolResult).toEqual(testSchool);

      });
    });
  });