import {PrimaryGeneratedColumn, Column, Table, OneToMany} from "../../../src/index";
import {Post} from "./Post";

@Table("sample3_post_details")
export class PostDetails {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    authorName: string;

    @Column({
        nullable: true
    })
    comment: string;

    @Column({
        nullable: true
    })
    metadata: string;
    
    @OneToMany(type => Post, post => post.details, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    posts: Post[];

}