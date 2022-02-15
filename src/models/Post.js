import { PrismaClient } from '@prisma/client'
import Model from 'models/Model'

class Post extends Model {
  constructor() {
    super()
    this.prisma = new PrismaClient()
  }

  async count() {
    return this.prisma.post.count()
  }

  async find() {
    return this.prisma.post.findMany()
  }

  async findOne({ where }) {
    return this.prisma.post.findUnique({
      where,
    })
  }

  async create({ data }) {
    return this.prisma.post.create({
      data,
    })
  }

  async deleteOne({ where }) {
    return this.prisma.post.delete({
      where,
    })
  }

  async update({ where, data }) {
    return this.prisma.post.update({
      where,
      data,
    })
  }
}

export default new Post()
