import React from "react";
import PostCard from "./PostCard";
import { PostProps } from "@/common.types";
const Posts = () => {
  const posts = [
    {
      profile: {
        imageUrl: "/hero1.jpg",
        name: "Fasina Ayomikun",
        username: "fasinaayomikun",
      },
      desc: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.",
      imageUrl: "/hero2.jpg",
      noOfComments: 6,
      noOfLikes: 345,
      tags: ["javascript", "php", "coding"],
    },
    {
      profile: {
        imageUrl: "/hero1.jpg",
        name: "Fasina Ayomikun",
        username: "fasinaayomikun",
      },
      desc: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.",
      imageUrl: "/hero2.jpg",
      noOfComments: 6,
      noOfLikes: 345,
      tags: ["javascript", "php", "coding"],
    },
    {
      profile: {
        imageUrl: "/hero1.jpg",
        name: "Fasina Ayomikun",
        username: "fasinaayomikun",
      },
      desc: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.",
      imageUrl: "/hero2.jpg",
      noOfComments: 6,
      noOfLikes: 345,
      tags: ["javascript", "php", "coding"],
    },
    {
      profile: {
        imageUrl: "/hero1.jpg",
        name: "Fasina Ayomikun",
        username: "fasinaayomikun",
      },
      desc: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.",
      imageUrl: "/hero2.jpg",
      noOfComments: 6,
      noOfLikes: 345,
      tags: ["javascript", "php", "coding"],
    },
    {
      profile: {
        imageUrl: "/hero1.jpg",
        name: "Fasina Ayomikun",
        username: "fasinaayomikun",
      },
      desc: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.",
      imageUrl: "/hero2.jpg",
      noOfComments: 6,
      noOfLikes: 345,
      tags: ["javascript", "php", "coding"],
    },
  ];

  return (
    <section>
      {posts.map((post, index) => {
        return <PostCard key={index} post={post} />;
      })}
    </section>
  );
};

export default Posts;
