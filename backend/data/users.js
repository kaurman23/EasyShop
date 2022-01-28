import bcrypt from "bcryptjs/dist/bcrypt.js"

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('abcde', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('abcde', 10)
    },
    {
        name: 'Jane Doe',
        email: 'joes@example.com',
        password: bcrypt.hashSync('abcde', 10),
    }
]

export default users