import mongoose, {Schema,Document} from "mongoose";

export interface IBlog extends Document {
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

const blogSchema: Schema = new Schema<IBlog>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model<IBlog>('Blog', blogSchema);
export default Blog;