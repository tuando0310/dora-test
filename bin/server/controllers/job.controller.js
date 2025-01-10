import env from "../../env.js";
import octokit from "../../services/octokit.js";
import queue from "../../services/queue.js";
const queueJob = async (req, res) => {
    const repos = await octokit.paginate("GET /orgs/{org}/repos", {
        org: env.GH_ORG_NAME,
    });
    const devPromises = repos.map(async (repo) => {
        return queue.add("dev", { repo_ref: repo.full_name });
    });
    const uatPromises = queue.add("uat", { doc_id: env.UAT_DOC_ID });
    const prodPromises = queue.add("prod", { doc_id: env.PROD_DOC_ID });
    const jobs = await Promise.all([...devPromises, uatPromises, prodPromises]);
    res.status(202).json({
        message: `Jobs are being processed, id range: [${jobs[0].id}; ${jobs[jobs.length - 1].id}]`,
    });
};
const getJobStatus = async (req, res) => {
    const { id } = req.params;
    try {
        // Get the job from the queue using its job ID
        const job = await queue.getJob(id);
        if (!job) {
            res.status(404).json({ error: "Job not found" });
            return;
        }
        // Get the job status
        const status = await job.getState();
        const progress = job.progress;
        const finishedOn = job.finishedOn;
        const failedReason = job.failedReason;
        res.status(200).json({
            status,
            progress,
            finishedOn,
            failedReason,
        });
        return;
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "An error occurred while retrieving job status" });
        return;
    }
};
const JobController = { queueJob, getJobStatus };
export { JobController };
