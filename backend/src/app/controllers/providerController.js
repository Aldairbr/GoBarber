import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(request, response) {
    const provider = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'Avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return response.json(provider);
  }
}

export default new ProviderController();
