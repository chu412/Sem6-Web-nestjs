import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService){ }
  create(createPostDto: CreatePostDto) {
    const {userId, title, body} = createPostDto;
    return this.prismaService.post.create({ data: {
      userId: userId,
      title: title,
      body: body,
    }});
  }

  findAll() {
    return this.prismaService.post.findMany()
  }

  findOne(id: string) {
    return this.prismaService.post.findUnique({ where: { id } })
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    const {userId, title, body} = updatePostDto;
    return this.prismaService.post.update({
      where: { id: id },
      data: {
        userId: userId,
        title: title,
        body: body,

    } })
  }

  remove(id: string) {
    return this.prismaService.post.delete({ where: { id }})
  }
}
