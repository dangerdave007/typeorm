import "reflect-metadata";
import {createConnection, ConnectionOptions} from "../../src/index";
import {Post} from "./entity/Post";
import {Author} from "./entity/Author";
import {Category} from "./entity/Category";

const options: ConnectionOptions = {
    driver: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "admin",
        database: "test"
    },
    logging: {
        logOnlyFailedQueries: true,
        logFailedQueryError: true
    },
    autoSchemaSync: true,
    entities: [Post, Author, Category]
};

createConnection(options).then(connection => {

    let postRepository = connection.getRepository(Post);

    let author = new Author();
    author.name = "Umed";
    
    let category1 = new Category();
    category1.name = "Category #1";
    
    let category2 = new Category();
    category2.name = "Category #2";
    
    let post = new Post();
    post.text = "Hello how are you?";
    post.title = "hello";
    post.author = author;
    post.categories = [category1, category2];

    postRepository
        .persist(post)
        .then(post => {
            console.log("Post has been saved. Lets load it now.");
            return postRepository.find({ alias: "post", leftJoinAndSelect: { 
                categories: "post.categories",
                author: "post.user" // note that table column is used, not object property
            }});
        })
        .then(loadedPosts => {
            console.log("loadedPosts: ", loadedPosts);
        })
        .catch(error => console.log(error.stack));

}, error => console.log("Cannot connect: ", error));