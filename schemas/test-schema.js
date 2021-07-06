import {buildSchema} from "graphql"

const testSchema = buildSchema(`
    type Employee {
        employeeId : Int
        employeeName : String
    }

    type Query {
        getEmployeeDetails : Employee        
    }
`)

export default testSchema;