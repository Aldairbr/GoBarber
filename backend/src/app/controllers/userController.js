import * as Yup from 'yup'
import User from '../models/User'

class userController {

  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6)
    })

  // esse isValid abaixo é async, por isso devemos usar o await no condicional

    if(!(await schema.isValid(request.body))){
      return response.status(401).json({ERROR: 'Validation errors'})
    }

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

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
        ),
      // confirmPassword: Yup.string().when('password', (password, field) =>
      //   password ? field.required().oneOf([Yup.ref('password')]) : field
      // ),
    })

      if(!(await schema.isValid(request.body))){
        return response.status(401).json({ERROR: 'Validation fails'})
      }

    const { email, oldPassword } = request.body

    const user = await User.findByPk(request.userId)

      if(email !== user.email){
        const userExists = await User.findOne({ where: { email } })

      if(userExists){
          return response.status(400).json({ERROR: 'User already exists!' })
        }
      }

      if(oldPassword && !( await user.checkPassword(oldPassword))){
        return response.status(401).json({ERROR: 'Password does not match!'})
      }

    const { id, name, provider } = await user.update(request.body)

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

    return response.json( userList )
  }

  async show(request, response) {

    const user = await User.findOne({where: {id: request.params.id}})

    if(!user) {
      return response.status(404).json({ERROR: "User not found"})
    }

    return response.json( user )
  }

}

export default new userController()
