const { connectDb } = require('../database/connect')
const { ObjectId } = require('mongodb')

exports.getAllUsers = async () => {
    const collection = await connectDb('usuarios', 'users')
    const data = await collection.find().toArray()
    return { data, status: 200 }
}

exports.createOneUser = async ({ name, email }) => {
    const collection = await connectDb('usuarios', 'users')
    const { insertedId } = await collection.insertOne({ name, email })
    return { data: { id: insertedId, name, email }, status: 201 }
}

exports.getOneUserById = async (id) => {
    const collection = await connectDb('usuarios', 'users')
    const data = await collection.findOne({ _id: ObjectId(id) })
    return { data, status: 200 }
}

exports.getOneUserByEmail = async (email) => {
    const collection = await connectDb('usuarios', 'users')
    const data = await collection.findOne({email: email })
    return { data, status: 200 }
}

exports.putUser = async (id, { name, email }) => {
    const collection = await connectDb('usuarios', 'users')
    const { insertedId } = await collection.updateOne({ _id: ObjectId(id) }, { $set: { name, email } })
    return { data: { id: insertedId, name, email }, status: 201 }
}

exports.removeUser = async (id) => {
    const collection = await connectDb('usuarios', 'users')
    const dataUser = await collection.findOne({ _id: ObjectId(id) })
    const data = await collection.deleteOne({ _id: ObjectId(id) })
    return { data : dataUser, status: 200 }
}
