import { model, Schema } from "mongoose";
const repositorySchema = new Schema({
    gh_id: {
        type: Number,
    },
    owner: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    private: {
        type: Boolean,
        required: true,
    },
    default_branch: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        default: function () {
            return `${this.owner}/${this.name}`;
        },
    },
});
export const RepositoryModel = model("Repository", repositorySchema);
