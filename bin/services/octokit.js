import env from "../env.js";
import { Octokit } from "@octokit/rest";
const octokit = new Octokit({
    auth: env.GH_PAT,
});
export default octokit;
