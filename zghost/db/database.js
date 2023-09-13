import { hash } from "bcrypt"

class Database{
    create= async(Model, document) => {
        return await Model.create(document)
    }

    createUser = async(Model, data) =>{
        let user = {}
        hash(data.password, 10, async(err, hashedPassword) =>{
            user = await Model.create({
                first_name: data.first_name,
                last_name: data.last_name,
                username: data.username,
                password: hashedPassword,
                email: data.email,
            })
        })

        return user
    }
}

export const db = new Database()