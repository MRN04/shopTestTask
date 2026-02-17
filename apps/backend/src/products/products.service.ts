import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, Comment } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Wireless Mouse',
      imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      count: 15,
      size: { width: 10, height: 5 },
      weight: '100g',
      comments: [
        {
          id: 'c1',
          productId: '1',
          description: 'Great product! Very comfortable to use.',
          date: new Date().toISOString(),
        },
      ],
    },
    {
      id: '2',
      name: 'Mechanical Keyboard',
      imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
      count: 8,
      size: { width: 45, height: 15 },
      weight: '850g',
      comments: [],
    },
    {
      id: '3',
      name: 'HD Webcam',
      imageUrl: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400',
      count: 12,
      size: { width: 8, height: 6 },
      weight: '150g',
      comments: [],
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  create(createProductDto: CreateProductDto): Product {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...createProductDto,
      comments: [],
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id);
    const index = this.products.findIndex((p) => p.id === id);
    
    const updatedProduct = {
      ...product,
      ...updateProductDto,
    };
    
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  delete(id: string): void {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    this.products.splice(index, 1);
  }

  addComment(productId: string, createCommentDto: CreateCommentDto): Comment {
    const product = this.findOne(productId);
    const newComment: Comment = {
      id: Date.now().toString(),
      productId,
      description: createCommentDto.description,
      date: new Date().toISOString(),
    };
    product.comments.push(newComment);
    return newComment;
  }

  deleteComment(productId: string, commentId: string): void {
    const product = this.findOne(productId);
    const index = product.comments.findIndex((c) => c.id === commentId);
    if (index === -1) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }
    product.comments.splice(index, 1);
  }
}
