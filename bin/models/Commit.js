import mongoose, { model, Schema } from "mongoose";
const commitSchema = new Schema({
    gh_id: {
        // Unfortunately, webhook does not send the id
        type: String,
    },
    sha: {
        type: String,
        required: true,
    },
    repo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repository",
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
    commit_message: String,
    author: String,
});
export const CommitModel = model("Commit", commitSchema);
