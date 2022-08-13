import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
//import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @ApiOperation({summary: 'New post'})
  @ApiResponse({ 
    status: 201,
    description: 'The post has been successfully registered.',})
  @Post()
  //@UseGuards(JwtGuard)
  @ApiBearerAuth()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Get all posts' })
  //@UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Get post by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ApiOperation({ summary: 'Change post by id' })
  @ApiResponse({
    status: 200,
    description: 'The post info have been successfully edited.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Delete post by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
