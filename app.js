const express = require("express");
const bodyParser = require("body-parser"); 
const _ = require("lodash");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;
let posts = [];

mongoose.connect(process.env.MONGO_URL);

const blogSchema = new mongoose.Schema({
    title: String,
    post: String
});

const Blog = mongoose.model("Blog", blogSchema);

//create blog obj


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.get("/", async(req,res)=>{
    var data;

    const blogData = Blog.find();
    data = await blogData.exec();


    res.render("home.ejs",{
        homeStartingContent: homeStartingContent,
        posts: data,
    });
});

app.get("/post/:postID", async(req,res)=>{

    var data;

    const blogData = Blog.find();
    data = await blogData.exec();

    data.forEach((blog)=>{
        
        if(req.params.postID === blog._id.toHexString()){
            res.render("post.ejs",{
                title: blog.title,
                body: blog.post,
            });
        };
    });
});

app.get("/about",(req,res)=>{
    res.render("about.ejs",{
        aboutStartingContent: aboutContent,
    });
});

app.get("/contact",(req,res)=>{
    res.render("contact.ejs",{
        contactStartingContent: contactContent,
    });
});

app.get("/compose",(req,res)=>{
    res.render("compose.ejs");
});

app.post("/addBlog", (req,res)=>{

    // posts.push(blogPost);
    const blog = new Blog({
        title: req.body.dailyBlog_title,
        post: req.body.dailyBlog_body, 
    });

    blog.save()

    res.redirect("/");
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});