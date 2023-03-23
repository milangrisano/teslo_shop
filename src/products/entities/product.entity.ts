import { User } from "../../auth/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'products' })
export class Product {

   @ApiProperty({
      example: '1b21a60f-588d-4481-923e-ac3dfaba61d7',
      description: 'Product ID',
      uniqueItems: true,
   })
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ApiProperty({
      example: 'Chill Pullover Hoodie',
      description: 'Product Title',
      uniqueItems: true,
   })
   @Column('text', {
      unique: true,
   })
   title: String;
   
   @ApiProperty({
      example: 0,
      description: 'Product price',
   })
   @Column('float',{
      default: 0
   })
   price: number;

   @ApiProperty({
      example: 'Lorem enim eu minim qui commodo adipisicing minim cillum in esse.',
      description: 'Product Description',
      default: null,
   })
   @Column({
      type:'text',
      nullable: true
   })
   description: string;

   @ApiProperty({
      example: 'chill_pullover_hoodie',
      description: 'Product SLUG - for SEO',
      uniqueItems: true,
   })
   @Column('text',{
      unique: true
   })
   slug: string;

   @ApiProperty({
      example: 10,
      description: 'Product Stock',
      default: 0,
   })
   @Column('int',{
      default: 0
   })
   stock: number;

   @ApiProperty({
      example: ['S','M','L','XL','XXL'],
      description: 'Product Stock',
   })
   @Column('text',{
      array: true
   })
   sizes: string[];

   @ApiProperty({
      example: 'women',
      description: 'Product Gender',
   })
   @Column('text')
   gender: string;

   @ApiProperty()
   @Column('text',{
      array: true,
      default:[]
   })
   tags: string[];

   @ApiProperty()
   @OneToMany(
      ()=> ProductImage,
      (productImage) => productImage.product,
      { cascade: true, eager: true }
   )
   images?: ProductImage[];

   @ManyToOne(
      () => User,
      ( user ) => user.product,
      { eager: true }
   )
   user: User

   @BeforeInsert()
   checkSlugInsert(){
      if (!this.slug) {
        this.slug = this.title
        .toLowerCase()
        .replaceAll(' ','_')
        .replaceAll("'",'')
      } else {
         this.slug = this.slug
         .toLowerCase()
        .replaceAll(' ','_')
        .replaceAll("'",'')
      }
   }

   @BeforeUpdate()
   checkSlugUpdate(){
      this.slug = this.slug
         .toLowerCase()
        .replaceAll(' ','_')
        .replaceAll("'",'')
   }
}
