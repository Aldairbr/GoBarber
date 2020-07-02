import User from '../models/User'

class userController {

 async store(request, response) {

    const userExists = await User.findOne({ where: { email: request.body.email } })

    if(userExists){
      return response.status(400).json({ERROR: 'Email already exists!' })
    }
    const { id, name, email, provider } = await User.create(request.body)

    return response.json({
      id,
      name,
      email,
      provider,
    })
  }

  async update(request, response) {

    const { email, oldPassword } = request.body

    const user = await User.findByPk(request.userId)

    if(email !== user.email){
      const userExists = await User.findOne({ where: { email } })

      if(!userExists){
        return response.status(400).json({ERROR: 'User already exists!' })
      }
    }

    if(oldPassword && !( await checkPassword(oldPassword))){
      return response.status(401).json({ERROR: 'Password does not match!'})
    }

    const { id, name, provider } = user.update(request.body)

    return response.json({
      id,
      name,
      email,
      provider,
    })
  }

  async index(request, response) {

    const userList = await User.findAll()

    if(!userList) {
      return response.status(400).json({ERROR: "User not found!"})
    }

    return response.json({ userList })
  }

  async show(request, response) {

    const user = await User.findOne({where: {id: request.params.id}})

    console.log(user)

    if(!user) {
      return response.status(404).json({ERROR: "User not found"})
    }

    return response.json({ user })
  }

}

export default new userController()
