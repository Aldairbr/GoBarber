import jwt from 'jsonwebtoken'

import User from '../models/User'

class sessionController {
  async store(request, response) {

    const { email, password } = request.body
    const user = await User.findOne({where: {email: email}})

    if(!user) {
      return response.status(401).json({ERROR: 'User not found!'})
    }

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ERROR: 'Password does not match!'})
    }

    const { id, name } = user

    return response.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, 'cbc3fbda0e3639404d30616d405b117c', {
        expiresIn: '7d',
      })
    })
  }
}

export default new sessionController()
